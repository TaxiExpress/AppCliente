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
    @phone[0].disabled= true

  doVerification: (event) => 
    if !(@phone[0].value || @code[0].value)
      alert "Debes rellenar todos los campos"
    else if @code[0].value.length < 4
      alert "Escribe un código válido"
    else
      server = Lungo.Cache.get "server"
      @parseResponse ""
      $$.ajax
        type: "POST"
        url: server + "client/validate"
        data:
          phone: @phone[0].value
          validationCode: @code[0].value
        success: (result) =>
          #@parseResponse result
        error: (xhr, type) =>
          console.log type.response

  parseResponse: (result) =>
    Lungo.Router.section "init_s"
    __Controller.register.validated()
    @code[0].value = ""
    @phone[0].value = ""
    @phone[0].disabled = false