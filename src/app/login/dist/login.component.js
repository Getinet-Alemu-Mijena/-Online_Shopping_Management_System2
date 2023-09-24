"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.loginForm = new forms_1.FormGroup({
            userName: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern('[a-zA-Z ]*'),
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(20)
            ]),
            password: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.maxLength(15)
            ])
        });
    }
    Object.defineProperty(LoginComponent.prototype, "userName", {
        get: function () {
            return this.loginForm.get('userName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.LoginSubmitted = function () {
        var _this = this;
        this.http
            .get("http://localhost:3050/loginCheck/" + this.userName.value + "/" + this.password.value)
            .subscribe(function (response) {
            if (response.message == 'User exists') {
                _this.userSession.setUserName(_this.userName.value);
                _this.UsersId(_this.userName.value);
                _this.CheckRole(_this.userName.value);
                // this.router.navigate(['/Home']);
            }
            else {
                _this.IncorrectUserOrPassword = "Incorrect phone number Or Password";
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    LoginComponent.prototype.CheckRole = function (userName) {
        var _this = this;
        this.http.get("http://localhost:3050/RollCheck/" + userName).subscribe(function (response) {
            if (response.message == 'User exists') {
                _this.UserRole = response.roll;
                if (_this.UserRole === "Seller") {
                    _this.router.navigate(['/seller']);
                    _this.userSession.setUserRoll("Seller");
                }
                else if (_this.UserRole === "Buyer") {
                    _this.router.navigate(['/customer']);
                    _this.userSession.setUserRoll("Buyer");
                }
                else if (_this.UserRole === "Admin") {
                    _this.router.navigate(['/admins']);
                    _this.userSession.setUserRoll("Admin");
                }
                else {
                    _this.router.navigate(['/Home']);
                    _this.userSession.setUserRoll("Both");
                }
                // alert(this.UserRole);
                // alert(this.userSession.getUserName());
                // this.Load_User_Balance(userName);
            }
            else {
                _this.IncorrectUserOrPassword = 'Incorrect User Name Or Password/ You are not activated!';
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    LoginComponent.prototype.UsersId = function (userName) {
        var _this = this;
        // alert("called");
        this.http.get("http://localhost:3050/UserId/" + userName).subscribe(function (response) {
            if (response.message == 'User exists') {
                _this.UserId = response.Ids;
                // alert(this.UserId);
                _this.userSession.setUserId(_this.UserId);
            }
            else {
                _this.IncorrectUserOrPassword = 'Incorrect User Name Or Password';
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
