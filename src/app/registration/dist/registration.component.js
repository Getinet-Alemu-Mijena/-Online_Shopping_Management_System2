"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(http, router) {
        this.http = http;
        this.router = router;
        // Start of form validation
        this.registerForm = new forms_1.FormGroup({
            firstname: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*'),
            ]),
            lastname: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.maxLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*')
            ]),
            username: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.maxLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*')
            ]),
            email: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.email
            ]),
            phoneNumber: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern('[+251]?[0]?[1-9]*'),
                forms_1.Validators.minLength(10),
                forms_1.Validators.maxLength(13),
            ]),
            roll: new forms_1.FormControl('', [
                forms_1.Validators.required,
            ]),
            gender: new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            age: new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            password: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.maxLength(15)
            ]),
            ConfirmPassword: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.maxLength(15)
            ])
        });
    }
    ;
    Object.defineProperty(RegistrationComponent.prototype, "firstname", {
        get: function () {
            return this.registerForm.get('firstname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "lastname", {
        get: function () {
            return this.registerForm.get('lastname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "username", {
        get: function () {
            return this.registerForm.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "email", {
        get: function () {
            return this.registerForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "phoneNumber", {
        get: function () {
            return this.registerForm.get('phoneNumber');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "roll", {
        get: function () {
            return this.registerForm.get('roll');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "gender", {
        get: function () {
            return this.registerForm.get('gender');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "age", {
        get: function () {
            return this.registerForm.get('age');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "password", {
        get: function () {
            return this.registerForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "ConfirmPassword", {
        get: function () {
            return this.registerForm.get('ConfirmPassword');
        },
        enumerable: false,
        configurable: true
    });
    RegistrationComponent.prototype.passWordValidators = function () {
        if (this.password.value === this.ConfirmPassword.value) {
            return true;
        }
        else {
            return false;
        }
    };
    // End of form validation
    // First_Name	Last_Name	User_Name	Email_Address	Phone_Number	Gender	Age	Password	Balance	Id	
    //Start of backend
    RegistrationComponent.prototype.addUser = function () {
        var _this = this;
        var data = {
            fname: this.firstname.value,
            lname: this.lastname.value,
            userName: this.username.value,
            emailAddress: this.email.value,
            phoneN: this.phoneNumber.value,
            Roll: this.roll.value,
            Gender: this.gender.value,
            Age: this.age.value,
            passw: this.password.value,
            Balance: '50'
        };
        this.http.post('http://localhost:3050/insertCustomer', data).subscribe(function (response) {
            if (response.message == 'User added successfully') {
                _this.registerForm.reset();
                alert('User added sucessfully');
            }
            else {
                alert('something is wrong');
            }
        }, function (error) {
            console.error('Error: ', error);
        });
    };
    RegistrationComponent.prototype.checkUser = function () {
        var _this = this;
        this.http
            .get("http://localhost:3050/checkUsers/" + this.firstname.value + "/" + this.lastname.value + "/" + this.phoneNumber.value)
            .subscribe(function (response) {
            if (response.message == 'User already exists') {
                alert('User already exists');
            }
            else {
                _this.addUser();
            }
        }, function (error) {
            console.error('Error: ', error);
        });
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.css']
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
