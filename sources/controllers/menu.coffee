class __Controller.MenuCtrl extends Monocle.Controller

  elements:
    "#menu_profile_avatar"                     : "avatar"
    "#menu_profile_phone"                      : "phone"
    "#menu_profile_name"                       : "name"

  events:
    "tap #menu_logout_b"                         : "doLogOut"

  constructor: ->
    super
    @updateProfile()


  updateProfile: ->
    profile = Lungo.Cache.get "credentials"
    @phone[0].textContent = "Tel. " + profile.phone
    if profile.name == "" | profile.name == null
      @name[0].textContent = profile.email
    else
      @name[0].textContent = profile.name + " " + profile.surname
    if profile.image
      @avatar[0].src = profile.image 
      if __Controller.home
        __Controller.home.setPhotoPoi profile.image

  getPhoto: =>
    return @avatar[0].src

  doLogOut: ->
    Lungo.Aside.hide()
    onConfirm = (button) =>
      switch button
        when 1
          Lungo.Router.section "login_s"
          __Controller.profile.resetProfile()
          __Controller.favorites.cleanFavorites()
          __Controller.travelList.cleanTravels()
          __Controller.home.setPhotoPoi("img/user.png")
          Lungo.Cache.remove "travelID"
          Lungo.Cache.remove "travelAccepted"
          Lungo.Cache.remove "credentials"
          @avatar[0].src = "img/user.png"
        when 2
          @
      return
    navigator.notification.confirm "", onConfirm, "¿Desea cerrar sesión?", "Sí,No"


    