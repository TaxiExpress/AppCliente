class __Controller.NearDriverCtrl extends Monocle.Controller

  _viewsList = []

  constructor: ->
    super

  loadNearTaxis: =>
    for nearDriver in __Model.Driver.all()
      _viewsList[nearDriver.license] = new __View.NearDriverList model: nearDriver

  deleteNearTaxis: =>
    for nearDriver in __Model.Driver.getAll()
      _viewsList[nearDriver.license].remove()
      _viewsList[nearDriver.license]= undefined
