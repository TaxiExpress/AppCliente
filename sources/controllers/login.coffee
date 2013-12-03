class __Controller.LoginCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined

  elements:
    "#username"                              : "username"
    "#password"                              : "password"

  events:
    "tap #login_b"                     : "doLogin"

  constructor: ->
    super
    @db = window.openDatabase("taxiexpress", "1.0", "description", 5 * 1024 * 1024) #5MB
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS access (username STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL)"
    #@drop()
    @read()

  doLogin: (event) =>
    @drop()
    @db.transaction (tx) =>
      sql = "INSERT INTO access (username, pass) VALUES ('"+@username[0].value+"','"+@password[0].value+"');"
      tx.executeSql sql
    
    #SE VALIDA EN SERVER EL ACCESO
    url = ""
    data = "username="+@username[0].value+"&password="+@password[0].value;
    #result = Lungo.Service.post(url, data, null, "json")

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
          profile =
            user: credentials.username,
            pass: credentials.pass
          Lungo.Cache.set "credentials", profile
          __Controller.home = new __Controller.HomeCtrl "section#home_s"
        else
          Lungo.Router.section "login_s"
      ), null
