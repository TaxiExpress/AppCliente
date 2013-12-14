class __Controller.AsideCtrl extends Monocle.Controller

  elements:
    "#menu_avatar"                     : "avatar"
    "#menu_phone"                      : "phone"
    "#menu_name"                       : "name"

  constructor: ->
    super
    @updateProfile()

  updateProfile: ->
    profile = Lungo.Cache.get "credentials"
    @phone[0].textContent = "Tel. "+ profile.phone 
    @name[0].textContent = profile.name + " " + profile.surname
    @avatar[0].src = profile.image if profile.image