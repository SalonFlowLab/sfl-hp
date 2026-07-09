(function () {
  var forms = document.querySelectorAll('[data-contact-form]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[0-9+\-()（）\s]{8,20}$/;

  function setStatus(status, message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = 'sfl-form-status' + (type ? ' ' + type : '');
  }

  function triggerDownload(url) {
    if (!url) return;

    var link = document.createElement('a');
    link.href = url;
    link.download = '業務効率化チェックリスト.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function validateForm(form) {
    var fields = [
      form.elements.company,
      form.elements.name,
      form.elements.email,
      form.elements.phone,
      form.elements.topic,
      form.elements.message,
      form.elements.privacy
    ].filter(Boolean);
    var firstError = '';

    fields.forEach(function (field) {
      var message = validateField(field, form);
      setFieldError(field, message);
      if (message && !firstError) firstError = message;
    });

    return firstError;
  }

  function validateField(field, form) {
    if (!field) return '';

    var value = (field.value || '').trim();
    if (field.name === 'company' && !value) {
      return '会社名を入力してください。';
    }

    if (field.name === 'name' && !value) {
      return '氏名を入力してください。';
    }

    if (field.name === 'email' && !value) {
      return 'メールアドレスを入力してください。';
    }

    if (field.name === 'email' && value && !emailPattern.test(value)) {
      return 'メールアドレスの形式を確認してください。';
    }

    if (field.name === 'phone' && value && !phonePattern.test(value)) {
      return '電話番号は半角数字・ハイフン・括弧で入力してください。';
    }

    if (field.name === 'topic' && !value) {
      return '興味を持ったサービスを選択してください。';
    }

    if (field.name === 'message' && !value) {
      var messageLabel = form.getAttribute('data-message-label') || 'お問い合わせ内容';
      return messageLabel + 'を入力してください。';
    }

    if (field.name === 'privacy' && !field.checked) {
      return 'プライバシーポリシーへの同意が必要です。';
    }

    return '';
  }

  function getFieldError(field) {
    var errorId = field.getAttribute('aria-describedby');
    var error = errorId ? document.getElementById(errorId) : null;
    if (error) return error;

    error = document.createElement('span');
    error.id = 'sfl-error-' + field.name + '-' + Math.random().toString(36).slice(2, 8);
    error.className = 'sfl-field-error';
    error.setAttribute('aria-live', 'polite');
    field.setAttribute('aria-describedby', error.id);
    if (field.type === 'checkbox' && field.closest('label')) {
      field.closest('label').insertAdjacentElement('afterend', error);
    } else {
      field.insertAdjacentElement('afterend', error);
    }
    return error;
  }

  function setFieldError(field, message) {
    var error = getFieldError(field);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message;
  }

  function validateFieldInline(field, form, showEmpty) {
    var message = validateField(field, form);
    if (!showEmpty && field.required && !(field.value || '').trim()) {
      message = '';
    }
    setFieldError(field, message);
    return message;
  }

  forms.forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var realtimeFields = [
      form.elements.company,
      form.elements.name,
      form.elements.email,
      form.elements.phone,
      form.elements.topic,
      form.elements.message,
      form.elements.privacy
    ].filter(Boolean);
    form.noValidate = true;

    realtimeFields.forEach(function (field) {
      getFieldError(field);
      field.addEventListener('input', function () {
        validateFieldInline(field, form, false);
        setStatus(status, '', '');
      });
      field.addEventListener('change', function () {
        validateFieldInline(field, form, false);
        setStatus(status, '', '');
      });
      field.addEventListener('blur', function () {
        validateFieldInline(field, form, true);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var validationError = validateForm(form);
      if (validationError) {
        var firstInvalidField = null;
        realtimeFields.forEach(function (field) {
          var fieldError = validateFieldInline(field, form, true);
          if (fieldError && !firstInvalidField) firstInvalidField = field;
        });
        setStatus(status, firstInvalidField ? '' : validationError, firstInvalidField ? '' : 'error');
        if (firstInvalidField) {
          firstInvalidField.focus();
        } else {
          form.reportValidity();
        }
        return;
      }

      realtimeFields.forEach(function (field) {
        setFieldError(field, '');
      });

      setStatus(status, '送信中です。', '');

      var submit = form.querySelector('button[type="submit"]');
      if (submit) submit.disabled = true;

      var payload = Object.fromEntries(new FormData(form).entries());
      payload.formType = form.getAttribute('data-form-type') || 'お問い合わせ';
      payload.pageUrl = window.location.href;

      if (window.location.hostname.endsWith('github.io')) {
        setStatus(status, 'GitHub Pagesのプレビューではフォーム送信は利用できません。本番公開後に送信できます。', 'error');
        if (submit) submit.disabled = false;
        return;
      }

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().catch(function () {
              return {};
            }).then(function (body) {
              throw new Error(body.message || '送信に失敗しました。時間をおいて再度お試しください。');
            });
          }
          return response.json();
        })
        .then(function () {
          var downloadUrl = form.getAttribute('data-download-url') || '';
          form.reset();
          if (downloadUrl) {
            setStatus(status, '資料ダウンロード完了しました。', 'success');
            triggerDownload(downloadUrl);
          } else {
            setStatus(status, '送信しました。担当者よりご連絡します。', 'success');
          }
        })
        .catch(function (error) {
          setStatus(status, error.message, 'error');
        })
        .finally(function () {
          if (submit) submit.disabled = false;
        });
    });
  });
})();
