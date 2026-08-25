---
---
(function () {
  var todayEl = document.getElementById('vc-today');
  var totalEl = document.getElementById('vc-total');
  if (!todayEl || !totalEl) return;

  // KST 기준 오늘 날짜 (같은 브라우저에서 하루 한 번만 카운트)
  var todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
  var cacheKey = 'hhj7048_visitor_cache';

  function render(today, total) {
    todayEl.textContent = Number(today).toLocaleString();
    totalEl.textContent = Number(total).toLocaleString();
  }

  var cached = null;
  try {
    cached = JSON.parse(localStorage.getItem(cacheKey));
  } catch (e) {}

  // 오늘 이미 카운트했다면 서버에 다시 요청하지 않고 캐시된 값만 표시
  if (cached && cached.date === todayStr) {
    render(cached.today, cached.total);
    return;
  }

  var target = encodeURIComponent('{{ site.url }}');
  var url = 'https://hitscounter.dev/api/hit?url=' + target + '&label=visit&icon=eye-fill&color=%23198754';

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function (svg) {
      var m = svg.match(/(\d[\d,]*)\s*\/\s*(\d[\d,]*)/);
      if (!m) {
        console.warn('[visitor-counter] unexpected response:', svg.slice(0, 300));
        throw new Error('parse failed');
      }
      var today = m[1].replace(/,/g, '');
      var total = m[2].replace(/,/g, '');
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ date: todayStr, today: today, total: total }));
      } catch (e) {}
      render(today, total);
    })
    .catch(function (err) {
      console.error('[visitor-counter]', err);
      todayEl.textContent = '-';
      totalEl.textContent = '-';
    });
})();
