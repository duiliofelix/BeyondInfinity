class SystemViewer {
  constructor(viewer, callback) {
    this.viewer = $(viewer);
    this.example = this.viewer.find('.example');
    this.planetList = this.viewer.find('.planets');
    this.callback = callback;
  }

  viewSystem(systemId) {
    $.ajax({
      url: '/systems/' + systemId,
      type: 'GET',
      context: this,
      success: function(system) {
        this.system = system;
      },
      error: function() {
      },
      complete: this.showSystem
    });
  }

  showSystem() {
    this.viewer.find('.system-name').text(this.system.system.name);

    let callback = this.callback;
    let example = this.example;
    let planetList = this.planetList;

    planetList.empty();
    $.each(this.system.planets, function(index, planetInfo) {
      let planet = example.clone();

      planet.find('.planet').data('id', planetInfo.id);
      planet.find('.planet .name').text(planetInfo.name);
      planet.find('button').click(callback);
      planet.removeClass('example');

      planetList.append(planet);
    });
  }
}
