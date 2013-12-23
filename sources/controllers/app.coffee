class __Controller.AppCtrl extends Monocle.Controller

  constructor: ->
    super
    Lungo.Cache.set "server", "http://TaxiLoadBalancer-638315338.us-east-1.elb.amazonaws.com/"
    __Controller.login = new __Controller.LoginCtrl "section#login_s"
    __Controller.register = new __Controller.RegisterCtrl "section#register_s"

  Lungo.Service.Settings.error = (type, xhr) ->
    alert xhr.response
    
$$ ->
  Lungo.init({})
  __Controller.App = new __Controller.AppCtrl "section#init_s"
