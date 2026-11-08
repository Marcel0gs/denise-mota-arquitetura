/* Menu do celular (08/11/2026, modelo do Box5): os três risquinhos abrem os links por baixo
   do cabeçalho. Fecha ao tocar num link, fora do menu ou no Esc, e quando a tela vira
   computador. Serve às três páginas (index, luz e portfolio). */
(function () {
  var cab = document.querySelector('.topo');
  var botao = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  if (!cab || !botao || !nav) return;
  function abre(sim) {
    cab.classList.toggle('menu-aberto', sim);
    botao.setAttribute('aria-expanded', sim ? 'true' : 'false');
    botao.setAttribute('aria-label', sim ? 'Fechar menu' : 'Abrir menu');
  }
  botao.addEventListener('click', function () { abre(!cab.classList.contains('menu-aberto')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) abre(false); });
  document.addEventListener('click', function (e) { if (cab.classList.contains('menu-aberto') && !cab.contains(e.target)) abre(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cab.classList.contains('menu-aberto')) { abre(false); botao.focus(); }
  });
  var tela = matchMedia('(min-width: 901px)');
  var muda = function (m) { if (m.matches) abre(false); };
  if (tela.addEventListener) tela.addEventListener('change', muda); else if (tela.addListener) tela.addListener(muda);
})();
