(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.Driver = (function(_super) {
    __extends(Driver, _super);

    function Driver() {
      _ref = Driver.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Driver.fields("license", "name", "surname", "valoration", "position", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment");

    Driver.get = function(id) {
      return this.select(function(driver) {
        return driver.license === id;
      });
    };

    return Driver;

  })(Monocle.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.FavoriteDriver = (function(_super) {
    __extends(FavoriteDriver, _super);

    function FavoriteDriver() {
      _ref = FavoriteDriver.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FavoriteDriver.fields("license", "name", "surname", "valoration", "position", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment");

    FavoriteDriver.get = function(id) {
      return this.select(function(driver) {
        return driver.license === id;
      });
    };

    return FavoriteDriver;

  })(Monocle.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.Travel = (function(_super) {
    __extends(Travel, _super);

    function Travel() {
      _ref = Travel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Travel.fields("id", "starttime", "endtime", "startpoint", "endpoint", "cost", "driver", "origin", "destination");

    Travel.get = function(iden) {
      return this.select(function(travel) {
        return driver.id === iden;
      });
    };

    return Travel;

  })(Monocle.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.FavDriver = (function(_super) {
    __extends(FavDriver, _super);

    FavDriver.prototype.container = "section #favorites_list";

    FavDriver.prototype.template = " \n<li class=\"thumb arrow selectable\" data-view-section=\"favDriver_s\">                \n          <img src=\"{{ image }}\" alt=\"\" />\n          <div>\n              <strong>{{ name }} {{ surname }}</strong>\n              <small><strong>{{ valorationStars }}</strong></small>\n          </div>\n      </li>";

    FavDriver.prototype.events = {
      "singleTap li": "onView"
    };

    function FavDriver() {
      var i, val;
      FavDriver.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valoration) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valorationStars = val;
      this.prepend(this.model);
    }

    FavDriver.prototype.onView = function(event) {
      return __Controller.favDriver.loadDriverDetails(this.model);
    };

    return FavDriver;

  })(Monocle.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.FavDriverList = (function(_super) {
    __extends(FavDriverList, _super);

    FavDriverList.prototype.container = "section #favoritesList_a";

    FavDriverList.prototype.template = " \n<li class=\"thumb arrow selectable\">                \n          <img src=\"{{ image }}\" alt=\"\" />\n          <div>\n              <strong>{{ name }} {{ surname }}</strong>\n              <small><strong>{{valorationStars}}</strong></small>\n          </div>\n          {{#appPayment}}<span data-icon=\"credit-card\">\n            <span class=\"icon credit-card\"></span>\n          </span>{{/appPayment}}\n      </li>";

    FavDriverList.prototype.events = {
      "singleTap li": "onView"
    };

    function FavDriverList() {
      var i, val;
      FavDriverList.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valoration) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valorationStars = val;
      this.prepend(this.model);
    }

    FavDriverList.prototype.onView = function(event) {
      __Controller.chosenTaxi.loadDriverDetails(this.model);
      return Lungo.Router.section("chosenTaxi_s");
    };

    return FavDriverList;

  })(Monocle.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.NearDriverList = (function(_super) {
    __extends(NearDriverList, _super);

    NearDriverList.prototype.container = "section #nearList_a";

    NearDriverList.prototype.template = " \n<li class=\"thumb arrow selectable\" data-view-section=\"chosenTaxi_s\">                \n          <div class=\"on-right\">1 minuto</div>\n          <img src=\"{{image}}\" alt=\"\" />\n          <div>\n              <strong>a 402 metros</strong>\n              <small>{{name}} {{surname}}</small>\n              <small><strong>{{valorationStars}}</strong></small>\n          </div>\n          {{#appPayment}}<span data-icon=\"credit-card\">\n            <span class=\"icon credit-card\"></span>\n          </span>{{/appPayment}}\n      </li>";

    NearDriverList.prototype.events = {
      "singleTap li": "onView"
    };

    function NearDriverList() {
      var i, val;
      NearDriverList.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valoration) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valorationStars = val;
      this.prepend(this.model);
    }

    NearDriverList.prototype.onView = function(event) {
      __Controller.chosenTaxi.loadDriverDetails(this.model);
      return Lungo.Router.section("chosenTaxi_s");
    };

    return NearDriverList;

  })(Monocle.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.Travel = (function(_super) {
    var places;

    __extends(Travel, _super);

    places = void 0;

    Travel.prototype.container = "section #travelList_list";

    Travel.prototype.template = " \n<li class=\"thumb arrow selectable\" data-view-section=\"travelDetails_s\">                \n    <div>\n        <strong>{{ origin }} - {{ destination }}</strong>\n        <small>{{ date }}</small>\n    </div>\n</li>";

    Travel.prototype.events = {
      "singleTap li": "onView",
      "swipeLeft li": "deleteTravel"
    };

    function Travel() {
      var date, time;
      Travel.__super__.constructor.apply(this, arguments);
      date = this.model.starttime.getDate() + "/" + (1 + this.model.starttime.getMonth()) + "/" + this.model.starttime.getFullYear() + " ";
      time = this.model.starttime.toISOString().substring(11, 16);
      this.model.date = date + time;
      this.prepend(this.model);
    }

    Travel.prototype.onView = function(event) {
      return __Controller.travelDetails.loadTravelDetails(this.model);
    };

    Travel.prototype.deleteTravel = function(event) {
      var _this = this;
      return Lungo.Notification.confirm({
        icon: "road",
        title: "Eliminar viaje",
        description: "¿Desea eliminar este viaje?",
        accept: {
          label: "Sí",
          callback: function() {
            return __Controller.travelList.deleteTravel(_this.model);
          }
        },
        cancel: {
          label: "No",
          callback: function() {
            return this;
          }
        }
      });
    };

    return Travel;

  })(Monocle.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.AppCtrl = (function(_super) {
    __extends(AppCtrl, _super);

    function AppCtrl() {
      AppCtrl.__super__.constructor.apply(this, arguments);
      Lungo.Cache.set("server", "http://TaxiLoadBalancer-638315338.us-east-1.elb.amazonaws.com/");
      __Controller.login = new __Controller.LoginCtrl("section#login_s");
      __Controller.register = new __Controller.RegisterCtrl("section#register_s");
    }

    Lungo.Service.Settings.error = function(type, xhr) {
      return alert(xhr.response);
    };

    return AppCtrl;

  })(Monocle.Controller);

  $$(function() {
    Lungo.init({});
    return __Controller.App = new __Controller.AppCtrl("section#init_s");
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.ChosenTaxiCtrl = (function(_super) {
    var driverDetails;

    __extends(ChosenTaxiCtrl, _super);

    driverDetails = void 0;

    ChosenTaxiCtrl.prototype.elements = {
      "#chosenTaxi_name": "name",
      "#chosenTaxi_valoration": "valoration",
      "#chosenTaxi_image": "image",
      "#chosenTaxi_license": "license",
      "#chosenTaxi_model": "model",
      "#chosenTaxi_plate": "plate",
      "#chosenTaxi_capacity": "capacity",
      "#chosenTaxi_accesible": "accesible",
      "#chosenTaxi_animals": "animals"
    };

    ChosenTaxiCtrl.prototype.events = {
      "singleTap #chosenTaxi_request": "requestTaxi"
    };

    function ChosenTaxiCtrl() {
      this.requestTaxi = __bind(this.requestTaxi, this);
      this.loadDriverDetails = __bind(this.loadDriverDetails, this);
      ChosenTaxiCtrl.__super__.constructor.apply(this, arguments);
    }

    ChosenTaxiCtrl.prototype.loadDriverDetails = function(driver) {
      this.driverDetails = driver;
      this.name[0].innerText = driver.name + " " + driver.surname;
      this.valoration[0].innerText = driver.valorationStars;
      this.image[0].src = driver.image;
      this.license[0].innerText = driver.license;
      this.model[0].innerText = driver.model;
      this.plate[0].innerText = driver.plate;
      this.capacity[0].innerText = driver.capacity;
      this.accesible[0].innerText = "No";
      if (driver.accesible) {
        this.accesible[0].innerText = "Si";
      }
      this.animals[0].innerText = "No";
      if (driver.animals) {
        return this.animals[0].innerText = "Si";
      }
    };

    ChosenTaxiCtrl.prototype.requestTaxi = function(event) {
      return console.log("solicito taxi");
    };

    return ChosenTaxiCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.FavDriverCtrl = (function(_super) {
    var driverDetails;

    __extends(FavDriverCtrl, _super);

    driverDetails = void 0;

    FavDriverCtrl.prototype.elements = {
      "#favDriver_name": "name",
      "#favDriver_valoration": "valoration",
      "#favDriver_image": "image",
      "#favDriver_license": "license",
      "#favDriver_model": "model",
      "#favDriver_plate": "plate",
      "#favDriver_capacity": "capacity",
      "#favDriver_accesible": "accesible",
      "#favDriver_animals": "animals",
      "#favDriver_favorite": "favorite"
    };

    FavDriverCtrl.prototype.events = {
      "change #favDriver_favorite": "changeFavorite"
    };

    function FavDriverCtrl() {
      this.changeFavorite = __bind(this.changeFavorite, this);
      this.loadDriverDetails = __bind(this.loadDriverDetails, this);
      FavDriverCtrl.__super__.constructor.apply(this, arguments);
    }

    FavDriverCtrl.prototype.loadDriverDetails = function(driver) {
      this.driverDetails = driver;
      this.name[0].innerText = driver.name + " " + driver.surname;
      this.valoration[0].innerText = driver.valorationStars;
      this.image[0].src = driver.image;
      this.license[0].innerText = driver.license;
      this.model[0].innerText = driver.model;
      this.plate[0].innerText = driver.plate;
      this.capacity[0].innerText = driver.capacity;
      this.accesible[0].innerText = "No";
      if (driver.accesible) {
        this.accesible[0].innerText = "Si";
      }
      this.animals[0].innerText = "No";
      if (driver.animals) {
        this.animals[0].innerText = "Si";
      }
      if (__Model.FavoriteDriver.get(driver.license)[0] !== void 0) {
        return this.favorite[0].checked = true;
      } else {
        return this.favorite[0].checked = false;
      }
    };

    FavDriverCtrl.prototype.changeFavorite = function(event) {
      if (this.favorite[0].checked) {
        return __Controller.favorites.addFavorite(this.driverDetails);
      } else {
        return __Controller.favorites.deleteFavorite(this.driverDetails);
      }
    };

    return FavDriverCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.FavoritesCtrl = (function(_super) {
    var _views, _viewsList;

    __extends(FavoritesCtrl, _super);

    _views = [];

    _viewsList = [];

    function FavoritesCtrl() {
      this.deleteFavoriteTaxis = __bind(this.deleteFavoriteTaxis, this);
      this.addFavorite = __bind(this.addFavorite, this);
      this.deleteFavorite = __bind(this.deleteFavorite, this);
      this.loadFavoriteTaxis = __bind(this.loadFavoriteTaxis, this);
      FavoritesCtrl.__super__.constructor.apply(this, arguments);
      this.loadFavoriteTaxis();
    }

    FavoritesCtrl.prototype.loadFavoriteTaxis = function() {
      var favDriver, _i, _len, _ref, _results;
      _ref = __Model.FavoriteDriver.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        favDriver = _ref[_i];
        _views[favDriver.license] = new __View.FavDriver({
          model: favDriver
        });
        _results.push(_viewsList[favDriver.license] = new __View.FavDriverList({
          model: favDriver
        }));
      }
      return _results;
    };

    FavoritesCtrl.prototype.deleteFavorite = function(driver) {
      _views[driver.license].remove();
      _views[driver.license] = void 0;
      _viewsList[driver.license].remove();
      _viewsList[driver.license] = void 0;
      return __Model.FavoriteDriver.get(driver.license)[0].destroy();
    };

    FavoritesCtrl.prototype.addFavorite = function(driver) {
      this.deleteFavoriteTaxis();
      __Model.FavoriteDriver.create({
        license: driver.license,
        name: driver.name,
        surname: driver.surname,
        valoration: driver.valoration,
        position: driver.position,
        plate: driver.plate,
        model: driver.model,
        image: driver.image,
        capacity: driver.capacity,
        accesible: driver.accesible,
        animals: driver.animals,
        appPayment: driver.appPayment
      });
      return this.loadFavoriteTaxis();
    };

    FavoritesCtrl.prototype.deleteFavoriteTaxis = function() {
      var driver, _i, _len, _ref, _results;
      _ref = __Model.FavoriteDriver.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        driver = _ref[_i];
        console.log(driver.license);
        _views[driver.license].remove();
        _views[driver.license] = void 0;
        _viewsList[driver.license].remove();
        _results.push(_viewsList[driver.license] = void 0);
      }
      return _results;
    };

    return FavoritesCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.HomeCtrl = (function(_super) {
    var getStreet, initialize, manageErrors, map, updatePosition,
      _this = this;

    __extends(HomeCtrl, _super);

    map = void 0;

    HomeCtrl.prototype.elements = {
      "#home_refresh_b": "button_refresh",
      "#home_streetField": "streetField",
      "#home_driver": "driver"
    };

    HomeCtrl.prototype.events = {
      "singleTap #home_refresh_b": "refresh",
      "singleTap #home_confirm_b": "confirm",
      "singleTap #map-canvas": "hideAside"
    };

    function HomeCtrl() {
      this.loadNearTaxis = __bind(this.loadNearTaxis, this);
      this.hideAside = __bind(this.hideAside, this);
      this.showAsigning = __bind(this.showAsigning, this);
      this.confirm = __bind(this.confirm, this);
      this.refresh = __bind(this.refresh, this);
      var options;
      HomeCtrl.__super__.constructor.apply(this, arguments);
      if (navigator.geolocation) {
        options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(initialize, manageErrors);
      }
    }

    manageErrors = function(err) {
      var _this = this;
      alert("Error de localización GPS");
      return setTimeout((function() {
        return navigator.geolocation.getCurrentPosition(initialize, manageErrors);
      }), 5000);
    };

    HomeCtrl.prototype.refresh = function(event) {
      var options;
      Lungo.Aside.hide();
      this.streetField[0].value = 'Localizando ...';
      if (navigator.geolocation) {
        options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        };
        return navigator.geolocation.getCurrentPosition(updatePosition, manageErrors);
      }
    };

    updatePosition = function(location) {
      var currentLocation;
      currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      map.setCenter(currentLocation);
      return getStreet(currentLocation);
    };

    HomeCtrl.prototype.confirm = function(event) {
      var _this = this;
      Lungo.Aside.hide();
      return Lungo.Notification.confirm({
        title: "¿Qué taxi desea?",
        description: "Seleccione la opción que  más le convenga",
        accept: {
          label: "El más cercano",
          callback: function() {
            return _this.showAsigning();
          }
        },
        cancel: {
          label: "Elegir taxi",
          callback: function() {
            return _this.loadNearTaxis();
          }
        }
      });
    };

    HomeCtrl.prototype.showAsigning = function() {
      var _this = this;
      Lungo.Notification.hide();
      return setTimeout((function() {
        return Lungo.Notification.html('<h2>Esperando la confirmación del taxi</h2>', 'Cancelar');
      }), 250);
    };

    HomeCtrl.prototype.hideAside = function(event) {
      return Lungo.Aside.hide();
    };

    initialize = function(location) {
      var currentLocation, mapOptions;
      Lungo.Router.section("home_s");
      if (map === void 0) {
        currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        mapOptions = {
          center: currentLocation,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false,
          streetViewControl: false,
          overviewMapControl: false,
          mapTypeControl: false,
          zoomControl: false,
          styles: [
            {
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            }
          ]
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        getStreet(currentLocation);
        google.maps.event.addListener(map, "dragend", function(event) {
          return getStreet(map.getCenter());
        });
        google.maps.event.addListener(map, "dragstart", function(event) {
          return home_streetField.value = 'Localizando ...';
        });
        return google.maps.event.addListener(map, "zoom_changed", function(event) {
          return getStreet(map.getCenter());
        });
      }
    };

    getStreet = function(pos) {
      var geocoder;
      geocoder = new google.maps.Geocoder();
      return geocoder.geocode({
        latLng: pos
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            return home_streetField.value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name;
          } else {
            return home_streetField.value = 'Calle desconocida';
          }
        } else {
          return home_streetField.value = 'Calle desconocida';
        }
      });
    };

    HomeCtrl.prototype.loadNearTaxis = function() {
      var accesible, animals, appPayment, capacity, i, image, license, model, name, plate, position, surname, valoration;
      i = 0;
      while (i < 4) {
        license = "DDAS65DAS" + i.toString();
        name = "Taxista ";
        surname = i.toString();
        valoration = i % 5;
        position = new google.maps.LatLng(43.271239, -2.9445875);
        plate = "DVT 78" + i.toString();
        model = "Opel Corsa";
        image = "http://www.futbolsalaragon.com/imagenes/alfonsorodriguez2012.JPG";
        capacity = 4;
        accesible = false;
        animals = false;
        appPayment = i % 4 === 0;
        i++;
        __Model.Driver.create({
          license: license,
          name: name,
          surname: surname,
          valoration: valoration,
          position: position,
          plate: plate,
          model: model,
          image: image,
          capacity: capacity,
          accesible: accesible,
          animals: animals,
          appPayment: appPayment
        });
      }
      __Controller.nearDriver.loadNearTaxis();
      return Lungo.Router.section("list_s");
    };

    return HomeCtrl;

  }).call(this, Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.LoginCtrl = (function(_super) {
    var credentials, db;

    __extends(LoginCtrl, _super);

    db = void 0;

    credentials = void 0;

    LoginCtrl.prototype.elements = {
      "#login_username": "username",
      "#login_password": "password",
      "#csrfmiddlewaretoken": "csrfmiddlewaretoken"
    };

    LoginCtrl.prototype.events = {
      "tap #login_login_b": "doLogin"
    };

    function LoginCtrl() {
      this.loadTravels = __bind(this.loadTravels, this);
      this.loadFavoriteTaxis = __bind(this.loadFavoriteTaxis, this);
      this.read = __bind(this.read, this);
      this.drop = __bind(this.drop, this);
      this.parseResponse = __bind(this.parseResponse, this);
      this.valideCredentials = __bind(this.valideCredentials, this);
      this.doLogin = __bind(this.doLogin, this);
      var _this = this;
      LoginCtrl.__super__.constructor.apply(this, arguments);
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024);
      this.db.transaction(function(tx) {
        return tx.executeSql("CREATE TABLE IF NOT EXISTS accessData (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, dateUpdate STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL )");
      });
      this.read();
    }

    LoginCtrl.prototype.doLogin = function(event) {
      var date;
      Lungo.Router.section("init_s");
      this.drop();
      date = new Date("1/1/1970").toISOString().substring(0, 19);
      date = date.replace("T", " ");
      return this.valideCredentials(this.username[0].value, this.password[0].value, date);
    };

    LoginCtrl.prototype.valideCredentials = function(email, pass, date) {
      var data, server, url;
      server = Lungo.Cache.get("server");
      url = server + "client/login";
      data = {
        email: email,
        password: pass,
        phone: "677399899",
        lastUpdate: date
      };
      return this.parseResponse("");
    };

    LoginCtrl.prototype.parseResponse = function(result) {
      var profile,
        _this = this;
      if (result.email === void 0) {
        profile = this.getProfile(credentials);
      } else {
        profile = this.getProfile(result);
        this.db.transaction(function(tx) {
          var sql;
          sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('" + profile.email + "','" + _this.password[0].value + "','" + profile.dateUpdate + "','" + profile.name + "','" + profile.surname + "','" + profile.phone + "','" + profile.image + "');";
          return tx.executeSql(sql);
        });
      }
      Lungo.Cache.set("credentials", profile);
      this.loadFavoriteTaxis();
      this.loadTravels();
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
      __Controller.payment = new __Controller.PaymentCtrl("section#payment_s");
      __Controller.favorites = new __Controller.FavoritesCtrl("section#favorites_s");
      __Controller.favDriver = new __Controller.FavDriverCtrl("section#favDriver_s");
      __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl("section#chosenTaxi_s");
      __Controller.nearDriver = new __Controller.NearDriverCtrl("section#list_s");
      __Controller.travelList = new __Controller.TravelListCtrl("section#travelList_s");
      __Controller.travelDetails = new __Controller.TravelDetailsCtrl("section#travelDetails_s");
      return setTimeout((function() {
        return __Controller.home = new __Controller.HomeCtrl("section#home_s");
      }), 1000);
    };

    LoginCtrl.prototype.getProfile = function(result) {
      var profile;
      return profile = {
        name: result.name,
        surname: result.surname,
        phone: result.phone,
        email: result.email,
        image: result.image,
        dateUpdate: result.dateUpdate
      };
    };

    LoginCtrl.prototype.drop = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("DELETE FROM accessData");
      });
    };

    LoginCtrl.prototype.read = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM accessData", [], (function(tx, results) {
          if (results.rows.length > 0) {
            credentials = results.rows.item(0);
            return _this.valideCredentials(credentials.email, credentials.pass, credentials.dateUpdate);
          } else {
            return Lungo.Router.section("login_s");
          }
        }), null);
      });
    };

    LoginCtrl.prototype.loadFavoriteTaxis = function() {
      var accesible, animals, appPayment, capacity, favDriver, i, image, license, model, name, plate, position, surname, valoration, _results;
      i = 0;
      _results = [];
      while (i < 5) {
        license = "DDAS65DAS" + i.toString();
        name = "Taxista ";
        surname = i.toString();
        valoration = i % 5;
        position = new google.maps.LatLng(43.271239, -2.9445875);
        plate = "DVT 78" + i.toString();
        model = "Opel Corsa";
        image = "http://www.futbolsalaragon.com/imagenes/alfonsorodriguez2012.JPG";
        capacity = 4;
        accesible = false;
        animals = false;
        appPayment = i % 4 === 0;
        i++;
        _results.push(favDriver = __Model.FavoriteDriver.create({
          license: license,
          name: name,
          surname: surname,
          valoration: valoration,
          position: position,
          plate: plate,
          model: model,
          image: image,
          capacity: capacity,
          accesible: accesible,
          animals: animals,
          appPayment: appPayment
        }));
      }
      return _results;
    };

    LoginCtrl.prototype.loadTravels = function() {
      var cost, destination, driver, endpoint, endtime, i, id, origin, startpoint, starttime, travel, _results;
      i = 0;
      _results = [];
      while (i < 2) {
        id = i;
        starttime = new Date();
        endtime = new Date();
        endtime.setMinutes(endtime.getMinutes() + 21);
        startpoint = new google.maps.LatLng(43.371239, -2.9445875);
        endpoint = new google.maps.LatLng(43.281239, -2.9445875);
        origin = "Bilbao";
        destination = "Bilbao";
        cost = "DVT 78" + i.toString();
        driver = __Model.FavoriteDriver.get("DDAS65DAS0")[0];
        i++;
        _results.push(travel = __Model.Travel.create({
          id: id,
          starttime: starttime,
          endtime: endtime,
          startpoint: startpoint,
          endpoint: endpoint,
          cost: cost,
          driver: driver,
          origin: origin,
          destination: destination
        }));
      }
      return _results;
    };

    return LoginCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.MenuCtrl = (function(_super) {
    __extends(MenuCtrl, _super);

    MenuCtrl.prototype.elements = {
      "#menu_profile_avatar": "avatar",
      "#menu_profile_phone": "phone",
      "#menu_profile_name": "name"
    };

    function MenuCtrl() {
      MenuCtrl.__super__.constructor.apply(this, arguments);
      this.updateProfile();
    }

    MenuCtrl.prototype.updateProfile = function() {
      var profile;
      profile = Lungo.Cache.get("credentials");
      this.phone[0].textContent = "Tel. " + profile.phone;
      if (profile.name === "") {
        this.name[0].textContent = profile.email;
      } else {
        this.name[0].textContent = profile.name + " " + profile.surname;
      }
      if (profile.image) {
        return this.avatar[0].src = profile.image;
      }
    };

    return MenuCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.NearDriverCtrl = (function(_super) {
    var _viewsList;

    __extends(NearDriverCtrl, _super);

    _viewsList = [];

    function NearDriverCtrl() {
      this.deleteNearTaxis = __bind(this.deleteNearTaxis, this);
      this.loadNearTaxis = __bind(this.loadNearTaxis, this);
      NearDriverCtrl.__super__.constructor.apply(this, arguments);
    }

    NearDriverCtrl.prototype.loadNearTaxis = function() {
      var nearDriver, _i, _len, _ref, _results;
      _ref = __Model.Driver.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        nearDriver = _ref[_i];
        _results.push(_viewsList[nearDriver.license] = new __View.NearDriverList({
          model: nearDriver
        }));
      }
      return _results;
    };

    NearDriverCtrl.prototype.deleteNearTaxis = function() {
      var nearDriver, _i, _len, _ref, _results;
      _ref = __Model.Driver.getAll();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        nearDriver = _ref[_i];
        _viewsList[nearDriver.license].remove();
        _results.push(_viewsList[nearDriver.license] = void 0);
      }
      return _results;
    };

    return NearDriverCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.PasswordCtrl = (function(_super) {
    var credentials, newpass;

    __extends(PasswordCtrl, _super);

    credentials = void 0;

    newpass = void 0;

    PasswordCtrl.prototype.elements = {
      "#password_old_pass": "old_pass",
      "#password_new_pass1": "new_pass1",
      "#password_new_pass2": "new_pass2"
    };

    PasswordCtrl.prototype.events = {
      "singleTap #password_save_b": "saveNewPassword"
    };

    function PasswordCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.saveNewPassword = __bind(this.saveNewPassword, this);
      PasswordCtrl.__super__.constructor.apply(this, arguments);
    }

    PasswordCtrl.prototype.saveNewPassword = function(event) {
      var data, server, url;
      if (!(this.new_pass1[0].value || this.new_pass2[0].value || this.old_pass[0].value)) {
        return alert("Debes rellenar todos los campos");
      } else if (this.new_pass1[0].value.length < 8 || this.new_pass1[0].value.length > 20) {
        return alert("La contraseña debe tener entre 8 y 20 caracteres");
      } else if (this.new_pass1[0].value !== this.new_pass2[0].value) {
        return alert("Los valores de la nueva contraseña deben ser iguales");
      } else {
        server = Lungo.Cache.get("server");
        credentials = Lungo.Cache.get("credentials");
        if (this.new_pass1[0].value === this.new_pass2[0].value) {
          url = server + "client/changepassword";
          data = {
            email: credentials.email,
            oldPass: this.old_pass[0].value,
            newPass: this.new_pass1[0].value
          };
          return this.parseResponse("");
        }
      }
    };

    PasswordCtrl.prototype.parseResponse = function(result) {
      var _this = this;
      alert("Contraseña cambiada");
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024);
      this.newpass = this.new_pass1[0].value;
      this.db.transaction(function(tx) {
        var sql;
        sql = "UPDATE accessData SET pass = '" + _this.newpass + "' WHERE email ='" + credentials.email + "';";
        return tx.executeSql(sql);
      });
      Lungo.Router.back();
      this.new_pass1[0].value = "";
      this.new_pass2[0].value = "";
      return this.old_pass[0].value = "";
    };

    return PasswordCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.PaymentCtrl = (function(_super) {
    var amount;

    __extends(PaymentCtrl, _super);

    amount = void 0;

    PaymentCtrl.prototype.elements = {
      "#payment_credit_card": "creditCard",
      "#payment_cvc": "cvc",
      "#payment_expires": "expires",
      "#payment_submit": "button",
      "#payment_amount": "amount_text",
      "#payment_errors": "errors"
    };

    PaymentCtrl.prototype.events = {
      "singleTap #payment_submit": "doPayment"
    };

    function PaymentCtrl() {
      this.stripeResponseHandler = __bind(this.stripeResponseHandler, this);
      this.doPayment = __bind(this.doPayment, this);
      PaymentCtrl.__super__.constructor.apply(this, arguments);
      this.loadPayment(23);
    }

    PaymentCtrl.prototype.loadPayment = function(amount_payment) {
      amount = amount_payment;
      this.amount_text[0].innerText = "A pagar: " + amount + " €";
      this.creditCard.val("");
      this.cvc.val("");
      this.expires.val("");
      return this.button[0].disabled = false;
    };

    PaymentCtrl.prototype.doPayment = function(event) {
      this.button[0].disabled = true;
      Stripe.setPublishableKey("pk_test_VdRyFEwU3Ap84cUaLp5S8yBC");
      return Stripe.createToken({
        name: "David Lallana",
        email: "davidlallana@gmail.com",
        description: "descripcion de prueba",
        number: "4242424242424242",
        cvc: "123",
        exp_month: "12",
        exp_year: "2014"
      }, amount, this.stripeResponseHandler);
    };

    PaymentCtrl.prototype.stripeResponseHandler = function(status, response) {
      this.button[0].disabled = false;
      if (response.error) {
        return this.errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos.";
      } else {
        Lungo.Notification.html('<h2 data-icon="spinner">Trayecto pagado</h2>', "Aceptar");
        return Lungo.Router.section("home_s");
      }
    };

    return PaymentCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.PhoneVerificationCtrl = (function(_super) {
    __extends(PhoneVerificationCtrl, _super);

    PhoneVerificationCtrl.prototype.elements = {
      "#phoneVerification_phone": "phone",
      "#phoneVerification_code": "code"
    };

    PhoneVerificationCtrl.prototype.events = {
      "singleTap #phoneVerification_b": "doVerification"
    };

    function PhoneVerificationCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.doVerification = __bind(this.doVerification, this);
      PhoneVerificationCtrl.__super__.constructor.apply(this, arguments);
    }

    PhoneVerificationCtrl.prototype.setPhone = function(phone) {
      this.phone[0].value = phone;
      return this.phone[0].disabled = true;
    };

    PhoneVerificationCtrl.prototype.doVerification = function(event) {
      var data, server, url;
      if (!(this.phone[0].value || this.code[0].value)) {
        return alert("Debes rellenar todos los campos");
      } else if (this.code[0].value.length < 4) {
        return alert("Escribe un código válido");
      } else {
        server = Lungo.Cache.get("server");
        url = server + "client/validate";
        data = {
          phone: this.phone[0].value,
          validationCode: this.code[0].value
        };
        return this.parseResponse("");
      }
    };

    PhoneVerificationCtrl.prototype.parseResponse = function(result) {
      Lungo.Router.section("init_s");
      __Controller.register.validated();
      this.code[0].value = "";
      this.phone[0].value = "";
      return this.phone[0].disabled = false;
    };

    return PhoneVerificationCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.ProfileCtrl = (function(_super) {
    var date;

    __extends(ProfileCtrl, _super);

    date = void 0;

    ProfileCtrl.prototype.elements = {
      "#profile_email": "email",
      "#profile_phone": "phone",
      "#profile_name": "name",
      "#profile_surname": "surname",
      "#profile_image": "image",
      "#profile_avatar": "avatar"
    };

    ProfileCtrl.prototype.events = {
      "singleTap #profile_save_b": "saveChanges",
      "singleTap #profile_avatar": "clickAvatar",
      "change #profile_image": "saveAvatar"
    };

    function ProfileCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.saveChanges = __bind(this.saveChanges, this);
      this.clickAvatar = __bind(this.clickAvatar, this);
      this.loadProfile = __bind(this.loadProfile, this);
      ProfileCtrl.__super__.constructor.apply(this, arguments);
      this.loadProfile();
      __Controller.password = new __Controller.PasswordCtrl("section#password_s");
      __Controller.menu = new __Controller.MenuCtrl("aside#menu_s");
    }

    ProfileCtrl.prototype.loadProfile = function() {
      var profile;
      profile = Lungo.Cache.get("credentials");
      if (profile.email) {
        this.email[0].textContent = profile.email;
      }
      if (profile.phone) {
        this.phone[0].textContent = profile.phone;
      }
      if (profile.name) {
        this.name[0].value = profile.name;
      }
      if (profile.surname) {
        this.surname[0].value = profile.surname;
      }
      if (profile.image) {
        return this.avatar[0].src = profile.image;
      }
    };

    ProfileCtrl.prototype.saveAvatar = function(event) {
      var file, imageType, reader;
      file = this.image[0].files[0];
      imageType = /image.*/;
      reader = new FileReader();
      reader.readAsDataURL(file);
      return reader.onloadend = function() {
        var tempImg;
        tempImg = new Image();
        tempImg.src = reader.result;
        return tempImg.onload = function() {
          var MAX_HEIGHT, MAX_WIDTH, canvas, ctx, dataURL, tempH, tempW;
          MAX_WIDTH = 120;
          MAX_HEIGHT = 120;
          tempW = tempImg.width;
          tempH = tempImg.height;
          if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
          } else {
            if (tempH > MAX_HEIGHT) {
              tempW *= MAX_HEIGHT / tempH;
              tempH = MAX_HEIGHT;
            }
          }
          canvas = document.createElement("canvas");
          canvas.width = tempW;
          canvas.height = tempH;
          ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, tempW, tempH);
          dataURL = canvas.toDataURL("image/jpeg");
          return profile_avatar.src = dataURL;
        };
      };
    };

    ProfileCtrl.prototype.clickAvatar = function(event) {
      return this.image[0].click();
    };

    ProfileCtrl.prototype.saveChanges = function(event) {
      var data, server, url;
      server = Lungo.Cache.get("server");
      url = server + "client/changedetails";
      date = new Date().toISOString().substring(0, 19);
      date = date.replace("T", " ");
      data = {
        email: this.email[0].innerText,
        firstName: this.name[0].value,
        lastName: this.surname[0].value,
        newImage: this.avatar[0].src,
        dateUpdate: date
      };
      return this.parseResponse("");
    };

    ProfileCtrl.prototype.parseResponse = function(result) {
      var credentials,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      credentials.name = this.name[0].value;
      credentials.surname = this.surname[0].value;
      credentials.image = this.avatar[0].src;
      credentials.dateUpdate = date;
      Lungo.Cache.set("credentials", credentials);
      __Controller.menu.updateProfile();
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024);
      this.db.transaction(function(tx) {
        var sql;
        sql = "UPDATE accessData SET dateUpdate = '" + credentials.dateUpdate + "', name = '" + credentials.name + "', surname = '" + credentials.surname + "', image = '" + credentials.image + "' WHERE email ='" + credentials.email + "';";
        return tx.executeSql(sql);
      });
      return alert("Perfil actualizado");
    };

    return ProfileCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.RegisterCtrl = (function(_super) {
    var data;

    __extends(RegisterCtrl, _super);

    data = void 0;

    RegisterCtrl.prototype.elements = {
      "#register_phone": "phone",
      "#register_email": "email",
      "#register_pass1": "pass1",
      "#register_pass2": "pass2"
    };

    RegisterCtrl.prototype.events = {
      "singleTap #register_register_b": "register"
    };

    function RegisterCtrl() {
      this.validated = __bind(this.validated, this);
      this.parseResponse = __bind(this.parseResponse, this);
      this.register = __bind(this.register, this);
      RegisterCtrl.__super__.constructor.apply(this, arguments);
    }

    RegisterCtrl.prototype.register = function(event) {
      var date, server, url;
      if (!(this.pass1[0].value || this.pass2[0].value || this.email[0].value || this.phone[0].value)) {
        return alert("Debes rellenar todos los campos");
      } else if (this.pass1[0].value.length < 8 || this.pass1[0].value.length > 20) {
        return alert("La contraseña debe tener entre 8 y 20 caracteres");
      } else if (this.pass1[0].value !== this.pass2[0].value) {
        return alert("Los valores de la contraseña deben ser iguales");
      } else {
        date = new Date().toISOString().substring(0, 19);
        date = date.replace("T", " ");
        server = Lungo.Cache.get("server");
        url = server + "client/register";
        this.data = {
          email: this.email[0].value,
          password: this.pass1[0].value,
          phone: this.phone[0].value,
          lastUpdate: date
        };
        return this.parseResponse("");
      }
    };

    RegisterCtrl.prototype.parseResponse = function(result) {
      __Controller.phoneVerification = new __Controller.PhoneVerificationCtrl("section#phoneVerification_s");
      __Controller.phoneVerification.setPhone(this.phone[0].value);
      return Lungo.Router.section("phoneVerification_s");
    };

    RegisterCtrl.prototype.validated = function() {
      var db, profile,
        _this = this;
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024);
      db.transaction(function(tx) {
        var sql;
        sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('" + _this.data.email + "','" + _this.data.password + "','" + _this.data.lastUpdate + "','','','" + _this.data.phone + "','');";
        return tx.executeSql(sql);
      });
      profile = {
        name: "",
        surname: "",
        phone: this.data.phone,
        email: this.data.email,
        image: "",
        dateUpdate: this.data.lastUpdate
      };
      Lungo.Cache.set("credentials", profile);
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
      __Controller.payment = new __Controller.PaymentCtrl("section#payment_s");
      __Controller.favorites = new __Controller.FavoritesCtrl("section#favorites_s");
      __Controller.favDriver = new __Controller.FavDriverCtrl("section#favDriver_s");
      __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl("section#chosenTaxi_s");
      __Controller.nearDriver = new __Controller.NearDriverCtrl("section#list_s");
      __Controller.travelList = new __Controller.TravelListCtrl("section#travelList_s");
      __Controller.travelDetails = new __Controller.TravelDetailsCtrl("section#travelDetails_s");
      setTimeout((function() {
        return __Controller.home = new __Controller.HomeCtrl("section#home_s");
      }), 1000);
      this.phone[0].value = "";
      this.email[0].value = "";
      this.pass1[0].value = "";
      return this.pass2[0].value = "";
    };

    return RegisterCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.TravelDetailsCtrl = (function(_super) {
    var driverDetails;

    __extends(TravelDetailsCtrl, _super);

    driverDetails = void 0;

    TravelDetailsCtrl.prototype.elements = {
      "#travelDetails_start": "start",
      "#travelDetails_end": "end",
      "#travelDetails_date": "date",
      "#travelDetails_time": "time",
      "#travelDetails_cost": "cost",
      "#travelDetails_driver": "driver"
    };

    TravelDetailsCtrl.prototype.events = {
      "singleTap #travelDetails_driver": "viewDriver"
    };

    function TravelDetailsCtrl() {
      this.viewDriver = __bind(this.viewDriver, this);
      this.changeValoration = __bind(this.changeValoration, this);
      this.showMap = __bind(this.showMap, this);
      this.loadTravelDetails = __bind(this.loadTravelDetails, this);
      TravelDetailsCtrl.__super__.constructor.apply(this, arguments);
    }

    TravelDetailsCtrl.prototype.loadTravelDetails = function(travel) {
      this.showMap(travel);
      this.start[0].innerText = travel.origin;
      this.end[0].innerText = travel.destination;
      this.date[0].innerText = travel.date;
      this.time[0].innerText = (travel.endtime - travel.starttime) / 60000 + " minutos";
      this.cost[0].innerText = "35 €";
      this.driverDetails = travel.driver;
      this.changeValoration();
      return this.driver[0].src = travel.driver.image;
    };

    TravelDetailsCtrl.prototype.showMap = function(travel) {
      var bounds, destination, directionsDisplay, directionsService, map, origin, request;
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      map = new google.maps.Map(document.getElementById("map-canvas2"), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]
      });
      directionsDisplay.setMap(map);
      bounds = new google.maps.LatLngBounds();
      origin = new google.maps.LatLng(travel.startpoint.nb, travel.startpoint.ob);
      destination = new google.maps.LatLng(travel.endpoint.nb, travel.endpoint.ob);
      bounds.extend(origin);
      bounds.extend(destination);
      map.fitBounds(bounds);
      request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      return directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          return directionsDisplay.setDirections(response);
        }
      });
    };

    TravelDetailsCtrl.prototype.changeValoration = function() {
      var i, val;
      val = "";
      i = 0;
      while (i < this.driverDetails.valoration) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      return this.driverDetails.valorationStars = val;
    };

    TravelDetailsCtrl.prototype.viewDriver = function(event) {
      __Controller.favDriver.loadDriverDetails(this.driverDetails);
      return Lungo.Router.section("favDriver_s");
    };

    return TravelDetailsCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.TravelListCtrl = (function(_super) {
    var _views;

    __extends(TravelListCtrl, _super);

    _views = [];

    function TravelListCtrl() {
      this.deleteTravel = __bind(this.deleteTravel, this);
      this.loadTravelList = __bind(this.loadTravelList, this);
      TravelListCtrl.__super__.constructor.apply(this, arguments);
      this.loadTravelList();
    }

    TravelListCtrl.prototype.loadTravelList = function() {
      var travel, _i, _len, _ref, _results;
      _ref = __Model.Travel.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        travel = _ref[_i];
        _results.push(_views[travel.id] = new __View.Travel({
          model: travel
        }));
      }
      return _results;
    };

    TravelListCtrl.prototype.deleteTravel = function(travel) {
      _views[travel.id].remove();
      _views[travel.id] = void 0;
      return travel.destroy();
    };

    return TravelListCtrl;

  })(Monocle.Controller);

}).call(this);
