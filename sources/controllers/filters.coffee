class __Controller.FiltersCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined
  data = undefined

  elements:
    "#filters_seats"                                : "seats"
    "#filters_payments"                             : "payments"
    "#filters_animals"                              : "animals"
    "#filters_food"                                 : "food"
    "#filters_accesible"                            : "accesible"

  events:
    "change #filters_seats"                         : "saveFilters"
    "change #filters_payments"                      : "saveFilters"
    "change #filters_animals"                       : "saveFilters"
    "change #filters_food"                          : "saveFilters"
    "change #filters_accesible"                     : "saveFilters"

  constructor: ->
    super
    @loadFilters()

  loadFilters: =>
    @credentials = Lungo.Cache.get "credentials"
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024) #2MB
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM configData", [], ((tx, results) =>
        if results.rows.length > 0
          filters = results.rows.item(0)
          @seats[0].value = filters.seats
          @payments[0].checked = filters.payments == 'true'
          @food[0].checked = filters.food == 'true'
          @animals[0].checked = filters.animals == 'true'
          @accesible[0].checked = filters.accesible == 'true'
      ), null
    
  saveFilters: (event) =>
    @credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    @data =
      email: @credentials.email
      seats: @seats[0].value
      payments: @payments[0].checked
      animals: @animals[0].checked
      food: @food[0].checked
      accesible: @accesible[0].checked
    @parseResponse ""
    $$.ajax
      type: "POST"
      url: server + "client/chagefilters"
      data: @data
      success: (result) =>
        #@parseResponse result
      error: (xhr, type) =>
        console.log type.response
  
  parseResponse: (result) =>
    @db.transaction (tx) =>
      sql = "UPDATE configData SET seats = '"+@data.seats+"', payments = '"+@data.payments+"', animals = '"+@data.animals+"', food = '"+@data.food+"' , accesible = '"+@data.accesible+"' WHERE email ='"+@data.email+"';"
      tx.executeSql sql
