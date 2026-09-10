(function () {
  const lines = [
    'jednou si oholila hlavu.',
    'je pro každou srandu.',
    'je nadšenec do zdravého jídla.',
    'leze, běhá a občas přemýšlí, proč si to vlastně dělá.',
    'je ambiciózní až trochu moc.',
    'má ráda koriandr. Hodně.',
    'ví, že ananas na pizzu patří. Ale jen na smetanovou.',
    'umí upéct pizzu, takže ti ji klidně udělá.',
    'je iPhone user. Bez dalších otázek.',
    'málokdy má dvě stejné ponožky.',
    'čte fantasy a v noci létá na dracích.',
    'když si něco umane, udělá to.',
    'umí z „tohle bych možná mohla zkusit“ udělat „hotovo“.',
    'věří, že složité věci mohou být jednoduché.',
    'když něco neví, zjistí to.',
    'když něco neumí, naučí se to.',
    'když něco nejde, zkusí to jinak.',
    'má ráda kreativitu, technologie a jejich společné dítě.',
    'raději něco vytvoří, než aby o tom jen mluvila.',
    'Má ráda spontánní nápady. A ještě raději je realizuje.'
  ];

  const el = document.getElementById('rotatingLine');
  if (!el) return;

  const INTERVAL = 3500;
  const FADE = 400;
  let index = 0;

  el.textContent = lines[index];

  setInterval(() => {
    el.classList.add('fade');
    setTimeout(() => {
      index = (index + 1) % lines.length;
      el.textContent = lines[index];
      el.classList.remove('fade');
    }, FADE);
  }, INTERVAL);
})();
