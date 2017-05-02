class SystemList {
  constructor(list) {
    this.listDock = $(list);
    this.example = this.listDock.find('.example');
    this.systemList = this.listDock.find('.systems');
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

    let example = this.example;
    let systemList = this.systemList;

    systemList.empty();
    $.each(this.systems, function(index, system) {
      let listItem = example.clone();

      listItem.find('.system-name').text(system.name);
      listItem.removeClass('example');

      systemList.append(listItem);
    });
  }
}
