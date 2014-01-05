class __Controller.FiltersCtrl extends Monocle.Controller

  elements:
    "#filters_seats"                                : "seats"
    "#filters_payments"                             : "payments"
    "#filters_animals"                              : "animals"
    "#filters_accesible"                            : "accesible"

  events:
    "change #filters_seats"                         : "saveFilters"
    "change #filters_payments"                      : "saveFilters"
    "change #filters_animals"                       : "saveFilters"
    "change #filters_accesible"                     : "saveFilters"

  constructor: ->
    super

  loadFilters: (seats, payments, animals, accesible) =>
    @seats[0].value = seats
    @payments[0].checked = payments
    @animals[0].checked = animals
    @accesible[0].checked = accesible

  saveFilters: (event) =>
    credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    data =
      email: @credentials.email
      seats: @seats[0].value
      payments: @payments[0].checked
      animals: @animals[0].checked
      accesible: @accesible[0].checked
    $$.ajax
      type: "POST"
      url: server + "client/chagefilters"
      data: data
      success: (result) =>
        alert "FILTROS ACTUALIZADOS (QUITAR)"
      error: (xhr, type) =>
        console.log type.response