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
    "singleTap #profile_avatar"           : "clickAvatar"
    "singleTap #profile_header"           : "clickHeader"
    "change #profile_image"               : "saveAvatar"
    "change #profile_name"                : "saveChanges"
    "change #profile_surname"             : "saveChanges"

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
    setTimeout((=>@saveChanges()) , 500)


  clickAvatar: (event) =>
    @image[0].click()


  clickHeader: (event) =>
    input = document.getElementById("profile_name")
    input.blur()
    input = document.getElementById("profile_surname")
    input.blur()


  saveChanges: (event) =>
    server = Lungo.Cache.get "server"
    @date = new Date().toISOString().substring 0, 19
    @date = @date.replace "T", " "
    avatar = @avatar[0].src
    avatar = "" if @avatar[0].src.indexOf("user.png") != -1
    session = Lungo.Cache.get "session"
    data =
      email: @email[0].innerText
      firstName: @name[0].value
      lastName: @surname[0].value
      newImage: avatar
      lastUpdate: @date
      sessionID: session
    $$.ajax
      type: "POST"
      url: server + "client/changedetails"
      data: data
      success: (result) =>
        @parseResponse result
      error: (xhr, type) =>
        @


  parseResponse: (result) =>
    credentials = Lungo.Cache.get "credentials"
    credentials.name = @name[0].value
    credentials.surname = @surname[0].value
    credentials.image = @avatar[0].src
    Lungo.Cache.set "credentials", credentials
    __Controller.menu.updateProfile()
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    db.transaction (tx) =>
      sql = "UPDATE profile SET lastUpdate = '"+@date+"', name = '"+credentials.name+"', surname = '"+credentials.surname+"', image = '"+credentials.image+"' WHERE email ='"+credentials.email+"';"
      tx.executeSql sql

  resetProfile: ->
    profile_avatar.src = "img/user.png"
    @name[0].value = ""
    @surname[0].value = ""
