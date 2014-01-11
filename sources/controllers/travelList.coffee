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

  deleteTravel: (travel) =>
    server = Lungo.Cache.get "server"
    @credentials = Lungo.Cache.get "credentials"
    @date = new Date().toISOString().substring 0, 19
    @date = date.replace "T", " "
    $$.ajax
      type: "POST"
      url: server + "client/removetravel"
      data: 
        email: @credentials.email
        travel_id: travel.id
        lastUpdateTravels: @date
      success: (result) =>
        _views[travel.id].remove()
        _views[travel.id] = undefined
        travel.destroy()
        @tryEmpty()
        @updateLastUpdateTravel(travel.id)
      error: (xhr, type) =>
        @

  tryEmpty: =>
    if __Model.Travel.all().length == 0
      empty_travels.style.display = "block"
    else
      empty_travels.style.display = "none"

  updateLastUpdateTravel: (id) =>
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024)
    db.transaction (tx) =>
      sql = "UPDATE profile SET lastUpdateTravels = '"+@date+"' WHERE email ='"+@credentials.email+"';"
      tx.executeSql sql
      sql = "DELETE FROM travels WHERE id ='"+id+"';"
      tx.executeSql sql
