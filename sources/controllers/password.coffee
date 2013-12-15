class __Controller.PasswordCtrl extends Monocle.Controller

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
        url = server + "client/changePassword"
        data =
          email: credentials.email
          oldPass: @old_pass[0].value
          newPass: @new_pass1[0].value
        #Lungo.Service.post(url, data, @parseResponse, "json")
        @parseResponse ""
        
  parseResponse: (result) =>
    alert "Contraseña cambiada"
    Lungo.Router.back()
    @new_pass1[0].value = ""
    @new_pass2[0].value = ""
    @old_pass[0].value = ""
