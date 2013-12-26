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
    #@drop()
    @read()

  doLogin: (event) =>
    Lungo.Router.section "init_s"
    @drop()
    date = new Date("1/1/1970").toISOString().substring 0, 19
    date = date.replace "T", " "
    @valideCredentials(@username[0].value, @password[0].value, date)

  valideCredentials: (email, pass, date) =>
    server = Lungo.Cache.get "server"
    @parseResponse ""
    $$.ajax
      type: "POST"
      url: server + "client/login"
      data:
        email: email
        password: pass
        lastUpdate: date
      success: (result) =>
        #@parseResponse result
      error: (xhr, type) =>
        console.log type.response
        Lungo.Router.section "login_s"

  parseResponse: (result) ->
    if result.email == undefined
      profile = @getProfile(credentials) 
    else 
      profile = @getProfile(result)
      @db.transaction (tx) =>
        sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('"+profile.email+"','"+@password[0].value+"','"+profile.dateUpdate+"','"+profile.name+"','"+profile.surname+"','"+profile.phone+"','"+profile.image+"');"
        tx.executeSql sql
    Lungo.Cache.set "credentials", profile
    @loadFavoriteTaxis()
    @loadTravels()
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
    __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
    __Controller.favorites = new __Controller.FavoritesCtrl "section#favorites_s"
    __Controller.favDriver = new __Controller.FavDriverCtrl "section#favDriver_s"
    __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl "section#chosenTaxi_s"
    __Controller.nearDriver = new __Controller.NearDriverCtrl "section#list_s"
    __Controller.travelList = new __Controller.TravelListCtrl "section#travelList_s"
    __Controller.travelDetails = new __Controller.TravelDetailsCtrl "section#travelDetails_s"
    __Controller.filters = new __Controller.FiltersCtrl "section#filters_s"
    setTimeout((=>__Controller.home = new __Controller.HomeCtrl "section#home_s") , 1000)

  getProfile: (result) ->
    return profile =
      name: result.name
      surname: result.surname
      phone: result.phone
      email: result.email
      image: result.image
      dateUpdate: result.dateUpdate

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

  loadFavoriteTaxis: =>
    i = 0
    while i < 5
      license = "DDAS65DAS" + i.toString()
      name = "Taxista "
      surname = i.toString()
      valoration = (i % 5) 
      position = new google.maps.LatLng(43.271239,-2.9445875)
      plate = "DVT 78" + i.toString()
      model = "Opel Corsa"
      image = "http://www.futbolsalaragon.com/imagenes/alfonsorodriguez2012.JPG"
      capacity = 4
      accesible = false
      animals = false
      appPayment = (i % 4 == 0)
      i++
      favDriver = __Model.FavoriteDriver.create license: license, name: name, surname: surname, valoration: valoration, position: position, plate: plate, model: model, image: image, capacity: capacity, accesible: accesible, animals: animals, appPayment: appPayment

  loadTravels: =>
    i = 0
    while i < 2
      id = i
      starttime = new Date()
      endtime = new Date()
      endtime.setMinutes(endtime.getMinutes()+21)
      startpoint = new google.maps.LatLng(43.371239,-2.9445875)
      endpoint = new google.maps.LatLng(43.281239,-2.9445875)
      origin = "Bilbao"
      destination = "Bilbao"
      cost = "DVT 78" + i.toString()
      driver = __Model.FavoriteDriver.get("DDAS65DAS0")[0]
      i++
      travel = __Model.Travel.create id: id, starttime: starttime, endtime: endtime, startpoint: startpoint, endpoint: endpoint, cost: cost, driver: driver, origin: origin, destination: destination
