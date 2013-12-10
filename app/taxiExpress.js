(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.AppCtrl = (function(_super) {
    __extends(AppCtrl, _super);

    function AppCtrl() {
      AppCtrl.__super__.constructor.apply(this, arguments);
      __Controller.login = new __Controller.LoginCtrl("section#login_s");
      __Controller.payment = new __Controller.PaymentCtrl("section#payment_s");
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
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

  __Controller.HomeCtrl = (function(_super) {
    var getStreet, initialize, manageErrors, map, updatePosition,
      _this = this;

    __extends(HomeCtrl, _super);

    map = void 0;

    HomeCtrl.prototype.elements = {
      "#refresh": "button_refresh",
      "#streetField": "streetField"
    };

    HomeCtrl.prototype.events = {
      "singleTap #refresh": "refresh",
      "singleTap #confirm": "confirm"
    };

    function HomeCtrl() {
      this.confirm = __bind(this.confirm, this);
      this.refresh = __bind(this.refresh, this);
      var options;
      HomeCtrl.__super__.constructor.apply(this, arguments);
      if (navigator.geolocation) {
        options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 5000
        };
        navigator.geolocation.getCurrentPosition(initialize, manageErrors);
      }
    }

    manageErrors = function(err) {
      return alert("Error de localización GPS");
    };

    HomeCtrl.prototype.refresh = function(event) {
      var options;
      console.log("CLICK REFRESH");
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
      console.log("LOCALIZACION CONFIRMADA");
      return Lungo.Notification.confirm({
        title: "¿Qué taxi desea?",
        description: "Seleccione la opción que  más le convenga",
        accept: {
          label: "El más cercano",
          callback: function() {
            return alert("Yes!");
          }
        },
        cancel: {
          label: "Elegir taxi",
          callback: function() {
            return Lungo.Router.section("list_s");
          }
        }
      });
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
          return streetField.value = 'Localizando ...';
        });
        google.maps.event.addListener(map, "zoom_changed", function(event) {
          return getStreet(map.getCenter());
        });
      }
      return Lungo.Notification.hide();
    };

    getStreet = function(pos) {
      var geocoder;
      geocoder = new google.maps.Geocoder();
      return geocoder.geocode({
        latLng: pos
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            return streetField.value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name;
          } else {
            return streetField.value = 'Calle desconocida';
          }
        } else {
          return streetField.value = 'Calle desconocida';
        }
      });
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
      "#username": "username",
      "#password": "password"
    };

    LoginCtrl.prototype.events = {
      "tap #login_b": "doLogin"
    };

    function LoginCtrl() {
      this.read = __bind(this.read, this);
      this.drop = __bind(this.drop, this);
      this.doLogin = __bind(this.doLogin, this);
      LoginCtrl.__super__.constructor.apply(this, arguments);
      Lungo.Router.section("login_s");
    }

    LoginCtrl.prototype.doLogin = function(event) {
      Lungo.Router.section("init_s");
      return __Controller.home = new __Controller.HomeCtrl("section#home_s");
    };

    LoginCtrl.prototype.drop = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("DELETE FROM access");
      });
    };

    LoginCtrl.prototype.read = function() {
      var _this = this;
      return this.db.transaction(function(tx) {
        return tx.executeSql("SELECT * FROM access", [], (function(tx, results) {
          var profile;
          if (results.rows.length > 0) {
            credentials = results.rows.item(0);
            profile = {
              user: credentials.username,
              pass: credentials.pass
            };
            Lungo.Cache.set("credentials", profile);
            return __Controller.home = new __Controller.HomeCtrl("section#home_s");
          } else {
            return Lungo.Router.section("login_s");
          }
        }), null);
      });
    };

    return LoginCtrl;

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
      "#credit_card_payment": "creditCard",
      "#cvc_payment": "cvc",
      "#expires_payment": "expires",
      "#submit_payment": "button",
      "#payment-amount": "amount_text",
      "#payment-errors": "errors",
      "#payment-form": "form"
    };

    PaymentCtrl.prototype.events = {
      "singleTap #submit_payment": "doPayment"
    };

    function PaymentCtrl() {
      this.stripeResponseHandler = __bind(this.stripeResponseHandler, this);
      this.doPayment = __bind(this.doPayment, this);
      PaymentCtrl.__super__.constructor.apply(this, arguments);
      this.loadPayment(23);
    }

    PaymentCtrl.prototype.doPayment = function(event) {
      this.button[0].disabled = true;
      Stripe.setPublishableKey("pk_test_omPl1VUhfXi514McgAsj4Sus");
      return Stripe.createToken({
        name: "David Lallana",
        number: "4242424242424242",
        cvc: this.cvc.val(),
        exp_month: this.expires.val().substring(0, 3),
        exp_year: this.expires.val().substring(4, 8)
      }, amount, this.stripeResponseHandler);
    };

    PaymentCtrl.prototype.stripeResponseHandler = function(status, response) {
      this.button[0].disabled = false;
      if (response.error) {
        return this.errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos.";
      } else {
        return Lungo.Router.section("home_s");
      }
    };

    PaymentCtrl.prototype.showErrors = function() {};

    PaymentCtrl.prototype.loadPayment = function(amount_payment) {
      amount = amount_payment;
      this.amount_text[0].innerText = "A pagar: " + amount + " €";
      this.creditCard.val("");
      this.cvc.val("");
      this.expires.val("");
      return this.button[0].disabled = false;
    };

    return PaymentCtrl;

  })(Monocle.Controller);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.ProfileCtrl = (function(_super) {
    __extends(ProfileCtrl, _super);

    function ProfileCtrl() {
      this.saveChanges = __bind(this.saveChanges, this);
      this.clickAvatar = __bind(this.clickAvatar, this);
      this.saveAvatar = __bind(this.saveAvatar, this);
      _ref = ProfileCtrl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfileCtrl.prototype.elements = {
      "#reg_email": "email",
      "#reg_phone": "phone",
      "#reg_name": "name",
      "#reg_surname": "surname",
      "#reg_image": "image",
      "#avatar": "avatar"
    };

    ProfileCtrl.prototype.events = {
      "singleTap #save": "saveChanges",
      "singleTap #avatar": "clickAvatar",
      "change #reg_image": "saveAvatar"
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
          console.log(avatar.src);
          return avatar.src = dataURL;
        };
      };
    };

    ProfileCtrl.prototype.clickAvatar = function(event) {
      return this.image[0].click();
    };

    ProfileCtrl.prototype.saveChanges = function(event) {
      return Lungo.Router.back();
    };

    return ProfileCtrl;

  })(Monocle.Controller);

}).call(this);
