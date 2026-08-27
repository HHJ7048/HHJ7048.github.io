(function () {
  var todayEl = document.getElementById('vc-today');
  var totalEl = document.getElementById('vc-total');
  if (!todayEl || !totalEl) return;

  var BASE = 'https://abacus.jasoncameron.dev';
  var NS = 'hhj7048-github-io';

  // KST 기준 오늘 날짜 (일별 카운터 키로도 쓰고, 하루 1회 증가 가드로도 씀)
  var todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
  var todayKey = 'visits-' + todayStr;
  var totalKey = 'total-visits';
  var flagKey = 'hhj7048_visited_' + todayStr;

  // 테스트용: 주소 끝에 ?reset-visitor 를 붙이면 오늘 카운트했다는 표시를 지우고 다시 증가시킴
  if (location.search.indexOf('reset-visitor') !== -1) {
    try { localStorage.removeItem(flagKey); } catch (e) {}
  }

  function render(today, total) {
    todayEl.textContent = Number(today).toLocaleString();
    totalEl.textContent = Number(total).toLocaleString();
  }

  function call(action, key) {
    return fetch(BASE + '/' + action + '/' + NS + '/' + key)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) { return data.value; });
  }

  var alreadyCountedToday = false;
  try {
    alreadyCountedToday = localStorage.getItem(flagKey) === '1';
  } catch (e) {}

  var work;
  if (alreadyCountedToday) {
    // 오늘 이미 카운트했다면 증가 없이 최신값만 조회 (몇 번을 새로고침해도 안전)
    work = Promise.all([call('get', todayKey), call('get', totalKey)]);
  } else {
    // 이 브라우저로 오늘 처음 방문했을 때만 딱 한 번 증가
    work = Promise.all([call('hit', todayKey), call('hit', totalKey)]).then(function (vals) {
      try { localStorage.setItem(flagKey, '1'); } catch (e) {}
      return vals;
    });
  }

  work
    .then(function (vals) { render(vals[0], vals[1]); })
    .catch(function (err) {
      console.error('[visitor-counter]', err);
      todayEl.textContent = '-';
      totalEl.textContent = '-';
    });
})();
