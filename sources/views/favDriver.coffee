class __View.FavDriver extends Monocle.View

  container: "section #favorites_list"

  template  : """ 
  		<li class="thumb arrow selectable" data-view-section="favDriver_s">                
          <img src="{{ image }}" alt="" />
          <div>
              <strong>{{ name }} {{ surname }}</strong>
              <small><strong>{{ valoration }}</strong></small>
          </div>
      </li>
  """

  events:
    "singleTap li"              :  "onView"
    "swipeLeft li"              :  "deleteFavorite"
   
  constructor: ->
    super
    val = ""
    i = 0
    while i < @model.valoration
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @model.valoration = val
    @append @model

  onView: (event) ->
    __Controller.favDriver.loadDriverDetails(@model)

  deleteFavorite: (event) ->
    Lungo.Notification.confirm
      icon: "user"
      title: "Eliminar favorito"
      description: "¿Desea eliminar al taxista de la lista de favoritos?"
      accept:
        label: "Sí"
        callback: =>
          __Controller.favorites.deleteFavorite(@model)
      cancel:
        label: "No"
        callback: ->
          @