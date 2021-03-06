class __Controller.PhoneVerificationCtrl extends Monocle.Controller

  elements:
    "#phoneVerification_phone"                         : "phone"
    "#phoneVerification_code"                          : "code"
    "#phoneVerification_emailcode"                     : "email"

  events:
    "singleTap #phoneVerification_b"                   : "doVerification"

  constructor: ->
    super


  setPhone: (phone) ->
    @phone[0].value = phone
    @phone[0].disabled = true


  doVerification: (event) => 
    if !(@phone[0].value || @code[0].value ||  @email[0].value )
      navigator.notification.alert "Debes rellenar todos los campos", null, "Taxi Express", "Aceptar"
    else if @code[0].value.length < 4 || @email[0].value.length < 4
      navigator.notification.alert "Los códigos deben tener al menos 4 dígitos", null, "Taxi Express", "Aceptar"
    else
      server = Lungo.Cache.get "server"
      phone = "+34" + @phone[0].value
      session = Lungo.Cache.get "session"
      data =
        phone: phone
        validationCode: @code[0].value
        validationCodeEmail: @email[0].value
        sessionID: session
      $$.ajax
        type: "POST"
        url: server + "client/validate"
        data: data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"


  parseResponse: (result) =>
    __Controller.register.validated()
    @code[0].value = ""
    @email[0].value = ""
    @phone[0].value = ""
    @phone[0].disabled = false

