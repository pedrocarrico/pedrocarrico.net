(function () {
  'use strict';

  const form = document.getElementById('analyzer-form');
  const submitBtn = document.getElementById('submit-btn');
  const result = document.getElementById('result');
  const analyzing = document.getElementById('analyzing');
  const analyzingText = document.getElementById('analyzing-text');
  const progressBar = document.getElementById('progress-bar');
  const verdict = document.getElementById('verdict');
  const resetBtn = document.getElementById('reset-btn');

  // Tab switching between decklist / moxfield inputs.
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => {
        const match = p.dataset.panel === target;
        p.classList.toggle('active', match);
        p.hidden = !match;
      });
    });
  });

  // Suitably scientific-sounding steps. Pure theatre — the verdict is always the same.
  const steps = [
    'Initializing engine…',
    'Parsing decklist…',
    'Cross-referencing 28,412 cards…',
    'Calculating fast mana density…',
    'Detecting two-card combos…',
    'Measuring salt score…',
    'Consulting the Rules Committee…',
    'Assigning bracket…',
    'Finalizing verdict…'
  ];

  function getInput() {
    const activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel) return '';
    const field = activePanel.querySelector('textarea, input');
    return field ? field.value.trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!getInput()) {
      const field = document.querySelector('.tab-panel.active textarea, .tab-panel.active input');
      if (field) field.focus();
      return;
    }

    // Show the analysis theatre.
    result.hidden = false;
    analyzing.hidden = false;
    verdict.hidden = true;
    submitBtn.disabled = true;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });

    let i = 0;
    progressBar.style.width = '0%';
    analyzingText.textContent = steps[0];

    const interval = setInterval(function () {
      i += 1;
      if (i < steps.length) {
        analyzingText.textContent = steps[i];
        progressBar.style.width = Math.round((i / (steps.length - 1)) * 100) + '%';
      } else {
        clearInterval(interval);
        showVerdict();
      }
    }, 420);
  });

  function showVerdict() {
    analyzing.hidden = true;
    verdict.hidden = false;
    submitBtn.disabled = false;
    verdict.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  resetBtn.addEventListener('click', function () {
    result.hidden = true;
    verdict.hidden = true;
    analyzing.hidden = false;
    form.reset();
    document.querySelector('.tab-panel.active textarea, .tab-panel.active input')?.focus();
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
