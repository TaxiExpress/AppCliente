class __Controller.PaymentCtrl extends Monocle.Controller

  amount = undefined

  elements:
    "#payment_credit_card"                        : "creditCard"
    "#payment_cvc"                                : "cvc"
    "#payment_expires"                            : "expires"
    "#payment_submit"                             : "button"
    "#payment_amount"                             : "amount_text"
    "#payment_errors"                             : "errors"

  events:
    "singleTap #payment_submit"                   : "doPayment"

  constructor: ->
    super
    @loadPayment(23)

  loadPayment: (amount_payment) ->
    amount = amount_payment
    @amount_text[0].innerText = "A pagar: "+amount+" €"
    @creditCard.val("")
    @cvc.val("")
    @expires.val("")
    @button[0].disabled = false

  doPayment: (event) =>
    @button[0].disabled = true
    Stripe.setPublishableKey "pk_test_WKa2sNz0xP9t3ue3ao1nYBSf"
    Stripe.createToken
      name: "David Lallana"
      number: "4242424242424242"#@creditCard.val()
      cvc: "123"#@cvc.val()
      exp_month: "12"#@expires.val().substring 0, 3
      exp_year: "2014"#@expires.val().substring 4, 8
    , amount, @stripeResponseHandler
 
  stripeResponseHandler: (status, response) =>
    @button[0].disabled = false
    if response.error      
      @errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos."
    else
      Lungo.Notification.html '<h2 data-icon="spinner">Trayecto pagado</h2>', "Aceptar"
      Lungo.Router.section "home_s"