class __Controller.LoginCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined
  phone_number = undefined

  elements:
    "#username"                              : "username"
    "#password"                              : "password"

  events:
    "tap #login_b"                           : "doLogin"

  constructor: ->
    super
    phone_number = Lungo.Cache.get "phone"
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024) #2MB
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS accessData (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, dateUpdate STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL )"
    #@drop()
    @read()

  doLogin: (event) =>
    Lungo.Router.section "init_s"
    @drop()
    date = new Date("1/1/1970").toISOString().substring 0, 19
    date = date.replace "T", " "
    @valideCredentials(@username[0].value, @password[0].value, phone_number, date)

  valideCredentials: (email, pass, phone, date)=>
    server = Lungo.Cache.get "server"
    url = server + "client/login"
    data = 
      email: email
      password: pass
      phone: phone_number
      lastUpdate: date
    #result = Lungo.Service.post(url, data, @parseResponse, "json")
    @parseResponse("")

  parseResponse: (result) =>
    if result.first_name == undefined
      profile = @getProfile(credentials) 
    else 
      profile = @getProfile(result)
      @db.transaction (tx) =>
        sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('"+profile.email+"','"+@password[0].value+"','"+profile.dateUpdate+"','"+profile.name+"','"+profile.surname+"','"+profile.phone+"','"+profile.image+"');"
        tx.executeSql sql
    Lungo.Cache.set "credentials", profile
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
    __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
    setTimeout((=>__Controller.home = new __Controller.HomeCtrl "section#home_s") , 1000)

  getProfile: (result) ->
    return profile =
      name: "Héctor"#result.name
      surname: "Torres Gómez"#result.surname
      phone: "667933233"#result.phone
      email: "emaildeprueba@gmail.com"#result.email
      image: "https://pbs.twimg.com/profile_images/378800000638981863/e6b9769bbd741c6e98e3cb1fb79dbdfb.jpeg"#result.image
      dateUpdate: "2013-12-13 16:12:35"#result.dateUpdate

  drop: =>
    @db.transaction (tx) =>
      tx.executeSql "DELETE FROM accessData"

  read: =>
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM accessData", [], ((tx, results) =>
        if results.rows.length > 0
          credentials = results.rows.item(0)
          @valideCredentials(credentials.email, credentials.pass, phone_number, credentials.dateUpdate)
        else
          Lungo.Router.section "login_s"
      ), null
