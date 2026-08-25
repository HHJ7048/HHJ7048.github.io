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

<script src="{{ '/assets/js/visitor-counter.js' | relative_url }}" defer></script>
