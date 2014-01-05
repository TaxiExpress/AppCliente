class __Controller.FiltersCtrl extends Monocle.Controller

  elements:
    "#filters_seats"                                : "seats"
    "#filters_payments"                             : "payments"
    "#filters_animals"                              : "animals"
    "#filters_accessible"                           : "accessible"

  events:
    "change #filters_seats"                         : "saveFilters"
    "change #filters_payments"                      : "saveFilters"
    "change #filters_animals"                       : "saveFilters"
    "change #filters_accessible"                    : "saveFilters"

  constructor: ->
    super

  loadFilters: (seats, payments, animals, accessible) =>
    @seats[0].value = seats
    @payments[0].checked = payments
    @animals[0].checked = animals
    @accessible[0].checked = accessible

  saveFilters: (event) =>
    credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    data =
      email: credentials.email
      capacity: @seats[0].value
      appPayment: @payments[0].checked
      animals: @animals[0].checked
      accessible: @accessible[0].checked
    $$.ajax
      type: "POST"
      url: server + "client/changefilters"
      data: data
      success: (result) =>
        @
      error: (xhr, type) =>
        @