class __Controller.ProfileCtrl extends Monocle.Controller

  date = undefined

  elements:
    "#profile_email"                      : "email"
    "#profile_phone"                      : "phone"
    "#profile_name"                       : "name"
    "#profile_surname"                    : "surname"
    "#profile_image"                      : "image"
    "#profile_avatar"                     : "avatar"

  events:
    "singleTap #profile_save_b"           : "saveChanges"
    "singleTap #profile_avatar"           : "clickAvatar"
    "change #profile_image"               : "saveAvatar"

  constructor: ->
    super
    @loadProfile()
    __Controller.password = new __Controller.PasswordCtrl "section#password_s"
    __Controller.menu = new __Controller.MenuCtrl "aside#menu_s"

  loadProfile: =>
    profile = Lungo.Cache.get "credentials"
    @email[0].textContent = profile.email if profile.email
    @phone[0].textContent = profile.phone if profile.phone
    @name[0].value = profile.name if profile.name
    @surname[0].value = profile.surname if profile.surname
    @avatar[0].src = profile.image if profile.image

  saveAvatar: (event) ->
    file = @image[0].files[0]
    imageType = /image.*/
    reader = new FileReader()
    reader.readAsDataURL file
    reader.onloadend = ->
      tempImg = new Image()
      tempImg.src = reader.result
      tempImg.onload = ->
        MAX_WIDTH = 120
        MAX_HEIGHT = 120
        tempW = tempImg.width
        tempH = tempImg.height
        if tempW > tempH
          if tempW > MAX_WIDTH
            tempH *= MAX_WIDTH / tempW
            tempW = MAX_WIDTH
        else
          if tempH > MAX_HEIGHT
            tempW *= MAX_HEIGHT / tempH
            tempH = MAX_HEIGHT
        canvas = document.createElement("canvas")
        canvas.width = tempW
        canvas.height = tempH
        ctx = canvas.getContext("2d")
        ctx.drawImage this, 0, 0, tempW, tempH
        dataURL = canvas.toDataURL("image/jpeg")
        profile_avatar.src = dataURL

  clickAvatar: (event) =>
    @image[0].click()

  saveChanges: (event) =>
    server = Lungo.Cache.get "server"
    url = server + "client/changeDetails"
    date = new Date().toISOString().substring 0, 19
    date = date.replace "T", " "
    data =
      email: @email[0].textContent
      firstName: @name[0].value
      lastName: @surname[0].value
      image: @avatar[0].src
      dateUpdate: date
    #Lungo.Service.post(url, data, @parseResponse, "json")
    @parseResponse ""

  parseResponse: (result) =>
    credentials = Lungo.Cache.get "credentials"
    credentials.name = @name[0].value
    credentials.surname = @surname[0].value
    credentials.image = @avatar[0].src
    credentials.dateUpdate = date
    Lungo.Cache.set "credentials", credentials
    __Controller.menu.updateProfile()
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024)
    @db.transaction (tx) =>
      sql = "UPDATE accessData SET dateUpdate = '"+credentials.dateUpdate+"', name = '"+credentials.name+"', surname = '"+credentials.surname+"', image = '"+credentials.image+"' WHERE email ='"+credentials.email+"';"
      tx.executeSql sql
    alert "Perfil actualizado"

