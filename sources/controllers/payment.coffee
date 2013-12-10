class __Controller.PaymentCtrl extends Monocle.Controller

  amount = undefined

  elements:
    "#credit_card_payment"                        : "creditCard"
    "#cvc_payment"                                : "cvc"
    "#expires_payment"                            : "expires"
    "#submit_payment"                             : "button"
    "#payment-amount"                             : "amount_text"
    "#payment-errors"                             : "errors"
    "#payment-form"                               : "form"

  events:
    "singleTap #submit_payment"                   : "doPayment"

  constructor: ->
    super
    @loadPayment(23)

  doPayment: (event) =>
    @button[0].disabled = true
    Stripe.setPublishableKey "pk_test_omPl1VUhfXi514McgAsj4Sus"
    Stripe.createToken
      name: "David Lallana"
      number: "4242424242424242"#@creditCard.val()
      cvc: @cvc.val()
      exp_month: @expires.val().substring 0, 3
      exp_year: @expires.val().substring 4, 8
    , amount, @stripeResponseHandler
 
  stripeResponseHandler: (status, response) =>
    @button[0].disabled = false
    if response.error      
      @errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos."
    else
      Lungo.Router.section "home_s"

  showErrors: ->

  loadPayment: (amount_payment) ->
    amount = amount_payment
    @amount_text[0].innerText = "A pagar: "+amount+" €"
    @creditCard.val("")
    @cvc.val("")
    @expires.val("")
    @button[0].disabled = false

