class __Controller.RegisterCtrl extends Monocle.Controller

  elements:
    "#email_fr"                          : "email"
    "#pass1_fr"                          : "pass1"
    "#pass2_fr"                          : "pass2"

  events:
    "singleTap #doRegister"              : "register"

  constructor: ->
    super

  register: (event) =>
    if !(@pass1[0].value || @pass2[0].value || @email[0].value)
      alert "Debes rellenar todos los campos"
    else if @pass1[0].value.length < 8 || @pass1[0].value.length > 20
      alert "La contraseña debe tener entre 8 y 20 caracteres"
    else if @pass1[0].value != @pass2[0].value
      alert "Los valores de la contraseña deben ser iguales"
    else
      date = new Date().toISOString().substring 0, 19
      date = date.replace "T", " "
      phone = Lungo.Cache.get "phone"
      server = Lungo.Cache.get "server"
      url = server + "client/register"
      data = 
        email: @email[0].value
        password: @pass1[0].value
        phone: phone
        dateUpdate: date
      #Lungo.Service.post(url, data, @parseResponse, "json")
      @parseResponse ""

  parseResponse: (result) =>
    Lungo.Notification.html '<h2>Comprueba tu email y verifica el registro para poder acceder</h2>', 'Aceptar'
    Lungo.Router.back()
    @email[0].value = ""
    @pass1[0].value = ""
    @pass2[0].value = ""
