(function(){
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeBtn');

  // Aplica tema salvo ou preferência do SO na primeira visita
  function getInitialTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme){
    if (theme === 'dark'){
      root.setAttribute('data-theme','dark');
      if (btn) btn.querySelector('.icon').textContent = '🌞';
    } else {
      root.setAttribute('data-theme','light');
      if (btn) btn.querySelector('.icon').textContent = '🌙';
    }
  }

  const initial = getInitialTheme();
  applyTheme(initial);

  // Persistência ao clicar
  if (btn){
    btn.addEventListener('click',()=>{
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Opcional: reagir a mudanças do sistema quando não houver escolha salva
  if (!localStorage.getItem(STORAGE_KEY) && window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e=>{
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  // Atualiza ano do rodapé (mantido)
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
