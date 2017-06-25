class SystemList {
  constructor(list, callback) {
    this.listDock = $(list);
    this.example = this.listDock.find('.example');
    this.systemList = this.listDock.find('.systems');
    this.callback = callback;
  }

  listSystems() {
    $.ajax({
      url: '/systems',
      type: 'GET',
      context: this,
      success: function(systems) {
        this.systems = systems;
      },
      error: function() {},
      complete: this.showList
    });
  }

  showList() {
    this.listDock.show();

    let callback = this.callback;
    let example = this.example;
    let systemList = this.systemList;

    systemList.empty();
    $.each(this.systems, function(index, system) {
      let listItem = example.clone();
      let viewButton = listItem.find('.view-system');

      listItem.find('.system-name').text(system.name);
      viewButton.click(callback);
      viewButton.data('systemId', system.id);
      listItem.removeClass('example');

      systemList.append(listItem);
    });
  }
}
