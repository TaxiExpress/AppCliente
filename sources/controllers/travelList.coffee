class __Controller.TravelListCtrl extends Monocle.Controller

  _views = []

  constructor: ->
    super
    @loadTravelList()

  loadTravelList: =>
    for travel in __Model.Travel.all()
      _views[travel.id] = new __View.Travel model: travel

  deleteTravel: (travel) =>
    _views[travel.id].remove()
    _views[travel.id]= undefined
    travel.destroy()