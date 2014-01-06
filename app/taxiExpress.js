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

    Driver.fields("email", "name", "surname", "valuation", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment");

    Driver.get = function(id) {
      return this.select(function(driver) {
        return driver.email === id;
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

    FavoriteDriver.fields("email", "phone", "name", "surname", "valuation", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment");

    FavoriteDriver.get = function(id) {
      return this.select(function(driver) {
        return driver.email === id;
      });
    };

    return FavoriteDriver;

  })(Monocle.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.NearDriver = (function(_super) {
    __extends(NearDriver, _super);

    function NearDriver() {
      _ref = NearDriver.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NearDriver.fields("email", "name", "surname", "valuation", "position", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment", "distance", "time");

    NearDriver.get = function(id) {
      return this.select(function(neardriver) {
        return neardriver.email === id;
      });
    };

    return NearDriver;

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
        return travel.id === iden;
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

    FavDriver.prototype.template = " \n<li class=\"thumb arrow selectable\" data-view-section=\"favDriver_s\">                \n          <img src=\"{{ image }}\" alt=\"\" />\n          <div>\n              <strong>{{ name }} {{ surname }}</strong>\n              <small><strong>{{ valuationStars }}</strong></small>\n          </div>\n      </li>";

    FavDriver.prototype.events = {
      "singleTap li": "onView"
    };

    function FavDriver() {
      var i, val;
      FavDriver.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valuation) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valuationStars = val;
      if (this.model.image === null || this.model.image === "") {
        this.model.image = "img/user.png";
      }
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

    FavDriverList.prototype.template = " \n<li class=\"thumb arrow selectable\">                \n          <img src=\"{{ image }}\" alt=\"\" />\n          <div>\n              <strong>{{ name }} {{ surname }}</strong>\n              <small><strong>{{valuationStars}}</strong></small>\n          </div>\n          {{#appPayment}}<span data-icon=\"credit-card\">\n            <span class=\"icon credit-card\"></span>\n          </span>{{/appPayment}}\n      </li>";

    FavDriverList.prototype.events = {
      "singleTap li": "onView"
    };

    function FavDriverList() {
      var i, val;
      FavDriverList.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valuation) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valuationStars = val;
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

    NearDriverList.prototype.template = " \n<li class=\"thumb arrow selectable\" data-view-section=\"chosenTaxi_s\">                \n          <div class=\"on-right\">{{time}} mins aprox</div>\n          <img src=\"{{image}}\" alt=\"\" />\n          <div>\n              <strong>a {{distance}} km</strong>\n              <small>{{name}} {{surname}}</small>\n              <small><strong>{{valuationStars}}</strong></small>\n          </div>\n          {{#appPayment}}<span data-icon=\"credit-card\">\n            <span class=\"icon credit-card\"></span>\n          </span>{{/appPayment}}\n      </li>";

    NearDriverList.prototype.events = {
      "singleTap li": "onView"
    };

    function NearDriverList() {
      var i, val;
      NearDriverList.__super__.constructor.apply(this, arguments);
      val = "";
      i = 0;
      while (i < this.model.valuation) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      this.model.valuationStars = val;
      this.append(this.model);
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
      __Controller.phoneVerification = new __Controller.PhoneVerificationCtrl("section#phoneVerification_s");
    }

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
      "#chosenTaxi_valuation": "valuation",
      "#chosenTaxi_image": "image",
      "#chosenTaxi_model": "model",
      "#chosenTaxi_plate": "plate",
      "#chosenTaxi_capacity": "capacity",
      "#chosenTaxi_accessible": "accessible",
      "#chosenTaxi_animals": "animals",
      "#chosenTaxi_appPayment": "appPayment"
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
      this.valuation[0].innerText = driver.valuationStars;
      this.image[0].src = driver.image;
      this.model[0].innerText = driver.model;
      this.plate[0].innerText = driver.plate;
      this.capacity[0].innerText = driver.capacity;
      this.accessible[0].innerText = "No";
      if (driver.accessible) {
        this.accessible[0].innerText = "Si";
      }
      this.animals[0].innerText = "No";
      if (driver.animals) {
        this.animals[0].innerText = "Si";
      }
      this.appPayment[0].innerText = "No";
      if (driver.appPayment) {
        return this.appPayment[0].innerText = "Si";
      }
    };

    ChosenTaxiCtrl.prototype.requestTaxi = function(event) {
      return Lungo.Router.section("waiting_s");
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
      "#favDriver_valuation": "valuation",
      "#favDriver_image": "image",
      "#favDriver_model": "model",
      "#favDriver_plate": "plate",
      "#favDriver_capacity": "capacity",
      "#favDriver_accessible": "accessible",
      "#favDriver_animals": "animals",
      "#favDriver_favorite": "favorite",
      "#favDriver_phone": "phone",
      "#favDriver_appPayment": "appPayment"
    };

    FavDriverCtrl.prototype.events = {
      "change #favDriver_favorite": "changeFavorite",
      "singleTap #favDriver_phone": "call"
    };

    function FavDriverCtrl() {
      this.removeFavorite = __bind(this.removeFavorite, this);
      this.addFavorite = __bind(this.addFavorite, this);
      this.changeFavorite = __bind(this.changeFavorite, this);
      this.loadDriverDetails = __bind(this.loadDriverDetails, this);
      FavDriverCtrl.__super__.constructor.apply(this, arguments);
    }

    FavDriverCtrl.prototype.loadDriverDetails = function(driver) {
      this.driverDetails = driver;
      this.phone[0].href = "tel:" + driver.phone;
      this.name[0].innerText = driver.name + " " + driver.surname;
      this.valuation[0].innerText = driver.valuationStars;
      this.model[0].innerText = driver.model;
      this.plate[0].innerText = driver.plate;
      this.capacity[0].innerText = driver.capacity;
      this.accessible[0].innerText = "No";
      if (driver.accessible) {
        this.accessible[0].innerText = "Si";
      }
      this.appPayment[0].innerText = "No";
      if (driver.appPayment) {
        this.appPayment[0].innerText = "Si";
      }
      this.animals[0].innerText = "No";
      if (driver.animals) {
        this.animals[0].innerText = "Si";
      }
      if (driver.image) {
        this.image[0].src = driver.image;
      } else {
        this.image[0].src = "img/user.png";
      }
      if (__Model.FavoriteDriver.get(driver.email)[0] !== void 0) {
        return this.favorite[0].checked = true;
      } else {
        return this.favorite[0].checked = false;
      }
    };

    FavDriverCtrl.prototype.changeFavorite = function(event) {
      var credentials, data, server,
        _this = this;
      server = Lungo.Cache.get("server");
      credentials = Lungo.Cache.get("credentials");
      data = {
        customerEmail: credentials.email,
        driverEmail: this.driverDetails.email
      };
      if (this.favorite[0].checked) {
        return $$.ajax({
          type: "POST",
          url: server + "client/addfavorite",
          data: data,
          success: function(result) {
            return _this.addFavorite(result);
          },
          error: function(xhr, type) {
            return _this;
          }
        });
      } else {
        return $$.ajax({
          type: "POST",
          url: server + "client/removefavorite",
          data: data,
          success: function(result) {
            return _this.removeFavorite(result);
          },
          error: function(xhr, type) {
            return _this;
          }
        });
      }
    };

    FavDriverCtrl.prototype.addFavorite = function(result) {
      return __Controller.favorites.addFavorite(this.driverDetails);
    };

    FavDriverCtrl.prototype.removeFavorite = function(result) {
      return __Controller.favorites.deleteFavorite(this.driverDetails);
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
      this.tryEmpty = __bind(this.tryEmpty, this);
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
        _views[favDriver.email] = new __View.FavDriver({
          model: favDriver
        });
        _results.push(_viewsList[favDriver.email] = new __View.FavDriverList({
          model: favDriver
        }));
      }
      return _results;
    };

    FavoritesCtrl.prototype.deleteFavorite = function(driver) {
      _views[driver.email].remove();
      _views[driver.email] = void 0;
      _viewsList[driver.email].remove();
      _viewsList[driver.email] = void 0;
      __Model.FavoriteDriver.get(driver.email)[0].destroy();
      return this.tryEmpty();
    };

    FavoritesCtrl.prototype.addFavorite = function(driver) {
      this.deleteFavoriteTaxis();
      __Model.FavoriteDriver.create({
        email: driver.email,
        name: driver.name,
        surname: driver.surname,
        valuation: driver.valuation,
        position: driver.position,
        plate: driver.plate,
        model: driver.model,
        image: driver.image,
        capacity: driver.capacity,
        accessible: driver.accessible,
        animals: driver.animals,
        appPayment: driver.appPayment
      });
      this.loadFavoriteTaxis();
      return this.tryEmpty();
    };

    FavoritesCtrl.prototype.deleteFavoriteTaxis = function() {
      var driver, _i, _len, _ref, _results;
      _ref = __Model.FavoriteDriver.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        driver = _ref[_i];
        _views[driver.email].remove();
        _views[driver.email] = void 0;
        _viewsList[driver.email].remove();
        _results.push(_viewsList[driver.email] = void 0);
      }
      return _results;
    };

    FavoritesCtrl.prototype.tryEmpty = function() {
      if (__Model.FavoriteDriver.all().length === 0) {
        empty_favorites.style.display = "block";
        return empty_favorites2.style.display = "block";
      } else {
        empty_favorites.style.display = "none";
        return empty_favorites2.style.display = "none";
      }
    };

    return FavoritesCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.FiltersCtrl = (function(_super) {
    __extends(FiltersCtrl, _super);

    FiltersCtrl.prototype.elements = {
      "#filters_seats": "seats",
      "#filters_payments": "payments",
      "#filters_animals": "animals",
      "#filters_accessible": "accessible"
    };

    FiltersCtrl.prototype.events = {
      "change #filters_seats": "saveFilters",
      "change #filters_payments": "saveFilters",
      "change #filters_animals": "saveFilters",
      "change #filters_accessible": "saveFilters"
    };

    function FiltersCtrl() {
      this.saveFilters = __bind(this.saveFilters, this);
      this.loadFilters = __bind(this.loadFilters, this);
      FiltersCtrl.__super__.constructor.apply(this, arguments);
    }

    FiltersCtrl.prototype.loadFilters = function(seats, payments, animals, accessible) {
      this.seats[0].value = seats;
      this.payments[0].checked = payments;
      this.animals[0].checked = animals;
      return this.accessible[0].checked = accessible;
    };

    FiltersCtrl.prototype.saveFilters = function(event) {
      var credentials, data, server,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      server = Lungo.Cache.get("server");
      data = {
        email: credentials.email,
        capacity: this.seats[0].value,
        appPayment: this.payments[0].checked,
        animals: this.animals[0].checked,
        accesible: this.accessible[0].checked
      };
      return $$.ajax({
        type: "POST",
        url: server + "client/changefilters",
        data: data,
        success: function(result) {
          return _this;
        },
        error: function(xhr, type) {
          return _this;
        }
      });
    };

    return FiltersCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.HomeCtrl = (function(_super) {
    var getStreet, initialize, manageErrors, map, position, updatePosition,
      _this = this;

    __extends(HomeCtrl, _super);

    map = void 0;

    position = void 0;

    HomeCtrl.prototype.elements = {
      "#home_refresh_b": "button_refresh",
      "#home_streetField": "streetField",
      "#home_driver": "driver"
    };

    HomeCtrl.prototype.events = {
      "singleTap #home_driver": "payTaxi",
      "singleTap #home_refresh_b": "refresh",
      "singleTap #home_confirm_b": "confirm",
      "singleTap #map-canvas": "hideAside"
    };

    function HomeCtrl() {
      this.payTaxi = __bind(this.payTaxi, this);
      this.getTaxi = __bind(this.getTaxi, this);
      this.hideAside = __bind(this.hideAside, this);
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
            return _this.getTaxi();
          }
        },
        cancel: {
          label: "Elegir taxi",
          callback: function() {
            return __Controller.nearDriver.loadNearTaxis();
          }
        }
      });
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
              featureType: "poi",
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
      Lungo.Cache.set("geoPosition", pos);
      geocoder = new google.maps.Geocoder();
      return geocoder.geocode({
        latLng: pos
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            if (results[0].address_components[1].short_name === results[0].address_components[0].short_name) {
              return home_streetField.value = results[0].address_components[1].short_name;
            } else {
              return home_streetField.value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name;
            }
          } else {
            return home_streetField.value = 'Calle desconocida';
          }
        } else {
          return home_streetField.value = 'Calle desconocida';
        }
      });
    };

    HomeCtrl.prototype.getTaxi = function() {
      var credentials, server,
        _this = this;
      console.log("llego");
      credentials = Lungo.Cache.get("credentials");
      position = Lungo.Cache.get("geoPosition");
      server = Lungo.Cache.get("server");
      return $$.ajax({
        type: "GET",
        url: server + "client/getTaxi",
        data: {
          email: credentials.email,
          longitud: position.nb,
          latitud: position.ob
        },
        error: function(xhr, type) {
          return console.log(type.response);
        },
        success: function(result) {
          console.log(result);
          return Lungo.Router.section("waiting_s");
        }
      });
    };

    HomeCtrl.prototype.payTaxi = function(event) {
      return Lungo.Router.section("payment_s");
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
      "#login_password": "password"
    };

    LoginCtrl.prototype.events = {
      "tap #login_login_b": "doLogin"
    };

    function LoginCtrl() {
      this.loadTravels = __bind(this.loadTravels, this);
      this.loadFavoriteTaxis = __bind(this.loadFavoriteTaxis, this);
      this.read = __bind(this.read, this);
      this.drop = __bind(this.drop, this);
      this.valideCredentials = __bind(this.valideCredentials, this);
      this.doLogin = __bind(this.doLogin, this);
      var _this = this;
      LoginCtrl.__super__.constructor.apply(this, arguments);
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024);
      this.db.transaction(function(tx) {
        return tx.executeSql("CREATE TABLE IF NOT EXISTS accessData (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, dateUpdate STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL )");
      });
      this.db.transaction(function(tx) {
        return tx.executeSql("CREATE TABLE IF NOT EXISTS configData (email STRING NOT NULL PRIMARY KEY, seats STRING NOT NULL, payments STRING NOT NULL, animals STRING NOT NULL, food STRING NOT NULL, accessible STRING NOT NULL)");
      });
      this.drop();
      this.read();
    }

    LoginCtrl.prototype.doLogin = function(event) {
      var date;
      if (this.username[0].value && this.password[0].value) {
        Lungo.Router.section("init_s");
        this.drop();
        date = new Date("1/1/1970").toISOString().substring(0, 19);
        date = date.replace("T", " ");
        return this.valideCredentials(this.username[0].value, this.password[0].value, date);
      } else {
        return alert("Debe rellenar el email y la contraseña");
      }
    };

    LoginCtrl.prototype.valideCredentials = function(email, pass, date) {
      var server,
        _this = this;
      server = Lungo.Cache.get("server");
      return $$.ajax({
        type: "POST",
        url: server + "client/login",
        data: {
          email: email,
          password: pass,
          lastUpdate: date
        },
        success: function(result) {
          return _this.parseResponse(result);
        },
        error: function(xhr, type) {
          setTimeout((function() {
            return Lungo.Router.section("login_s");
          }), 500);
          _this.password[0].value = "";
          return alert(type.response);
        }
      });
    };

    LoginCtrl.prototype.parseResponse = function(result) {
      var profile,
        _this = this;
      if (result.email === void 0) {
        profile = this.getProfile(credentials);
      } else {
        profile = this.getProfile(result);
        profile.phone = profile.phone.substring(3);
        this.db.transaction(function(tx) {
          var date, sql;
          date = profile.dateUpdate.substring(0, 19);
          date = date.replace("T", " ");
          sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('" + profile.email + "','" + _this.password[0].value + "','" + date + "','" + profile.name + "','" + profile.surname + "','" + profile.phone + "','" + profile.image + "');";
          return tx.executeSql(sql);
        });
      }
      Lungo.Cache.set("credentials", profile);
      this.loadFavoriteTaxis(result.favlist);
      this.loadTravels(result.travel_set);
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
      __Controller.payment = new __Controller.PaymentCtrl("section#payment_s");
      __Controller.favorites = new __Controller.FavoritesCtrl("section#favorites_s");
      __Controller.favDriver = new __Controller.FavDriverCtrl("section#favDriver_s");
      __Controller.waiting = new __Controller.WaitingCtrl("section#waiting_s");
      __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl("section#chosenTaxi_s");
      __Controller.nearDriver = new __Controller.NearDriverCtrl("section#list_s");
      __Controller.travelList = new __Controller.TravelListCtrl("section#travelList_s");
      __Controller.travelDetails = new __Controller.TravelDetailsCtrl("section#travelDetails_s");
      __Controller.filters = new __Controller.FiltersCtrl("section#filters_s");
      __Controller.filters.loadFilters(result.fCapacity, result.fAppPayment, result.fAnimals, result.fAccessible);
      return setTimeout((function() {
        return __Controller.home = new __Controller.HomeCtrl("section#home_s");
      }), 1000);
    };

    LoginCtrl.prototype.getProfile = function(result) {
      var profile;
      return profile = {
        name: result.first_name,
        surname: result.last_name,
        phone: result.phone,
        email: result.email,
        image: result.image,
        dateUpdate: result.lastUpdate
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

    LoginCtrl.prototype.loadFavoriteTaxis = function(taxis) {
      var accessible, animals, appPayment, capacity, email, favDriver, image, model, name, phone, plate, surname, taxi, valuation, _i, _len, _results;
      if (taxis.length > 0) {
        empty_favorites.style.display = "none";
        empty_favorites2.style.display = "none";
      }
      _results = [];
      for (_i = 0, _len = taxis.length; _i < _len; _i++) {
        taxi = taxis[_i];
        email = taxi.email;
        phone = taxi.phone;
        name = taxi.first_name;
        surname = taxi.last_name;
        valuation = taxi.valuation;
        plate = taxi.car.plate;
        model = taxi.car.company + " " + taxi.car.model;
        image = taxi.image;
        capacity = taxi.car.capacity;
        accessible = taxi.car.accessible;
        animals = taxi.car.animals;
        appPayment = taxi.car.appPayment;
        _results.push(favDriver = __Model.FavoriteDriver.create({
          email: email,
          phone: phone,
          name: name,
          surname: surname,
          valuation: valuation,
          plate: plate,
          model: model,
          image: image,
          capacity: capacity,
          accessible: accessible,
          animals: animals,
          appPayment: appPayment
        }));
      }
      return _results;
    };

    LoginCtrl.prototype.loadTravels = function(travels) {
      var coords, cost, destination, driver, driver2, endpoint, endtime, id, lat, long, model, origin, pos, startpoint, starttime, travel, _i, _len, _results;
      if (travels.length > 0) {
        empty_travels.style.display = "none";
      }
      _results = [];
      for (_i = 0, _len = travels.length; _i < _len; _i++) {
        travel = travels[_i];
        id = travel.id;
        starttime = new Date(travel.starttime);
        endtime = new Date(travel.endtime);
        coords = travel.startpoint.substring(7);
        pos = coords.indexOf(" ");
        long = coords.substring(0, pos);
        lat = coords.substring(pos + 1, coords.indexOf(")"));
        startpoint = new google.maps.LatLng(long, lat);
        coords = travel.endpoint.substring(7);
        pos = coords.indexOf(" ");
        long = coords.substring(0, pos);
        lat = coords.substring(pos + 1, coords.indexOf(")"));
        endpoint = new google.maps.LatLng(long, lat);
        origin = travel.origin;
        destination = travel.destination;
        cost = travel.cost;
        driver2 = travel.driver;
        model = driver2.car.company + " " + driver2.car.model;
        driver = __Model.Driver.create({
          email: driver2.email,
          name: driver2.first_name,
          surname: driver2.last_name,
          valuation: driver2.valuation,
          plate: driver2.car.plate,
          model: model,
          image: driver2.image,
          capacity: driver2.car.capacity,
          accessible: driver2.car.accessible,
          animals: driver2.car.animals,
          appPayment: driver2.car.appPayment
        });
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
      if (profile.name === "" | profile.name === void 0) {
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
    var position, _viewsList;

    __extends(NearDriverCtrl, _super);

    _viewsList = [];

    position = void 0;

    NearDriverCtrl.prototype.events = {
      "singleTap #list_refresh_b": "doRefresh"
    };

    function NearDriverCtrl() {
      this.showTaxies = __bind(this.showTaxies, this);
      this.getDistanceAndTime = __bind(this.getDistanceAndTime, this);
      this.doRefresh = __bind(this.doRefresh, this);
      this.deleteNearTaxis = __bind(this.deleteNearTaxis, this);
      this.loadNearTaxis = __bind(this.loadNearTaxis, this);
      NearDriverCtrl.__super__.constructor.apply(this, arguments);
    }

    NearDriverCtrl.prototype.loadNearTaxis = function() {
      var credentials, server,
        _this = this;
      this.deleteNearTaxis();
      Lungo.Router.section("list_s");
      credentials = Lungo.Cache.get("credentials");
      position = Lungo.Cache.get("geoPosition");
      server = Lungo.Cache.get("server");
      return $$.ajax({
        type: "GET",
        url: server + "client/getNearTaxies",
        data: {
          email: credentials.email,
          longitud: position.nb,
          latitud: position.ob
        },
        error: function(xhr, type) {
          return console.log(type.response);
        },
        success: function(result) {
          var accessible, animals, appPayment, capacity, cont, coords, driver, email, image, lastDriver, lat, long, model, name, plate, pos, surname, taxi, valuation, _i, _len, _results;
          if (result.length === 0) {
            empty_nearTaxies.style.display = "block";
          } else {
            empty_nearTaxies.style.display = "none";
          }
          _this.position = Lungo.Cache.get("geoPosition");
          cont = 0;
          lastDriver = false;
          _results = [];
          for (_i = 0, _len = result.length; _i < _len; _i++) {
            taxi = result[_i];
            email = taxi.email;
            name = taxi.first_name;
            surname = taxi.last_name;
            valuation = taxi.valuation;
            coords = taxi.geom.substring(7);
            pos = coords.indexOf(" ");
            long = coords.substring(0, pos);
            lat = coords.substring(pos + 1, coords.indexOf(")"));
            position = new google.maps.LatLng(long, lat);
            plate = taxi.car.plate;
            model = taxi.car.company + " " + taxi.car.model;
            if (taxi.image !== null && taxi.image !== "") {
              image = taxi.image;
            } else {
              image = "img/user.png";
            }
            capacity = taxi.car.capacity;
            accessible = taxi.car.accessible;
            animals = taxi.car.animals;
            appPayment = taxi.car.appPayment;
            driver = __Model.NearDriver.create({
              email: email,
              name: name,
              surname: surname,
              position: position,
              valuation: valuation,
              plate: plate,
              model: model,
              image: image,
              capacity: capacity,
              accessible: accessible,
              animals: animals,
              appPayment: appPayment
            });
            cont++;
            if (result.length === cont) {
              lastDriver = true;
            }
            _results.push(_this.getDistanceAndTime(driver, lastDriver));
          }
          return _results;
        }
      });
    };

    NearDriverCtrl.prototype.deleteNearTaxis = function() {
      var nearDriver, _i, _len, _ref, _results;
      _ref = __Model.NearDriver.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        nearDriver = _ref[_i];
        _viewsList[nearDriver.email].remove();
        _viewsList[nearDriver.email] = void 0;
        _results.push(nearDriver.destroy());
      }
      return _results;
    };

    NearDriverCtrl.prototype.doRefresh = function(event) {
      return __Controller.nearDriver.loadNearTaxis();
    };

    NearDriverCtrl.prototype.getDistanceAndTime = function(driver, lastDriver) {
      var directionsService, request, wp,
        _this = this;
      wp = new Array();
      wp[0] = new google.maps.LatLng(driver.position.nb, driver.position.ob);
      wp[1] = new google.maps.LatLng(this.position.nb, this.position.ob);
      directionsService = new google.maps.DirectionsService();
      request = {
        origin: wp[0],
        destination: wp[1],
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      return directionsService.route(request, function(response, status) {
        var distance, time;
        if (status === google.maps.DirectionsStatus.OK) {
          distance = (response.routes[0].legs[0].distance.value / 1000).toFixed(2);
          time = Math.round(response.routes[0].legs[0].duration.value / 60);
          driver.distance = distance;
          driver.time = time;
          driver.save();
          if (lastDriver) {
            return _this.showTaxies();
          }
        }
      });
    };

    NearDriverCtrl.prototype.showTaxies = function() {
      var driver, taxies, _i, _len, _results;
      taxies = __Model.NearDriver.all().sort(function(a, b) {
        return parseFloat(a.distance) - parseFloat(b.distance);
      });
      _results = [];
      for (_i = 0, _len = taxies.length; _i < _len; _i++) {
        driver = taxies[_i];
        _results.push(_viewsList[driver.email] = new __View.NearDriverList({
          model: driver
        }));
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
      var server,
        _this = this;
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
          return $$.ajax({
            type: "POST",
            url: server + "client/changepassword",
            data: {
              email: credentials.email,
              oldPass: this.old_pass[0].value,
              newPass: this.new_pass1[0].value
            },
            success: function(result) {
              return _this.parseResponse(result);
            },
            error: function(xhr, type) {
              return console.log(type.response);
            }
          });
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
      if (!(this.creditCard.val() && this.cvc.val() && this.expires.val())) {
        return alert("Debes completar todos los detalles de la tarjeta");
      } else {
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
      }
    };

    PaymentCtrl.prototype.stripeResponseHandler = function(status, response) {
      this.button[0].disabled = false;
      if (response.error) {
        return this.errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos.";
      } else {
        alert("Trayecto pagado");
        home_driver.style.visibility = "hidden";
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
      var data, phone, server,
        _this = this;
      if (!(this.phone[0].value || this.code[0].value)) {
        return alert("Debes rellenar todos los campos");
      } else if (this.code[0].value.length < 4) {
        return alert("El código debe tener al menos 4 dígitos");
      } else {
        server = Lungo.Cache.get("server");
        phone = "+34" + this.phone[0].value;
        data = {
          phone: phone,
          validationCode: this.code[0].value
        };
        return $$.ajax({
          type: "POST",
          url: server + "client/validate",
          data: data,
          success: function(result) {
            return _this.parseResponse(result);
          },
          error: function(xhr, type) {
            return alert(type.response);
          }
        });
      }
    };

    PhoneVerificationCtrl.prototype.parseResponse = function(result) {
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
      "singleTap #profile_avatar": "clickAvatar",
      "change #profile_image": "saveAvatar",
      "change #profile_name": "saveChanges",
      "change #profile_surname": "saveChanges"
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
      var file, imageType, reader,
        _this = this;
      file = this.image[0].files[0];
      imageType = /image.*/;
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
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
      return setTimeout((function() {
        return _this.saveChanges();
      }), 500);
    };

    ProfileCtrl.prototype.clickAvatar = function(event) {
      return this.image[0].click();
    };

    ProfileCtrl.prototype.saveChanges = function(event) {
      var data, server,
        _this = this;
      server = Lungo.Cache.get("server");
      date = new Date().toISOString().substring(0, 19);
      date = date.replace("T", " ");
      data = {
        email: this.email[0].innerText,
        firstName: this.name[0].value,
        lastName: this.surname[0].value,
        newImage: this.avatar[0].src,
        lastUpdate: date
      };
      return $$.ajax({
        type: "POST",
        url: server + "client/changedetails",
        data: data,
        success: function(result) {
          return _this.parseResponse(result);
        },
        error: function(xhr, type) {
          return _this;
        }
      });
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
      return this.db.transaction(function(tx) {
        var sql;
        sql = "UPDATE accessData SET dateUpdate = '" + credentials.dateUpdate + "', name = '" + credentials.name + "', surname = '" + credentials.surname + "', image = '" + credentials.image + "' WHERE email ='" + credentials.email + "';";
        return tx.executeSql(sql);
      });
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
      var date, phone, server,
        _this = this;
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
        phone = "+34" + this.phone[0].value;
        this.data = {
          email: this.email[0].value,
          password: this.pass1[0].value,
          phone: phone,
          lastUpdate: date
        };
        return $$.ajax({
          type: "POST",
          url: server + "client/register",
          data: this.data,
          success: function(result) {
            return _this.parseResponse(result);
          },
          error: function(xhr, type) {
            return alert(type.response);
          }
        });
      }
    };

    RegisterCtrl.prototype.parseResponse = function(result) {
      __Controller.phoneVerification.setPhone(this.phone[0].value);
      return Lungo.Router.section("phoneVerification_s");
    };

    RegisterCtrl.prototype.validated = function() {
      this.phone[0].value = "";
      this.email[0].value = "";
      this.pass1[0].value = "";
      this.pass2[0].value = "";
      return Lungo.Router.section("login_s");
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
      this.changeValuation = __bind(this.changeValuation, this);
      this.showMap = __bind(this.showMap, this);
      this.loadTravelDetails = __bind(this.loadTravelDetails, this);
      TravelDetailsCtrl.__super__.constructor.apply(this, arguments);
    }

    TravelDetailsCtrl.prototype.loadTravelDetails = function(travel) {
      this.showMap(travel);
      this.start[0].innerText = travel.origin;
      this.end[0].innerText = travel.destination;
      this.date[0].innerText = travel.date;
      this.time[0].innerText = Math.floor((travel.endtime - travel.starttime) / 60000) + " minutos";
      this.cost[0].innerText = (travel.cost.replace(".", ",")) + "€";
      this.driverDetails = travel.driver;
      this.changeValuation();
      if (travel.driver.image) {
        return this.driver[0].src = travel.driver.image;
      } else {
        return this.driver[0].src = "img/user.png";
      }
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

    TravelDetailsCtrl.prototype.changeValuation = function() {
      var i, val;
      val = "";
      i = 0;
      while (i < this.driverDetails.valuation) {
        val = val + "★";
        i++;
      }
      while (i < 5) {
        val = val + "☆";
        i++;
      }
      return this.driverDetails.valuationStars = val;
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
      this.tryEmpty = __bind(this.tryEmpty, this);
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
      var credentials, server,
        _this = this;
      server = Lungo.Cache.get("server");
      credentials = Lungo.Cache.get("credentials");
      return $$.ajax({
        type: "POST",
        url: server + "client/removetravel",
        data: {
          email: credentials.email,
          travel_id: travel.id
        },
        success: function(result) {
          _views[travel.id].remove();
          _views[travel.id] = void 0;
          travel.destroy();
          return _this.tryEmpty();
        },
        error: function(xhr, type) {
          return _this;
        }
      });
    };

    TravelListCtrl.prototype.tryEmpty = function() {
      if (__Model.Travel.all().length === 0) {
        return empty_travels.style.display = "block";
      } else {
        return empty_travels.style.display = "none";
      }
    };

    return TravelListCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.WaitingCtrl = (function(_super) {
    __extends(WaitingCtrl, _super);

    WaitingCtrl.prototype.elements = {
      "#waiting_cancel_b": "button_cancel"
    };

    WaitingCtrl.prototype.events = {
      "singleTap #waiting_cancel_b": "cancel"
    };

    function WaitingCtrl() {
      this.cancel = __bind(this.cancel, this);
      WaitingCtrl.__super__.constructor.apply(this, arguments);
    }

    WaitingCtrl.prototype.cancel = function(event) {
      home_driver.src = "img/payment.png";
      home_driver.style.visibility = "visible";
      return Lungo.Router.section("home_s");
    };

    return WaitingCtrl;

  })(Monocle.Controller);

}).call(this);
