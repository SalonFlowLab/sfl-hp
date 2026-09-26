/* 人材開発支援助成金（事業展開等リスキリング支援コース）シミュレーター
   2026年8月3日版。対面・同時双方向型の訓練（10時間以上100時間未満）を前提にした概算。
   制度改定時は SUBSIDY_PROFILES と各ページの注記・確認日を同時に更新する。 */
(() => {
  const root = document.querySelector('[data-reskilling-simulator]');
  if (!root) return;

  const TRAINING_FEE_PER_PERSON = 360000;
  const TRAINING_HOURS = 15;
  const SUBSIDY_PROFILES = {
    small: { label: '中小企業', expenseRate: 0.75, wageRate: 1000, expenseCap: 300000 },
    large: { label: '大企業', expenseRate: 0.6, wageRate: 500, expenseCap: 200000 }
  };

  const calculate = (companySize, participants) => {
    const profile = SUBSIDY_PROFILES[companySize];
    const trainingFee = TRAINING_FEE_PER_PERSON * participants;
    const expenseAidPerPerson = Math.min(TRAINING_FEE_PER_PERSON * profile.expenseRate, profile.expenseCap);
    const expenseAid = expenseAidPerPerson * participants;
    const tuitionBurden = trainingFee - expenseAid;
    // 全15時間が所定労働時間内で対象となる場合。給与への助成は研修費から引かない。
    const wageAidPerPerson = profile.wageRate * TRAINING_HOURS;
    return {
      profile,
      trainingFee,
      expenseAid,
      tuitionBurden,
      tuitionBurdenPerPerson: tuitionBurden / participants,
      wageAid: wageAidPerPerson * participants,
      wageAidPerPerson
    };
  };

  const yen = (value) => new Intl.NumberFormat('ja-JP').format(value) + '円';
  const out = (name) => root.querySelector('[data-out="' + name + '"]');
  const range = root.querySelector('[data-participants]');
  const rangeOutput = root.querySelector('[data-participants-output]');
  let tracked = false;

  const update = () => {
    const companySize = root.querySelector('input[name="company-size"]:checked').value;
    const participants = Number(range.value);
    const e = calculate(companySize, participants);
    range.setAttribute('aria-valuetext', participants + '名');
    rangeOutput.textContent = participants + '名';
    out('expense-rate').textContent = Math.round(e.profile.expenseRate * 100) + '%';
    out('expense-cap').textContent = yen(e.profile.expenseCap);
    out('wage-rate').textContent = yen(e.profile.wageRate) + '／時間';
    out('burden').textContent = yen(e.tuitionBurden);
    out('burden-per').textContent = '1人あたり ' + yen(e.tuitionBurdenPerPerson);
    out('fee').textContent = yen(e.trainingFee);
    out('expense-aid').textContent = '− ' + yen(e.expenseAid);
    out('burden-total').textContent = yen(e.tuitionBurden);
    out('wage').textContent = yen(e.wageAid);
    out('wage-per').textContent = '1人あたり ' + yen(e.wageAidPerPerson) + '／対象15時間';
    out('summary').textContent = e.profile.label + '・' + participants + '名：研修費の負担目安 ' + yen(e.tuitionBurden) + '、別途の賃金助成見込 ' + yen(e.wageAid);
  };

  const onInput = () => {
    update();
    if (!tracked && typeof window.gtag === 'function') {
      tracked = true;
      window.gtag('event', 'subsidy_simulator_use', { page_path: location.pathname });
    }
  };

  root.querySelectorAll('input[name="company-size"]').forEach((input) => input.addEventListener('change', onInput));
  range.addEventListener('input', onInput);
  update();
})();
