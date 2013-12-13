class __Controller.LoginCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined

  elements:
    "#username"                              : "username"
    "#password"                              : "password"

  events:
    "tap #login_b"                           : "doLogin"

  constructor: ->
    super
    @db = window.openDatabase("taxiexpress", "1.0", "description", 2 * 1024 * 1024) #2MB
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS access (username STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL)"
    #@drop()
    @read()

  doLogin: (event) =>
    Lungo.Router.section "init_s"
    @drop()
    @db.transaction (tx) =>
      sql = "INSERT INTO access (username, pass) VALUES ('"+@username[0].value+"','"+@password[0].value+"');"
      tx.executeSql sql
    @valideCredentials(@username[0].value, @password[0].value)

  valideCredentials: (email, pass)=>
    url = "http://192.168.43.137:8000/client/login"
    data = 
      email: email
      password: pass
    #result = Lungo.Service.post(url, data, @parseResponse, "json")
    __Controller.home = new __Controller.HomeCtrl "section#home_s"

  Lungo.Service.Settings.error = (type, xhr) ->
    console.log xhr.response
    Lungo.Notification.confirm
      title: "Error al autenticar"
      description: "Los datos introductidos no son correctos."
      accept:
        label: "Reintentar"
        callback: =>
          setTimeout((=>@valideCredentials()) , 250)
      cancel:
        label: "Cambiar credenciales"
        callback: =>
          @password[0].value = ""
          Lungo.Router.section "login_s"

  parseResponse: (result) =>
    profile =
      user: @username[0].value,
      pass: @password[0].value
    Lungo.Cache.set "credentials", profile
    __Controller.home = new __Controller.HomeCtrl "section#home_s"

  drop: =>
    @db.transaction (tx) =>
      tx.executeSql "DELETE FROM access"

  read: =>
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM access", [], ((tx, results) =>
        if results.rows.length > 0
          credentials = results.rows.item(0)
          @valideCredentials(credentials.username,credentials.pass)
        else
          Lungo.Router.section "login_s"
      ), null
