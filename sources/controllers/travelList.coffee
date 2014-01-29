class __Controller.TravelListCtrl extends Monocle.Controller

  _views = []
  date = undefined
  credentials = undefined

  constructor: ->
    super
    @loadTravelList()


  loadTravelList: =>
    for travel in __Model.Travel.all()
      _views[travel.id] = new __View.Travel model: travel
