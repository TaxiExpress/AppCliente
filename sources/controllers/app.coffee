class __Controller.AppCtrl extends Monocle.Controller

  constructor: ->
    super
    #__Controller.home = new __Controller.HomeCtrl "section#home_s"
    __Controller.login = new __Controller.LoginCtrl "section#login_s"
    __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"

$$ ->
  Lungo.init({})
  __Controller.App = new __Controller.AppCtrl "section#init_s"
