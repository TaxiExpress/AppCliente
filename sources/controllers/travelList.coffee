class __Controller.TravelListCtrl extends Monocle.Controller

  _views = []

  constructor: ->
    super
    @loadTravelList()

  loadTravelList: =>
    for travel in __Model.Travel.all()
      _views[travel.id] = new __View.Travel model: travel

  deleteTravel: (travel) =>
    server = Lungo.Cache.get "server"
    credentials = Lungo.Cache.get "credentials"
    $$.ajax
      type: "POST"
      url: server + "client/removetravel"
      data: 
        email: credentials.email
        travel_id: travel.id
      success: (result) =>
        _views[travel.id].remove()
        _views[travel.id] = undefined
        travel.destroy()
        @tryEmpty()
      error: (xhr, type) =>
        @

  tryEmpty: =>
    if __Model.Travel.all().length == 0
      empty_travels.style.visibility = "visible"
    else
      empty_travels.style.visibility = "hidden"


