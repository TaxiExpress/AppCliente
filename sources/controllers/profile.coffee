class __Controller.ProfileCtrl extends Monocle.Controller

  elements:
    "#reg_email"                      : "email"
    "#reg_phone"                      : "phone"
    "#reg_name"                       : "name"
    "#reg_surname"                    : "surname"
    "#reg_image"                      : "image"
    "#avatar"                         : "avatar"

  events:
    "singleTap #save"                 : "saveChanges"
    "singleTap #avatar"               : "clickAvatar"
    "change #reg_image"               : "saveAvatar"

  saveAvatar: (event) =>
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
        $("#avatar").attr "src", dataURL

  clickAvatar: (event) =>
    $("#reg_image").click()

  saveChanges: (event) =>
    Lungo.Router.back()