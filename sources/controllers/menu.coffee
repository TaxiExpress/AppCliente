class __Controller.MenuCtrl extends Monocle.Controller

  elements:
    "#menu_profile_avatar"                     : "avatar"
    "#menu_profile_phone"                      : "phone"
    "#menu_profile_name"                       : "name"

  constructor: ->
    super
    @updateProfile()

  updateProfile: ->
    profile = Lungo.Cache.get "credentials"
    @phone[0].textContent = "Tel. "+ profile.phone
    if profile.name == ""
      @name[0].textContent = profile.email
    else
      @name[0].textContent = profile.name + " " + profile.surname
    @avatar[0].src = profile.image if profile.image