class __Controller.PhoneVerificationCtrl extends Monocle.Controller

  elements:
    "#phoneVerification_phone"                         : "phone"
    "#phoneVerification_code"                          : "code"

  events:
    "singleTap #phoneVerification_b"                   : "doVerification"

  constructor: ->
    super

  setPhone: (phone) ->
    @phone[0].value = phone
    @phone[0].disabled = true

  doVerification: (event) => 
    if !(@phone[0].value || @code[0].value)
      alert "Debes rellenar todos los campos"
    else if @code[0].value.length < 4
      alert "El código debe tener al menos 4 dígitos"
    else
      server = Lungo.Cache.get "server"
      phone = "+34" + @phone[0].value
      data =
        phone: phone
        validationCode: @code[0].value
      $$.ajax
        type: "POST"
        url: server + "client/validate"
        data: data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          alert type.response

  parseResponse: (result) =>
    __Controller.register.validated()
    @code[0].value = ""
    @phone[0].value = ""
    @phone[0].disabled = false