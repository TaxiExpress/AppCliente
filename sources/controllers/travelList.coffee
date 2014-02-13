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


  cleanTravels: ->
    for travel in __Model.Travel.all()
      __Model.Travel.get(travel.id)[0].destroy()
      _views[travel.id].remove()
      _views[travel.id]= undefined
    empty_travels.style.display = "block"


  addTravel: (travel) =>
    empty_travels.style.display = "none"
    _views[travel.id] = new __View.Travel model: travel
