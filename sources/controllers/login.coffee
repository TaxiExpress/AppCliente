class __Controller.LoginCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined

  elements:
    "#login_username"                              : "username"
    "#login_password"                              : "password"
    "#csrfmiddlewaretoken"                         : "csrfmiddlewaretoken"

  events:
    "tap #login_login_b"                           : "doLogin"

  constructor: ->
    super
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024) #2MB
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS accessData (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, dateUpdate STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL )"
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS configData (email STRING NOT NULL PRIMARY KEY, seats STRING NOT NULL, payments STRING NOT NULL, animals STRING NOT NULL, food STRING NOT NULL, accesible STRING NOT NULL)"
    @drop()
    @read()

  doLogin: (event) =>
    Lungo.Router.section "init_s"
    @drop()
    date = new Date("1/1/1970").toISOString().substring 0, 19
    date = date.replace "T", " "
    @valideCredentials(@username[0].value, @password[0].value, date)

  valideCredentials: (email, pass, date) =>
    server = Lungo.Cache.get "server"
    $$.ajax
      type: "POST"
      url: server + "client/login"
      data:
        email: email
        password: pass
        lastUpdate: date
      success: (result) =>
        @parseResponse result
      error: (xhr, type) =>
        setTimeout((=>Lungo.Router.section "login_s") , 500)
        @password[0].value = ""
        alert type.response        

  parseResponse: (result) ->
    if result.email == undefined
      profile = @getProfile(credentials) 
    else 
      profile = @getProfile(result)
      profile.phone = profile.phone.substring 3
      @db.transaction (tx) =>
        date = profile.dateUpdate.substring 0, 19
        date = date.replace "T", " "
        sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('"+profile.email+"','"+@password[0].value+"','"+date+"','"+profile.name+"','"+profile.surname+"','"+profile.phone+"','"+profile.image+"');"
        tx.executeSql sql
    Lungo.Cache.set "credentials", profile
    @loadFavoriteTaxis(result.favlist)
    @loadTravels(result.travel_set)
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
    __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
    __Controller.favorites = new __Controller.FavoritesCtrl "section#favorites_s"
    __Controller.favDriver = new __Controller.FavDriverCtrl "section#favDriver_s"
    __Controller.waiting = new __Controller.WaitingCtrl "section#waiting_s"
    __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl "section#chosenTaxi_s"
    __Controller.nearDriver = new __Controller.NearDriverCtrl "section#list_s"
    __Controller.travelList = new __Controller.TravelListCtrl "section#travelList_s"
    __Controller.travelDetails = new __Controller.TravelDetailsCtrl "section#travelDetails_s"
    __Controller.filters = new __Controller.FiltersCtrl "section#filters_s"
    setTimeout((=>__Controller.home = new __Controller.HomeCtrl "section#home_s") , 1000)

  getProfile: (result) ->
    return profile =
      name: result.first_name
      surname: result.last_name
      phone: result.phone
      email: result.email
      image: result.image
      dateUpdate: result.lastUpdate

  drop: =>
    @db.transaction (tx) =>
      tx.executeSql "DELETE FROM accessData"

  read: =>
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM accessData", [], ((tx, results) =>
        if results.rows.length > 0
          credentials = results.rows.item(0)
          @valideCredentials(credentials.email, credentials.pass, credentials.dateUpdate)
        else
          Lungo.Router.section "login_s"
      ), null

  loadFavoriteTaxis: (taxis) =>
    if taxis.length > 0
      empty_favorites.style.visibility = "hidden"
      empty_favorites2.style.visibility = "hidden"
    for taxi in taxis
      email = taxi.email
      phone = taxi.phone
      name = taxi.first_name
      surname = taxi.last_name
      valuation = taxi.valuation
      plate = taxi.car.plate
      model = taxi.car.company + " " + taxi.car.model
      image = taxi.image
      capacity = taxi.car.capacity
      accesible = taxi.car.accesible
      animals = taxi.car.animals
      appPayment = taxi.car.appPayment
      favDriver = __Model.FavoriteDriver.create email: email, phone: phone, name: name, surname: surname, valuation: valuation, plate: plate, model: model, image: image, capacity: capacity, accesible: accesible, animals: animals, appPayment: appPayment

  loadTravels: (travels) =>
    if travels.length > 0
      empty_travels.style.visibility = "hidden"
    for travel in travels
      id = travel.id
      starttime = new Date(travel.starttime)
      endtime = new Date(travel.endtime)
      coords = travel.startpoint.substring 7
      pos = coords.indexOf " "
      long = coords.substring 0, pos
      lat = coords.substring pos+1, coords.indexOf ")"
      startpoint = new google.maps.LatLng(long,lat)
      coords = travel.endpoint.substring 7
      pos = coords.indexOf " "
      long = coords.substring 0, pos
      lat = coords.substring pos+1, coords.indexOf ")"
      endpoint = new google.maps.LatLng(long,lat)
      origin = travel.origin
      destination = travel.destination
      cost = travel.cost
      driver2 = travel.driver
      model = driver2.car.company + " " + driver2.car.model
      driver = __Model.Driver.create email: driver2.email, name: driver2.first_name, surname: driver2.last_name, valuation: driver2.valuation, plate: driver2.car.plate, model: model, image: driver2.image, capacity: driver2.car.capacity, accesible: driver2.car.accesible, animals: driver2.car.animals, appPayment: driver2.car.appPayment
      travel = __Model.Travel.create id: id, starttime: starttime, endtime: endtime, startpoint: startpoint, endpoint: endpoint, cost: cost, driver: driver, origin: origin, destination: destination
