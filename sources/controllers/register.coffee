class __Controller.RegisterCtrl extends Monocle.Controller

  data = undefined

  elements:
    "#register_phone"                          : "phone"
    "#register_email"                          : "email"
    "#register_pass1"                          : "pass1"
    "#register_pass2"                          : "pass2"

  events:
    "singleTap #register_register_b"           : "register"

  constructor: ->
    super

  register: (event) =>
    if !(@pass1[0].value || @pass2[0].value || @email[0].value || @phone[0].value)
      alert "Debes rellenar todos los campos"
    else if @pass1[0].value.length < 8 || @pass1[0].value.length > 20
      alert "La contraseña debe tener entre 8 y 20 caracteres"
    else if @pass1[0].value != @pass2[0].value
      alert "Los valores de la contraseña deben ser iguales"
    else
      date = new Date().toISOString().substring 0, 19
      date = date.replace "T", " "
      server = Lungo.Cache.get "server"
      phone = "+34" + @phone[0].value
      @data = 
        email: @email[0].value
        password: @pass1[0].value
        phone: phone
        lastUpdate: date
      $$.ajax
        type: "POST"
        url: server + "client/register"
        data: @data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          alert type.response

  parseResponse: (result) =>
    __Controller.phoneVerification.setPhone(@phone[0].value)
    Lungo.Router.section "phoneVerification_s"

  validated: =>
    @phone[0].value = ""
    @email[0].value = ""
    @pass1[0].value = ""
    @pass2[0].value = ""
    Lungo.Router.section "login_s"
