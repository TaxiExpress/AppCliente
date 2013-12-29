class __Controller.PasswordCtrl extends Monocle.Controller

  credentials = undefined
  newpass = undefined

  elements:
    "#password_old_pass"                       : "old_pass"
    "#password_new_pass1"                      : "new_pass1"
    "#password_new_pass2"                      : "new_pass2"

  events:
    "singleTap #password_save_b"     : "saveNewPassword"

  constructor: ->
    super

  saveNewPassword: (event) =>
    if !(@new_pass1[0].value || @new_pass2[0].value || @old_pass[0].value )
      alert "Debes rellenar todos los campos"
    else if @new_pass1[0].value.length < 8 || @new_pass1[0].value.length > 20
      alert "La contraseña debe tener entre 8 y 20 caracteres"
    else if @new_pass1[0].value != @new_pass2[0].value
      alert "Los valores de la nueva contraseña deben ser iguales"
    else
      server = Lungo.Cache.get "server"
      credentials = Lungo.Cache.get "credentials"
      if @new_pass1[0].value == @new_pass2[0].value
        $$.ajax
          type: "POST"
          url: server + "client/changepassword"
          data:
            email: credentials.email
            oldPass: @old_pass[0].value
            newPass: @new_pass1[0].value
          success: (result) =>
            @parseResponse result
          error: (xhr, type) =>
            alert type.response
        
  parseResponse: (result) =>
    alert "Contraseña cambiada"
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024)
    @newpass = @new_pass1[0].value
    @db.transaction (tx) =>
      sql = "UPDATE accessData SET pass = '"+@newpass+"' WHERE email ='"+credentials.email+"';"
      tx.executeSql sql
    Lungo.Router.back()
    @new_pass1[0].value = ""
    @new_pass2[0].value = ""
    @old_pass[0].value = ""
