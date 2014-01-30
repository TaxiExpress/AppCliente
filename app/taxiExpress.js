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

    Travel.fields("id", "starttime", "endtime", "startpoint", "endpoint", "cost", "driver", "origin", "destination", "vote");

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
      "singleTap li": "onView"
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
      __Controller.sendSMS = new __Controller.SendSMSCtrl("section#sendSMS_s");
      __Controller.filters = new __Controller.FiltersCtrl("section#filters_s");
    }

    return AppCtrl;

  })(Monocle.Controller);

  $$(function() {
    Lungo.init({});
    __Controller.push = new __Controller.PushCtrl;
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
      var credentials, origin, position, server, session,
        _this = this;
      Lungo.Router.section("waiting_s");
      credentials = Lungo.Cache.get("credentials");
      position = Lungo.Cache.get("geoPosition");
      server = Lungo.Cache.get("server");
      session = Lungo.Cache.get("session");
      origin = Lungo.Cache.get("origin");
      return $$.ajax({
        type: "POST",
        url: server + "client/getselectedtaxi",
        data: {
          email: credentials.email,
          longitude: position.d,
          latitude: position.e,
          origin: origin,
          driverEmail: this.driverDetails.email,
          sessionID: session
        },
        error: function(xhr, type) {
          return console.log(type.response);
        },
        success: function(result) {
          var travelID;
          travelID = result.travelID;
          Lungo.Cache.set("travelID", travelID);
          Lungo.Cache.set("travelAccepted", false);
          Lungo.Router.section("waiting_s");
          return setTimeout((function() {
            if (!Lungo.Cache.get("travelAccepted")) {
              return $$.ajax({
                type: "POST",
                url: server + "client/canceltravel",
                data: {
                  email: credentials.email,
                  sessionID: session,
                  travelID: travelID
                },
                error: function(xhr, type) {
                  return alert(type.response);
                },
                success: function(result) {
                  Lungo.Cache.set("travelID", 0);
                  Lungo.Cache.set("travelAccepted", false);
                  alert("Peticion cancelada");
                  return Lungo.Router.back();
                }
              });
            }
          }), 30000);
        }
      });
    };

    return ChosenTaxiCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.FavDriverCtrl = (function(_super) {
    var credentials, date, db, driverDetails;

    __extends(FavDriverCtrl, _super);

    db = void 0;

    driverDetails = void 0;

    date = void 0;

    credentials = void 0;

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
      this.removeFavoriteSQL = __bind(this.removeFavoriteSQL, this);
      this.addFavoriteSQL = __bind(this.addFavoriteSQL, this);
      this.updateLastUpdateFavorite = __bind(this.updateLastUpdateFavorite, this);
      this.changeFavorite = __bind(this.changeFavorite, this);
      this.loadDriverDetails = __bind(this.loadDriverDetails, this);
      FavDriverCtrl.__super__.constructor.apply(this, arguments);
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
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
      var data, server, session,
        _this = this;
      server = Lungo.Cache.get("server");
      this.credentials = Lungo.Cache.get("credentials");
      this.date = new Date().toISOString().substring(0, 19);
      this.date = this.date.replace("T", " ");
      session = Lungo.Cache.get("session");
      data = {
        customerEmail: this.credentials.email,
        driverEmail: this.driverDetails.email,
        lastUpdateFavorites: this.date,
        sessionID: session
      };
      if (this.favorite[0].checked) {
        return $$.ajax({
          type: "POST",
          url: server + "client/addfavorite",
          data: data,
          success: function(result) {
            __Controller.favorites.addFavorite(_this.driverDetails);
            _this.updateLastUpdateFavorite();
            return _this.addFavoriteSQL();
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
            __Controller.favorites.deleteFavorite(_this.driverDetails);
            _this.updateLastUpdateFavorite();
            return _this.removeFavoriteSQL();
          },
          error: function(xhr, type) {
            return _this;
          }
        });
      }
    };

    FavDriverCtrl.prototype.updateLastUpdateFavorite = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        var sql;
        sql = "UPDATE profile SET lastUpdateFavorites = '" + _this.date + "' WHERE email ='" + _this.credentials.email + "';";
        return tx.executeSql(sql);
      });
    };

    FavDriverCtrl.prototype.addFavoriteSQL = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        var sql;
        sql = "INSERT INTO favorites  (email, phone, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment)         VALUES ('" + _this.driverDetails.email + "','" + _this.driverDetails.phone + "','" + _this.driverDetails.name + "','" + _this.driverDetails.surname + "',        '" + _this.driverDetails.valuation + "','" + _this.driverDetails.plate + "','" + _this.driverDetails.model + "','" + _this.driverDetails.image + "',        '" + _this.driverDetails.capacity + "','" + _this.driverDetails.accessible + "','" + _this.driverDetails.animals + "','" + _this.driverDetails.appPayment + "');";
        return tx.executeSql(sql);
      });
    };

    FavDriverCtrl.prototype.removeFavoriteSQL = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        var sql;
        sql = "DELETE FROM favorites WHERE email ='" + _this.driverDetails.email + "';";
        return tx.executeSql(sql);
      });
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
      "change #filters_accessible": "saveFilters",
      "tap #filters_b": "doSearch"
    };

    function FiltersCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.saveFilters = __bind(this.saveFilters, this);
      this.doSearch = __bind(this.doSearch, this);
      this.loadFilters = __bind(this.loadFilters, this);
      FiltersCtrl.__super__.constructor.apply(this, arguments);
    }

    FiltersCtrl.prototype.loadFilters = function(seats, payments, animals, accessible) {
      this.seats[0].value = seats;
      this.payments[0].checked = payments.toString() === "true";
      this.animals[0].checked = animals.toString() === "true";
      return this.accessible[0].checked = accessible.toString() === "true";
    };

    FiltersCtrl.prototype.doSearch = function(event) {
      __Controller.nearDriver.loadNearTaxis();
      return Lungo.Router.back();
    };

    FiltersCtrl.prototype.saveFilters = function(event) {
      var credentials, data, date, server, session,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      server = Lungo.Cache.get("server");
      date = new Date().toISOString().substring(0, 19);
      date = date.replace("T", " ");
      session = Lungo.Cache.get("session");
      data = {
        email: credentials.email,
        capacity: this.seats[0].value,
        appPayment: this.payments[0].checked,
        animals: this.animals[0].checked,
        accesible: this.accessible[0].checked,
        lastUpdate: date,
        sessionID: session
      };
      return $$.ajax({
        type: "POST",
        url: server + "client/changefilters",
        data: data,
        success: function(result) {
          return _this.parseResponse(result, date);
        },
        error: function(xhr, type) {
          return _this;
        }
      });
    };

    FiltersCtrl.prototype.parseResponse = function(result, date) {
      var credentials, db,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
      return db.transaction(function(tx) {
        var sql;
        sql = "UPDATE profile SET lastUpdate = '" + date + "', seats = '" + _this.seats[0].value + "', animals = '" + _this.animals[0].checked + "', payments = '" + _this.payments[0].checked + "', accessible = '" + _this.accessible[0].checked + "' WHERE email ='" + credentials.email + "';";
        return tx.executeSql(sql);
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
    var getStreet, initialize, manageErrors, map, position, reconnect, updatePosition,
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
        navigator.geolocation.getCurrentPosition(initialize, manageErrors, options);
      }
    }

    manageErrors = function(err) {
      var _this = this;
      return setTimeout((function() {
        return navigator.notification.alert("Error al obtener la posicion GPS", reconnect, "Taxi Express", "Reintentar");
      }), 5000);
    };

    reconnect = function() {
      return navigator.geolocation.getCurrentPosition(initialize, manageErrors);
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
              home_streetField.value = results[0].address_components[1].short_name;
            } else {
              home_streetField.value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name;
            }
            return Lungo.Cache.set("origin", home_streetField.value);
          } else {
            return home_streetField.value = 'Calle desconocida';
          }
        } else {
          return home_streetField.value = 'Calle desconocida';
        }
      });
    };

    HomeCtrl.prototype.getTaxi = function() {
      var credentials, origin, server, session,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      position = Lungo.Cache.get("geoPosition");
      server = Lungo.Cache.get("server");
      session = Lungo.Cache.get("session");
      origin = Lungo.Cache.get("origin");
      return $$.ajax({
        type: "POST",
        url: server + "client/gettaxi",
        data: {
          email: credentials.email,
          longitude: position.d,
          latitude: position.e,
          origin: origin,
          sessionID: session
        },
        error: function(xhr, type) {
          return console.log(type.response);
        },
        success: function(result) {
          var travelID;
          travelID = result.travelID;
          Lungo.Cache.set("travelID", travelID);
          Lungo.Cache.set("travelAccepted", false);
          Lungo.Router.section("waiting_s");
          return setTimeout((function() {
            if (!Lungo.Cache.get("travelAccepted")) {
              return $$.ajax({
                type: "POST",
                url: server + "client/canceltravel",
                data: {
                  email: credentials.email,
                  sessionID: session,
                  travelID: travelID
                },
                error: function(xhr, type) {
                  return alert(type.response);
                },
                success: function(result) {
                  Lungo.Cache.set("travelID", 0);
                  Lungo.Cache.set("travelAccepted", false);
                  alert("Peticion cancelada");
                  return Lungo.Router.back();
                }
              });
            }
          }), 30000);
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
      this.getDriversAndTravelsSQL = __bind(this.getDriversAndTravelsSQL, this);
      this.getFavoritesSQL = __bind(this.getFavoritesSQL, this);
      this.doSQL = __bind(this.doSQL, this);
      this.loadTravels = __bind(this.loadTravels, this);
      this.loadFavoriteTaxis = __bind(this.loadFavoriteTaxis, this);
      this.drop = __bind(this.drop, this);
      this.read = __bind(this.read, this);
      this.valideCredentials = __bind(this.valideCredentials, this);
      this.doLogin = __bind(this.doLogin, this);
      var _this = this;
      LoginCtrl.__super__.constructor.apply(this, arguments);
      this.db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
      this.db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS profile (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, lastUpdate STRING NOT NULL, lastUpdateFavorites STRING NOT NULL, lastUpdateTravels STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL, seats STRING NOT NULL, payments STRING NOT NULL, animals STRING NOT NULL, accessible STRING NOT NULL )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS travels (id STRING NOT NULL, starttime STRING NOT NULL, endtime STRING NOT NULL, startpoint STRING NOT NULL, endpoint STRING NOT NULL, origin STRING NOT NULL, destination STRING NOT NULL, cost STRING NOT NULL, driver STRING NOT NULL, vote STRING NOT NULL)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS favorites (email STRING NOT NULL PRIMARY KEY, phone STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, valuation STRING NOT NULL, plate STRING NOT NULL, model STRING NOT NULL, image STRING NOT NULL, capacity STRING NOT NULL, accessible STRING NOT NULL, animals STRING NOT NULL, appPayment STRING NOT NULL)");
        return tx.executeSql("CREATE TABLE IF NOT EXISTS drivers (email STRING NOT NULL PRIMARY KEY, name STRING NOT NULL, surname STRING NOT NULL, valuation STRING NOT NULL, plate STRING NOT NULL, model STRING NOT NULL, image STRING NOT NULL, capacity STRING NOT NULL, accessible STRING NOT NULL, animals STRING NOT NULL, appPayment STRING NOT NULL)");
      });
      this.read();
    }

    LoginCtrl.prototype.doLogin = function(event) {
      var date;
      if (this.username[0].value && this.password[0].value) {
        this.drop();
        Lungo.Router.section("init_s");
        date = new Date().toISOString().substring(0, 19);
        date = date.replace("T", " ");
        return this.valideCredentials(this.username[0].value, this.password[0].value, date, date, date);
      } else {
        return navigator.notification.alert("Debes rellenar el email y la contraseña", null, "Taxi Express", "Aceptar");
      }
    };

    LoginCtrl.prototype.valideCredentials = function(email, pass, date, dateFavorites, dateTravels) {
      var data, device, pushID, server,
        _this = this;
      pushID = Lungo.Cache.get("pushID");
      if (pushID === void 0) {
        return setTimeout((function() {
          pushID = Lungo.Cache.get("pushID");
          return _this.valideCredentials(email, pass, date, dateFavorites, dateTravels);
        }), 500);
      } else {
        device = Lungo.Cache.get("pushDevice");
        server = Lungo.Cache.get("server");
        data = {
          email: email,
          password: pass,
          lastUpdate: date,
          lastUpdateFavorites: dateFavorites,
          lastUpdateTravels: dateTravels,
          pushID: pushID,
          pushDevice: device
        };
        return $$.ajax({
          type: "POST",
          url: server + "client/login",
          data: data,
          success: function(result) {
            return _this.parseResponse(result);
          },
          error: function(xhr, type) {
            setTimeout((function() {
              return Lungo.Router.section("login_s");
            }), 500);
            _this.password[0].value = "";
            return navigator.notification.alert(type.response, null, "Taxi Express", "Aceptar");
          }
        });
      }
    };

    LoginCtrl.prototype.parseResponse = function(result) {
      var date, dateFav, dateTrav, profile,
        _this = this;
      Lungo.Cache.set("session", result.sessionID);
      if (result.email === void 0) {
        profile = {
          name: credentials.name,
          surname: credentials.surname,
          phone: credentials.phone,
          email: credentials.email,
          image: credentials.image
        };
        __Controller.filters.loadFilters(credentials.seats, credentials.payments, credentials.animals, credentials.accessible);
      } else {
        this.doSQL("DELETE FROM profile");
        profile = {
          name: result.first_name,
          surname: result.last_name,
          phone: result.phone.substring(3),
          email: result.email,
          image: result.image
        };
        date = result.lastUpdate.substring(0, 19);
        date = date.replace("T", " ");
        if (credentials) {
          dateFav = credentials.lastUpdateFavorites;
          dateTrav = credentials.lastUpdateTravels;
        } else {
          dateFav = result.lastUpdateFavorites.substring(0, 19);
          dateFav = dateFav.replace("T", " ");
          dateTrav = result.lastUpdateTravels.substring(0, 19);
          dateTrav = dateTrav.replace("T", " ");
        }
        this.doSQL("INSERT INTO profile (email, pass, lastUpdate, lastUpdateFavorites, lastUpdateTravels, name, surname, phone, image, seats, payments, animals, accessible) VALUES ('" + profile.email + "','" + this.password[0].value + "','" + date + "','" + dateFav + "','" + dateTrav + "','" + profile.name + "','" + profile.surname + "','" + profile.phone + "','" + profile.image + "','" + result.fCapacity + "','" + result.fAppPayment + "','" + result.fAnimals + "','" + result.fAccessible + "');");
        __Controller.filters.loadFilters(result.fCapacity, result.fAppPayment, result.fAnimals, result.fAccessible);
      }
      Lungo.Cache.set("travelAccepted", false);
      Lungo.Cache.set("travelID", 0);
      Lungo.Cache.set("credentials", profile);
      if (result.favlist) {
        this.loadFavoriteTaxis(result.favlist);
        dateFav = result.lastUpdateFavorites.substring(0, 19);
        dateFav = dateFav.replace("T", " ");
        this.doSQL("UPDATE profile SET lastUpdateFavorites = '" + dateFav + "' WHERE email ='" + profile.email + "';");
        __Controller.favorites = new __Controller.FavoritesCtrl("section#favorites_s");
      } else {
        __Controller.favorites = new __Controller.FavoritesCtrl("section#favorites_s");
        this.getFavoritesSQL();
      }
      if (result.travel_set) {
        this.loadTravels(result.travel_set);
        dateTrav = result.lastUpdateTravels.substring(0, 19);
        dateTrav = dateTrav.replace("T", " ");
        this.doSQL("UPDATE profile SET lastUpdateTravels = '" + dateTrav + "' WHERE email ='" + profile.email + "';");
        __Controller.travelList = new __Controller.TravelListCtrl("section#travelList_s");
      } else {
        __Controller.travelList = new __Controller.TravelListCtrl("section#travelList_s");
        this.getDriversAndTravelsSQL();
      }
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
      __Controller.payment = new __Controller.PaymentCtrl("section#payment_s");
      __Controller.favDriver = new __Controller.FavDriverCtrl("section#favDriver_s");
      __Controller.waiting = new __Controller.WaitingCtrl("section#waiting_s");
      __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl("section#chosenTaxi_s");
      __Controller.nearDriver = new __Controller.NearDriverCtrl("section#list_s");
      __Controller.travelDetails = new __Controller.TravelDetailsCtrl("section#travelDetails_s");
      return setTimeout((function() {
        return __Controller.home = new __Controller.HomeCtrl("section#home_s");
      }), 1000);
    };

    LoginCtrl.prototype.read = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM profile", [], (function(tx, results) {
          if (results.rows.length > 0) {
            credentials = results.rows.item(0);
            _this.username[0].value = credentials.email;
            _this.password[0].value = credentials.pass;
            return _this.valideCredentials(credentials.email, credentials.pass, credentials.lastUpdate, credentials.lastUpdateFavorites, credentials.lastUpdateTravels);
          } else {
            return Lungo.Router.section("login_s");
          }
        }), null);
      });
    };

    LoginCtrl.prototype.drop = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        tx.executeSql("DELETE FROM profile");
        tx.executeSql("DELETE FROM travels");
        tx.executeSql("DELETE FROM favorites");
        return tx.executeSql("DELETE FROM drivers");
      });
    };

    LoginCtrl.prototype.loadFavoriteTaxis = function(taxis) {
      var accessible, animals, appPayment, capacity, email, favDriver, image, model, name, phone, plate, sql, surname, taxi, valuation, _i, _len, _results;
      this.doSQL("DELETE FROM favorites ");
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
        image = "";
        if (taxi.image) {
          image = taxi.image;
        }
        capacity = taxi.car.capacity;
        accessible = taxi.car.accessible;
        animals = taxi.car.animals;
        appPayment = taxi.car.appPayment;
        favDriver = __Model.FavoriteDriver.create({
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
        });
        sql = "INSERT INTO favorites (email, phone, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment) VALUES ('" + favDriver.email + "','" + favDriver.phone + "','" + favDriver.name + "','" + favDriver.surname + "','" + favDriver.valuation + "','" + favDriver.plate + "','" + favDriver.model + "','" + image + "','" + favDriver.capacity + "','" + favDriver.accessible + "','" + favDriver.animals + "','" + favDriver.appPayment + "');";
        _results.push(this.doSQL(sql));
      }
      return _results;
    };

    LoginCtrl.prototype.loadTravels = function(travels) {
      var coords, cost, destination, driver, driver2, endpoint, endtime, id, image, lat, long, model, origin, pos, sql, startpoint, starttime, travel, travel2, vote, _i, _len, _results;
      this.doSQL("DELETE FROM travels");
      this.doSQL("DELETE FROM drivers");
      if (travels.length > 0) {
        empty_travels.style.display = "none";
      }
      _results = [];
      for (_i = 0, _len = travels.length; _i < _len; _i++) {
        travel = travels[_i];
        if (travel.endtime) {
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
          vote = (travel.vote === "true").toString();
          cost = travel.cost;
          driver = __Model.Driver.get(travel.driver.email)[0];
          if (driver === void 0) {
            driver2 = travel.driver;
            if (driver2.image === "") {
              image = "";
            } else {
              image = driver2.image;
            }
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
            sql = "INSERT INTO drivers (email, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment) VALUES ('" + driver.email + "','" + driver.name + "','" + driver.surname + "','" + driver.valuation + "','" + driver.plate + "','" + model + "','" + image + "','" + driver.capacity + "','" + driver.accessible + "','" + driver.animals + "','" + driver.appPayment + "');";
            this.doSQL(sql);
          }
          travel2 = __Model.Travel.create({
            id: id,
            starttime: starttime,
            endtime: endtime,
            startpoint: startpoint,
            endpoint: endpoint,
            cost: cost,
            driver: driver,
            origin: origin,
            destination: destination,
            vote: vote
          });
          sql = "INSERT INTO travels (id, starttime, endtime, startpoint, endpoint, origin, destination, cost, driver, vote) VALUES ('" + travel2.id + "','" + travel2.starttime + "','" + travel2.endtime + "','" + travel.startpoint + "','" + travel.endpoint + "','" + travel2.origin + "','" + travel2.destination + "','" + travel2.cost + "','" + travel2.driver.email + "','" + travel2.vote + "');";
          _results.push(this.doSQL(sql));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    LoginCtrl.prototype.doSQL = function(sql) {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql(sql);
      });
    };

    LoginCtrl.prototype.getFavoritesSQL = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM favorites", [], (function(tx, results) {
          var fav, i, _results;
          i = 0;
          if (results.rows.length > 0) {
            empty_favorites.style.display = "none";
            empty_favorites2.style.display = "none";
          }
          _results = [];
          while (i < results.rows.length) {
            fav = results.rows.item(i);
            __Model.FavoriteDriver.create({
              email: fav.email,
              phone: fav.phone,
              name: fav.name,
              surname: fav.surname,
              valuation: fav.valuation,
              plate: fav.plate,
              model: fav.model,
              image: fav.image,
              capacity: fav.capacity,
              accessible: fav.accessible,
              animals: fav.animals,
              appPayment: fav.appPayment
            });
            i++;
            if (i === results.rows.length) {
              _results.push(__Controller.favorites.loadFavoriteTaxis());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }), null);
      });
    };

    LoginCtrl.prototype.getDriversAndTravelsSQL = function() {
      var _this = this;
      this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM drivers", [], (function(tx, results) {
          var driver, i, _results;
          i = 0;
          _results = [];
          while (i < results.rows.length) {
            driver = results.rows.item(i);
            __Model.Driver.create({
              email: driver.email,
              name: driver.name,
              surname: driver.surname,
              valuation: driver.valuation,
              plate: driver.plate,
              model: driver.model,
              image: driver.image,
              capacity: driver.capacity,
              accessible: driver.accessible,
              animals: driver.animals,
              appPayment: driver.appPayment
            });
            _results.push(i++);
          }
          return _results;
        }), null);
      });
      return this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM travels", [], (function(tx, results) {
          var coords, driver, endpoint, i, lat, long, pos, startpoint, travel, _results;
          i = 0;
          if (results.rows.length > 0) {
            empty_travels.style.display = "none";
          }
          _results = [];
          while (i < results.rows.length) {
            travel = results.rows.item(i);
            driver = __Model.Driver.get(travel.driver)[0];
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
            __Model.Travel.create({
              id: travel.id,
              starttime: new Date(travel.starttime),
              endtime: new Date(travel.endtime),
              startpoint: startpoint,
              endpoint: endpoint,
              cost: travel.cost,
              driver: driver,
              origin: travel.origin,
              destination: travel.destination,
              vote: travel.vote
            });
            i++;
            if (i === results.rows.length) {
              _results.push(__Controller.travelList.loadTravelList());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }), null);
      });
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

    MenuCtrl.prototype.events = {
      "tap #menu_logout": "doLogOut"
    };

    function MenuCtrl() {
      MenuCtrl.__super__.constructor.apply(this, arguments);
      this.updateProfile();
    }

    MenuCtrl.prototype.updateProfile = function() {
      var profile;
      profile = Lungo.Cache.get("credentials");
      this.phone[0].textContent = "Tel. " + profile.phone;
      if (profile.name === "" | profile.name === null) {
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

    function NearDriverCtrl() {
      this.showTaxies = __bind(this.showTaxies, this);
      this.getDistanceAndTime = __bind(this.getDistanceAndTime, this);
      this.deleteNearTaxis = __bind(this.deleteNearTaxis, this);
      this.loadNearTaxis = __bind(this.loadNearTaxis, this);
      NearDriverCtrl.__super__.constructor.apply(this, arguments);
    }

    NearDriverCtrl.prototype.loadNearTaxis = function() {
      var credentials, server, session,
        _this = this;
      this.deleteNearTaxis();
      Lungo.Router.section("list_s");
      credentials = Lungo.Cache.get("credentials");
      position = Lungo.Cache.get("geoPosition");
      server = Lungo.Cache.get("server");
      session = Lungo.Cache.get("session");
      return $$.ajax({
        type: "GET",
        url: server + "client/getneartaxies",
        data: {
          email: credentials.email,
          longitud: position.d,
          latitud: position.e,
          sessionID: session
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

    NearDriverCtrl.prototype.getDistanceAndTime = function(driver, lastDriver) {
      var directionsService, request, wp,
        _this = this;
      wp = new Array();
      wp[0] = new google.maps.LatLng(driver.position.d, driver.position.e);
      wp[1] = new google.maps.LatLng(this.position.d, this.position.e);
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
          driver.time = time + 1;
          driver.save();
          if (lastDriver) {
            return setTimeout((function() {
              return _this.showTaxies();
            }), 50);
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
    var credentials;

    __extends(PasswordCtrl, _super);

    credentials = void 0;

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
      var server, session,
        _this = this;
      if (!(this.new_pass1[0].value || this.new_pass2[0].value || this.old_pass[0].value)) {
        return navigator.notification.alert("Debes rellenar todos los campos", null, "Taxi Express", "Aceptar");
      } else if (this.new_pass1[0].value.length < 8 || this.new_pass1[0].value.length > 20) {
        return navigator.notification.alert("La contraseña debe tener entre 8 y 20 caracteres", null, "Taxi Express", "Aceptar");
      } else if (this.new_pass1[0].value !== this.new_pass2[0].value) {
        return navigator.notification.alert("Los valores de la nueva contraseña deben ser iguales", null, "Taxi Express", "Aceptar");
      } else {
        server = Lungo.Cache.get("server");
        credentials = Lungo.Cache.get("credentials");
        session = Lungo.Cache.get("session");
        if (this.new_pass1[0].value === this.new_pass2[0].value) {
          return $$.ajax({
            type: "POST",
            url: server + "client/changepassword",
            data: {
              email: credentials.email,
              oldPass: this.old_pass[0].value,
              newPass: this.new_pass1[0].value,
              sessionID: session
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
      var db,
        _this = this;
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
      db.transaction(function(tx) {
        var sql;
        sql = "UPDATE profile SET pass = '" + _this.new_pass1[0].value + "' WHERE email ='" + credentials.email + "';";
        return tx.executeSql(sql);
      });
      navigator.notification.alert("Contraseña modificada", null, "Taxi Express", "Aceptar");
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
        return navigator.notification.alert("Debes completar todos los detalles de la tarjeta", null, "Taxi Express", "Aceptar");
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
      var credentials, server, session, travelID,
        _this = this;
      this.button[0].disabled = false;
      if (response.error) {
        return navigator.notification.alert("Los datos de la tarjeta no son válidos. Compruébelos.", null, "Taxi Express", "Aceptar");
      } else {
        credentials = Lungo.Cache.get("credentials");
        server = Lungo.Cache.get("server");
        session = Lungo.Cache.get("session");
        travelID = Lungo.Cache.get("travelID");
        return $$.ajax({
          type: "GET",
          url: server + "client/payTravel",
          data: {
            email: credentials.email,
            travelID: travelID,
            sessionID: session
          },
          error: function(xhr, type) {
            return alert(type.response);
          },
          success: function(result) {
            navigator.notification.alert("Trayecto pagado", null, "Taxi Express", "Aceptar");
            home_driver.style.visibility = "hidden";
            return Lungo.Router.section("home_s");
          }
        });
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
      var data, phone, server, session,
        _this = this;
      if (!(this.phone[0].value || this.code[0].value)) {
        return navigator.notification.alert("Debes rellenar todos los campos", null, "Taxi Express", "Aceptar");
      } else if (this.code[0].value.length < 4) {
        return navigator.notification.alert("El código debe tener al menos 4 dígitos", null, "Taxi Express", "Aceptar");
      } else {
        server = Lungo.Cache.get("server");
        phone = "+34" + this.phone[0].value;
        session = Lungo.Cache.get("session");
        data = {
          phone: phone,
          validationCode: this.code[0].value,
          sessionID: session
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
      "singleTap #profile_header": "clickHeader",
      "change #profile_image": "saveAvatar",
      "change #profile_name": "saveChanges",
      "change #profile_surname": "saveChanges"
    };

    function ProfileCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.saveChanges = __bind(this.saveChanges, this);
      this.clickHeader = __bind(this.clickHeader, this);
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

    ProfileCtrl.prototype.clickHeader = function(event) {
      var input;
      input = document.getElementById("profile_name");
      input.blur();
      input = document.getElementById("profile_surname");
      return input.blur();
    };

    ProfileCtrl.prototype.saveChanges = function(event) {
      var avatar, data, server, session,
        _this = this;
      server = Lungo.Cache.get("server");
      this.date = new Date().toISOString().substring(0, 19);
      this.date = this.date.replace("T", " ");
      avatar = this.avatar[0].src;
      if (this.avatar[0].src.indexOf("user.png") !== -1) {
        avatar = "";
      }
      session = Lungo.Cache.get("session");
      data = {
        email: this.email[0].innerText,
        firstName: this.name[0].value,
        lastName: this.surname[0].value,
        newImage: avatar,
        lastUpdate: this.date,
        sessionID: session
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
      var credentials, db,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      credentials.name = this.name[0].value;
      credentials.surname = this.surname[0].value;
      credentials.image = this.avatar[0].src;
      Lungo.Cache.set("credentials", credentials);
      __Controller.menu.updateProfile();
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
      return db.transaction(function(tx) {
        var sql;
        sql = "UPDATE profile SET lastUpdate = '" + _this.date + "', name = '" + credentials.name + "', surname = '" + credentials.surname + "', image = '" + credentials.image + "' WHERE email ='" + credentials.email + "';";
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

  __Controller.PushCtrl = (function(_super) {
    var pushNotification;

    __extends(PushCtrl, _super);

    pushNotification = void 0;

    function PushCtrl() {
      this.doSQL = __bind(this.doSQL, this);
      this.handlePush = __bind(this.handlePush, this);
      this.savePushID = __bind(this.savePushID, this);
      PushCtrl.__super__.constructor.apply(this, arguments);
      this.savePushID("pushIDdeprueba", "IOS");
    }

    PushCtrl.prototype.savePushID = function(id, device) {
      Lungo.Cache.set("pushID", id);
      return Lungo.Cache.set("pushDevice", device);
    };

    PushCtrl.prototype.handlePush = function(notification) {
      var credentials, data, server, session,
        _this = this;
      switch (notification.code) {
        case "701":
          Lungo.Cache.set("travelAccepted", true);
          Lungo.Router.section("home_s");
          return navigator.notification.alert("El taxista ha aceptado su solicitud y está en camino", null, "Taxi Express", "Aceptar");
        case "702":
          if (notification.appPayment === "true") {
            __Controller.payment.loadPayment(notification.cost);
            navigator.notification.alert("Ya puedes pagar tu trayecto en taxi", null, "Taxi Express", "Aceptar");
            home_driver.style.visibility = "visible";
            Lungo.Router.section("home_s");
            return Lungo.Router.section("payment_s");
          } else {
            Lungo.Router.section("home_s");
            navigator.notification.alert("Viaje pagado. Gracias por usar TaxiExpress", null, "Taxi Express", "Aceptar");
            credentials = Lungo.Cache.get("credentials");
            server = Lungo.Cache.get("server");
            session = Lungo.Cache.get("session");
            data = {
              email: credentials.email,
              sessionID: session
            };
            return $$.ajax({
              type: "GET",
              url: server + "client/getlasttravel",
              data: data,
              success: function(result) {
                return addLastTravel(result);
              },
              error: function(xhr, type) {
                return console.log(type.response);
              }
            });
          }
      }
    };

    PushCtrl.prototype.addLastTravel = function(travel) {
      var coords, cost, credentials, date, destination, driver, driver2, endpoint, endtime, id, image, lat, long, model, origin, pos, sql, startpoint, starttime, travel2, vote;
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
      vote = travel.vote;
      driver = __Model.Driver.get(travel.driver.email)[0];
      if (driver === void 0) {
        driver2 = travel.driver;
        if (driver2.image === "") {
          image = "";
        } else {
          image = driver2.image;
        }
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
        sql = "INSERT INTO drivers (email, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment) VALUES ('" + driver.email + "','" + driver.name + "','" + driver.surname + "','" + driver.valuation + "','" + driver.plate + "','" + model + "','" + image + "','" + driver.capacity + "','" + driver.accessible + "','" + driver.animals + "','" + driver.appPayment + "');";
        this.doSQL(sql);
      }
      travel2 = __Model.Travel.create({
        id: id,
        starttime: starttime,
        endtime: endtime,
        startpoint: startpoint,
        endpoint: endpoint,
        cost: cost,
        driver: driver,
        origin: origin,
        destination: destination,
        vote: vote
      });
      sql = "INSERT INTO travels (id, starttime, endtime, startpoint, endpoint, origin, destination, cost, driver,vote) VALUES ('" + travel2.id + "','" + travel2.starttime + "','" + travel2.endtime + "','" + travel.startpoint + "','" + travel.endpoint + "','" + travel2.origin + "','" + travel2.destination + "','" + travel2.cost + "','" + travel2.driver.email + "','" + travel2.vote + "');";
      this.doSQL(sql);
      credentials = Lungo.Cache.get("credentials");
      date = travel.lastUpdateTravels.substring(0, 19);
      date = date.replace("T", " ");
      return this.doSQL("UPDATE profile SET lastUpdateTravels = '" + date + "' WHERE email ='" + credentials.email + "';");
    };

    PushCtrl.prototype.doSQL = function(sql) {
      var db,
        _this = this;
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024);
      return db.transaction(function(tx) {
        return tx.executeSql(sql);
      });
    };

    return PushCtrl;

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
        return navigator.notification.alert("Debes rellenar todos los campos", null, "Taxi Express", "Aceptar");
      } else if (this.pass1[0].value.length < 8 || this.pass1[0].value.length > 20) {
        return navigator.notification.alert("La contraseña debe tener entre 8 y 20 caracteres", null, "Taxi Express", "Aceptar");
      } else if (this.pass1[0].value !== this.pass2[0].value) {
        return navigator.notification.alert("Los valores de la contraseña deben ser iguales", null, "Taxi Express", "Aceptar");
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

  __Controller.SendSMSCtrl = (function(_super) {
    __extends(SendSMSCtrl, _super);

    SendSMSCtrl.prototype.elements = {
      "#sendSMS_phone": "phone"
    };

    SendSMSCtrl.prototype.events = {
      "singleTap #sendSMS_b": "sendSMS"
    };

    function SendSMSCtrl() {
      this.parseResponse = __bind(this.parseResponse, this);
      this.sendSMS = __bind(this.sendSMS, this);
      SendSMSCtrl.__super__.constructor.apply(this, arguments);
    }

    SendSMSCtrl.prototype.sendSMS = function(event) {
      var data, phone, server,
        _this = this;
      if (!this.phone[0].value) {
        return navigator.notification.alert("Debes introducir un teléfono válido", null, "Taxi Express", "Aceptar");
      } else {
        server = Lungo.Cache.get("server");
        phone = "+34" + this.phone[0].value;
        data = {
          phone: phone
        };
        return $$.ajax({
          type: "POST",
          url: server + "client/recovervalidationcodecustomer",
          data: data,
          success: function(result) {
            return _this.parseResponse(result);
          },
          error: function(xhr, type) {
            return console.log(type.response);
          }
        });
      }
    };

    SendSMSCtrl.prototype.parseResponse = function(result) {
      Lungo.Router.router("login_s");
      return this.phone[0].value = "";
    };

    return SendSMSCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.TravelDetailsCtrl = (function(_super) {
    var driverDetails, travel;

    __extends(TravelDetailsCtrl, _super);

    driverDetails = void 0;

    travel = void 0;

    TravelDetailsCtrl.prototype.elements = {
      "#travelDetails_start": "start",
      "#travelDetails_end": "end",
      "#travelDetails_date": "date",
      "#travelDetails_time": "time",
      "#travelDetails_cost": "cost",
      "#travelDetails_driver": "driver",
      "#travelDetails_positiveVote": "votePos",
      "#travelDetails_negativeVote": "voteNeg"
    };

    TravelDetailsCtrl.prototype.events = {
      "singleTap #travelDetails_driver": "viewDriver",
      "singleTap #travelDetails_positiveVote": "votePositive",
      "singleTap #travelDetails_negativeVote": "voteNegative",
      "singleTap #map-canvas2": "clickMap"
    };

    function TravelDetailsCtrl() {
      this.vote = __bind(this.vote, this);
      this.viewDriver = __bind(this.viewDriver, this);
      this.voteNegative = __bind(this.voteNegative, this);
      this.votePositive = __bind(this.votePositive, this);
      this.clickMap = __bind(this.clickMap, this);
      this.changeValuation = __bind(this.changeValuation, this);
      this.showMap = __bind(this.showMap, this);
      this.loadTravelDetails = __bind(this.loadTravelDetails, this);
      TravelDetailsCtrl.__super__.constructor.apply(this, arguments);
    }

    TravelDetailsCtrl.prototype.loadTravelDetails = function(travel) {
      this.travel = travel;
      this.showMap(travel);
      this.start[0].innerText = travel.origin;
      this.end[0].innerText = travel.destination;
      this.date[0].innerText = travel.date;
      this.time[0].innerText = Math.floor((travel.endtime - travel.starttime) / 60000) + " minutos";
      this.cost[0].innerText = (travel.cost.toString().replace(".", ",")) + "€";
      this.driverDetails = travel.driver;
      this.changeValuation();
      if (travel.driver.image) {
        this.driver[0].src = travel.driver.image;
      } else {
        this.driver[0].src = "img/user.png";
      }
      if (travel.vote !== "false") {
        this.votePos[0].disabled = true;
        return this.voteNeg[0].disabled = true;
      } else {
        this.votePos[0].disabled = false;
        return this.voteNeg[0].disabled = false;
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
      origin = new google.maps.LatLng(travel.startpoint.d, travel.startpoint.e);
      destination = new google.maps.LatLng(travel.endpoint.d, travel.endpoint.e);
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

    TravelDetailsCtrl.prototype.clickMap = function(event) {
      return console.log("llego");
    };

    TravelDetailsCtrl.prototype.votePositive = function(event) {
      return this.vote("positive");
    };

    TravelDetailsCtrl.prototype.voteNegative = function(event) {
      return this.vote("negative");
    };

    TravelDetailsCtrl.prototype.viewDriver = function(event) {
      __Controller.favDriver.loadDriverDetails(this.driverDetails);
      return Lungo.Router.section("favDriver_s");
    };

    TravelDetailsCtrl.prototype.vote = function(vote) {
      var credentials, data, server, session,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      server = Lungo.Cache.get("server");
      session = Lungo.Cache.get("session");
      data = {
        email: credentials.email,
        sessionID: session,
        vote: vote,
        travelID: this.travel.id
      };
      return $$.ajax({
        type: "POST",
        url: server + "client/voteDriver",
        data: data,
        success: function(result) {
          _this.valoration[0].disabled = true;
          return navigator.notification.alert("Taxista valorado", null, "Taxi Express", "Aceptar");
        },
        error: function(xhr, type) {
          console.log(type.response);
          return navigator.notification.alert("Error al valorar al taxista", null, "Taxi Express", "Aceptar");
        }
      });
    };

    return TravelDetailsCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.TravelListCtrl = (function(_super) {
    var credentials, date, _views;

    __extends(TravelListCtrl, _super);

    _views = [];

    date = void 0;

    credentials = void 0;

    function TravelListCtrl() {
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
      var credentials, server, session, travelID,
        _this = this;
      credentials = Lungo.Cache.get("credentials");
      server = Lungo.Cache.get("server");
      session = Lungo.Cache.get("session");
      travelID = Lungo.Cache.get("travelID");
      if (!Lungo.Cache.get("travelAccepted")) {
        return $$.ajax({
          type: "POST",
          url: server + "client/canceltravel",
          data: {
            email: credentials.email,
            sessionID: session,
            travelID: travelID
          },
          error: function(xhr, type) {
            return alert(type.response);
          },
          success: function(result) {
            Lungo.Cache.set("travelID", 0);
            Lungo.Cache.set("travelAccepted", false);
            alert("Peticion cancelada");
            return Lungo.Router.back();
          }
        });
      }
    };

    return WaitingCtrl;

  })(Monocle.Controller);

}).call(this);
