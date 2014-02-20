class __Controller.PasswordCtrl extends Monocle.Controller

  credentials = undefined

  elements:
    "#password_old_pass"                       : "old_pass"
    "#password_new_pass1"                      : "new_pass1"
    "#password_new_pass2"                      : "new_pass2"

  events:
    "singleTap #password_save_b"               : "saveNewPassword"

  constructor: ->
    super


  getPassHash: (pass) =>
    tx = pass
    i = 0
    while i < 5000
      hashObj = new jsSHA(tx, "TEXT")
      tx = hashObj.getHash("SHA-256", "HEX")
      i++
    return tx


  saveNewPassword: (event) =>
    if !(@new_pass1[0].value || @new_pass2[0].value || @old_pass[0].value )
      navigator.notification.alert "Debes rellenar todos los campos", null, "Taxi Express", "Aceptar"
    else if @new_pass1[0].value.length < 8 || @new_pass1[0].value.length > 20
      navigator.notification.alert "La contraseña debe tener entre 8 y 20 caracteres", null, "Taxi Express", "Aceptar"
    else if @new_pass1[0].value != @new_pass2[0].value
      navigator.notification.alert "Los valores de la nueva contraseña deben ser iguales", null, "Taxi Express", "Aceptar"
    else
      server = Lungo.Cache.get "server"
      credentials = Lungo.Cache.get "credentials"
      session = Lungo.Cache.get "session"
      oldPass = @getPassHash @old_pass[0].value
      newPass = @getPassHash @new_pass1[0].value
      if @new_pass1[0].value == @new_pass2[0].value
        $$.ajax
          type: "POST"
          url: server + "client/changepassword"
          data:
            email: credentials.email
            oldPass: oldPass
            newPass: newPass
            sessionID: session
          success: (result) =>
            @parseResponse result
          error: (xhr, type) =>
            console.log type.response
        

  parseResponse: (result) =>
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    db.transaction (tx) =>
      sql = "UPDATE profile SET pass = '"+@new_pass1[0].value+"' WHERE email ='"+credentials.email+"';"
      tx.executeSql sql
    navigator.notification.alert "Contraseña modificada", null, "Taxi Express", "Aceptar"
    Lungo.Router.back()
    @new_pass1[0].value = ""
    @new_pass2[0].value = ""
    @old_pass[0].value = ""

