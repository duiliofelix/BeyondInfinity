var dialog = new Dialog('#dialog');
var sv = new SystemViewer('#system-viewer', function() {
  alert();
});
var systemList = new SystemList('#system-list', function() {
  sv.viewSystem($(this).data('systemId'));
});

$('#link-systems').click(function() {
  systemList.listSystems();
});

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

  systemList.listSystems();
});
