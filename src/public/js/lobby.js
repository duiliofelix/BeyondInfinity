var dialog = new Dialog('#dialog');

$(document).ready(function() {
  dialog.dialog =  [
    'Bem-vindo',
    'Teste1',
    'Teste2'
  ];
  dialog.runDialog();

  let h = $(window).height();

  h -= $('#top-nav').outerHeight();
  h -= $('#bottom-nav').outerHeight();

  $('#display').outerHeight(h);

  let sv = new SystemViewer('#system-viewer', function() {
    alert();
  });
  let sl = new SystemList('#system-list');
  sl.listSystems();
});
