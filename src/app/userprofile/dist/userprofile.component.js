"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserprofileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserprofileComponent = /** @class */ (function () {
    function UserprofileComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.isNavbarOpen = false;
        this.edit_profile = false;
        this.edit_Input = false;
        this.saveButton = false;
        this.rightsidebar = false;
        this.cancelBtn = false;
        // Start of form validation
        this.updateForm = new forms_1.FormGroup({
            firstname: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*'),
            ]),
            lastname: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.maxLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*'),
            ]),
            username: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.maxLength(2),
                forms_1.Validators.pattern('[a-zA-Z].*'),
            ]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            phoneNumber: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern('[+251]?[0]?[1-9]*'),
                forms_1.Validators.minLength(10),
                forms_1.Validators.maxLength(13),
            ]),
            gender: new forms_1.FormControl('', [forms_1.Validators.required]),
            age: new forms_1.FormControl('', [forms_1.Validators.required]),
            password: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.maxLength(15),
            ]),
            ConfirmPassword: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.maxLength(15),
            ])
        });
        this.apiUrl = 'http://localhost:3050';
    }
    UserprofileComponent.prototype.toggleNavbar = function () {
        this.isNavbarOpen = !this.isNavbarOpen;
    };
    UserprofileComponent.prototype.rightSideBar = function () {
        this.rightsidebar = true;
    };
    UserprofileComponent.prototype.notRightSideBar = function () {
        this.rightsidebar = false;
    };
    UserprofileComponent.prototype.editProfile = function () {
        this.edit_profile = true;
    };
    UserprofileComponent.prototype.updateInfo = function () {
        this.edit_Input = true;
        this.saveButton = false;
        this.cancelBtn = false;
    };
    UserprofileComponent.prototype.cancelMethod = function () {
        this.cancelBtn = true;
        this.edit_Input = false;
        this.saveButton = false;
    };
    UserprofileComponent.prototype.savemethod = function () {
        this.saveButton = true;
        this.cancelBtn = false;
        this.edit_Input = false;
    };
    Object.defineProperty(UserprofileComponent.prototype, "firstname", {
        get: function () {
            return this.updateForm.get('firstname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "lastname", {
        get: function () {
            return this.updateForm.get('lastname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "username", {
        get: function () {
            return this.updateForm.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "email", {
        get: function () {
            return this.updateForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "phoneNumber", {
        get: function () {
            return this.updateForm.get('phoneNumber');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "gender", {
        get: function () {
            return this.updateForm.get('gender');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "age", {
        get: function () {
            return this.updateForm.get('age');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "password", {
        get: function () {
            return this.updateForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "ConfirmPassword", {
        get: function () {
            return this.updateForm.get('ConfirmPassword');
        },
        enumerable: false,
        configurable: true
    });
    UserprofileComponent.prototype.passWordValidators = function () {
        if (this.password.value === this.ConfirmPassword.value) {
            return true;
        }
        else {
            return false;
        }
    };
    UserprofileComponent.prototype.ngOnInit = function () {
        this.userId = this.userSession.getUserId();
        if (this.userSession.getUserRoll() === 'Seller' ||
            this.userSession.getUserRoll() === 'Both' ||
            this.userSession.getUserRoll() === 'Buyer' ||
            this.userSession.getUserRoll() === 'Admin') {
            this.getUserDetail();
        }
        else {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
    };
    UserprofileComponent.prototype.updateUserAccount = function () {
        var user = {
            Id: this.userId,
            First_Name: this.firstname.value,
            Last_Name: this.lastname.value,
            User_Name: this.lastname.value,
            Email_Address: this.email.value,
            Phone_Number: this.phoneNumber.value,
            Gender: this.gender.value,
            Age: this.age.value
            // ProfilePicture: ''
        };
        var url = this.apiUrl + "/update-user/" + user.Id;
        this.http.put(url, user).subscribe(function (response) {
            console.log('User updated:', response);
            alert("Data is updated");
        }, function (error) {
            console.error('Error updating user:', error);
            alert("Something is wrong!");
        });
    };
    UserprofileComponent.prototype.getUserDetail = function () {
        var _this = this;
        this.http
            .get("http://localhost:3050/userDetail?id=" + this.userId)
            .subscribe(function (response) {
            _this.userDetail = response;
        }, function (error) {
            console.error('Error fetching user details: ', error);
        });
    };
    UserprofileComponent.prototype.logOut = function () {
        this.userSession.clearUserId();
        this.userSession.clearProductId();
        this.userSession.clearUserName();
        this.userSession.clearUserRoll();
    };
    UserprofileComponent = __decorate([
        core_1.Component({
            selector: 'app-userprofile',
            templateUrl: './userprofile.component.html',
            styleUrls: ['./userprofile.component.css']
        })
    ], UserprofileComponent);
    return UserprofileComponent;
}());
exports.UserprofileComponent = UserprofileComponent;
