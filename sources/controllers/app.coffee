class __Controller.AppCtrl extends Monocle.Controller

  constructor: ->
    super
    Lungo.Cache.set "server", "http://TaxiLoadBalancer-638315338.us-east-1.elb.amazonaws.com/"
    __Controller.login = new __Controller.LoginCtrl "section#login_s"
    __Controller.register = new __Controller.RegisterCtrl "section#register_s"
    __Controller.phoneVerification = new __Controller.PhoneVerificationCtrl "section#phoneVerification_s"
    __Controller.sendSMS = new __Controller.SendSMSCtrl "section#sendSMS_s"
    __Controller.filters = new __Controller.FiltersCtrl "section#filters_s"

$$ ->
  Lungo.init({})
  __Controller.push = new __Controller.PushCtrl
  __Controller.App = new __Controller.AppCtrl "section#init_s"