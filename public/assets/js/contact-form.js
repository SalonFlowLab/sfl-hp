(function () {
  var forms = document.querySelectorAll('[data-contact-form]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[0-9+\-()（）\s]{8,20}$/;

  function setStatus(status, message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = 'sfl-form-status' + (type ? ' ' + type : '');
  }

  function validateForm(form) {
    var email = (form.elements.email?.value || '').trim();
    var phone = (form.elements.phone?.value || '').trim();

    if (!emailPattern.test(email)) {
      return 'メールアドレスの形式を確認してください。';
    }

    if (phone && !phonePattern.test(phone)) {
      return '電話番号は半角数字・ハイフン・括弧で入力してください。';
    }

    return '';
  }

  function validateField(field) {
    if (!field) return '';

    var value = (field.value || '').trim();
    if (field.name === 'email' && value && !emailPattern.test(value)) {
      return 'メールアドレスの形式を確認してください。';
    }

    if (field.name === 'phone' && value && !phonePattern.test(value)) {
      return '電話番号は半角数字・ハイフン・括弧で入力してください。';
    }

    return '';
  }

  forms.forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var realtimeFields = [form.elements.email, form.elements.phone].filter(Boolean);

    realtimeFields.forEach(function (field) {
      field.addEventListener('input', function () {
        var validationError = validateField(field);
        field.setAttribute('aria-invalid', validationError ? 'true' : 'false');
        setStatus(status, validationError, validationError ? 'error' : '');
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var validationError = validateForm(form);
      if (validationError) {
        realtimeFields.forEach(function (field) {
          field.setAttribute('aria-invalid', validateField(field) ? 'true' : 'false');
        });
        setStatus(status, validationError, 'error');
        return;
      }

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
          form.reset();
          setStatus(status, '送信しました。担当者よりご連絡します。', 'success');
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
