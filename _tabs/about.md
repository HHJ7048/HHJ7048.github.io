---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

> LLM, 보안, 논문 리뷰 등등
{: .prompt-tip }

<style>
  .visitor-counter {
    display: flex;
    justify-content: center;
    gap: 3rem;
    text-align: center;
    margin: 1.5rem 0;
  }
  .visitor-counter .vc-label {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-bottom: 0.25rem;
  }
  .visitor-counter .vc-value {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1;
  }
</style>

<div id="visitor-counter" class="visitor-counter">
  <div>
    <div class="vc-label">오늘</div>
    <div id="vc-today" class="vc-value">-</div>
  </div>
  <div>
    <div class="vc-label">전체</div>
    <div id="vc-total" class="vc-value">-</div>
  </div>
</div>

<script>
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

  var url = 'https://hitscounter.dev/api/hit?url={{ site.url | url_encode }}&label=visit&icon=eye-fill&color=%23198754';

  fetch(url)
    .then(function (res) { return res.text(); })
    .then(function (svg) {
      var m = svg.match(/aria-label="[^:]*:\s*(\d+)\s*\/\s*(\d+)"/);
      if (!m) throw new Error('parse failed');
      var today = m[1];
      var total = m[2];
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
</script>
