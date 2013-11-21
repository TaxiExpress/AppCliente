class __Controller.AppCtrl extends Monocle.Controller

  constructor: ->
    super
    setTimeout((->Lungo.Router.section "home_s") , 1000)
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
    __Controller.home = new __Controller.HomeCtrl "section#home_s"

$$ ->
  Lungo.init({})
  __Controller.App = new __Controller.AppCtrl "section#init_s"
  