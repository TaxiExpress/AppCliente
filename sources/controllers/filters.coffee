class __Controller.FiltersCtrl extends Monocle.Controller

  elements:
    "#filters_seats"                                : "seats"
    "#filters_payments"                             : "payments"
    "#filters_animals"                              : "animals"
    "#filters_accessible"                           : "accessible"
    "#filters_distance"                             : "distance"

  events:
    "change #filters_seats"                         : "saveFilters"
    "change #filters_payments"                      : "saveFilters"
    "change #filters_animals"                       : "saveFilters"
    "change #filters_accessible"                    : "saveFilters"
    "change #filters_distance"                      : "saveFilters"

  constructor: ->
    super


  loadFilters: (seats, payments, animals, accessible, distance) =>
    @seats[0].value = seats
    @payments[0].checked = (payments.toString() == "true")
    @animals[0].checked = (animals.toString() == "true")    
    @accessible[0].checked = (accessible.toString() == "true")
    @distance[0].value = distance


  saveFilters: (event) =>
    credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    date = new Date().toISOString().substring 0, 19
    date = date.replace "T", " "
    session = Lungo.Cache.get "session"
    data =
      email: credentials.email
      capacity: @seats[0].value
      appPayment: @payments[0].checked
      animals: @animals[0].checked
      accesible: @accessible[0].checked
      distance: @distance[0].value
      lastUpdate: date
      sessionID: session
    $$.ajax
      type: "POST"
      url: server + "client/changefilters"
      data: data
      success: (result) =>
        @parseResponse result, date
      error: (xhr, type) =>
        @


  parseResponse: (result, date) =>
    credentials = Lungo.Cache.get "credentials"
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    db.transaction (tx) =>
      sql = "UPDATE profile SET lastUpdate = '"+date+"', seats = '"+@seats[0].value+"', distance = '"+@distance[0].value+"', animals = '"+@animals[0].checked+"', payments = '"+@payments[0].checked+"', accessible = '"+@accessible[0].checked+"' WHERE email ='"+credentials.email+"';"
      tx.executeSql sql

