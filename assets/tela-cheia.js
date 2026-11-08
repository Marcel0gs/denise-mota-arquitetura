/* Tela cheia das imagens. A página principal usa nos casos e nas empresas, o portfólio na grade.
   Cada item: { f: 'fachada-01', nome: 'Fachada', alt: '...' }, e abre a versão de 1600 px.
   Precisa do <dialog id="foto-cheia"> na página e de ser carregado antes do script dela. */
(() => {
  const $ = (s) => document.querySelector(s);
  const dlg = $('#foto-cheia'), img = $('#fc-img'), fig = $('#fc-fig');
  if (!dlg) return;
  let lista = [], atual = 0;
  const mostra = (i) => {
    atual = (i + lista.length) % lista.length;
    const it = lista[atual];
    img.style.opacity = 0;
    const nova = new Image();
    nova.onload = () => { img.src = nova.src; img.alt = it.alt; img.style.opacity = 1; };
    nova.src = `assets/img/${it.f}-1600.webp`;
    $('#fc-cat').textContent = it.nome;
    $('#fc-n').textContent = String(atual + 1).padStart(2, '0') + ' / ' + String(lista.length).padStart(2, '0');
  };
  window.abreTelaCheia = (itens, i) => {
    lista = itens;
    $('#foto-cheia .setas').style.visibility = itens.length > 1 ? '' : 'hidden';
    mostra(i);
    dlg.showModal();
  };
  $('#fc-fechar').addEventListener('click', () => dlg.close());
  $('#fc-ant').addEventListener('click', () => mostra(atual - 1));
  $('#fc-prox').addEventListener('click', () => mostra(atual + 1));
  dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.id === 'fc-fig') dlg.close(); });
  let x0 = null;
  fig.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  fig.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) mostra(atual + (dx < 0 ? 1 : -1)); });
})();
