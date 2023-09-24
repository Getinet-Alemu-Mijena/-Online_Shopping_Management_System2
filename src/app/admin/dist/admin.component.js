"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.isNavbarOpen = false;
        this.action = false;
        this.uploadproduct = false;
        this.viewproduct = false;
        this.manageProduct = false;
        this.users = [];
    }
    AdminComponent.prototype.toggleNavbar = function () {
        return this.isNavbarOpen = !this.isNavbarOpen;
    };
    AdminComponent.prototype.actionOn = function () {
        this.action = true;
    };
    AdminComponent.prototype.viewProduct = function () {
        this.viewproduct = false;
        this.manageProduct = false;
    };
    AdminComponent.prototype.managemeUser = function () {
        this.viewproduct = true;
        this.manageProduct = true;
        this.manageUser();
    };
    AdminComponent.prototype.ngOnInit = function () {
        if (this.userSession.getUserRoll() != "Admin" || this.userSession.getUserRoll() == " ") {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
        else {
            this.manageUser();
        }
    };
    AdminComponent.prototype.manageUser = function () {
        var _this = this;
        this.http.get("http://localhost:3050/displayUser").subscribe(function (response) {
            _this.users = response;
        }, function (error) {
            console.error(error);
        });
    };
    AdminComponent.prototype.deleteUser = function (userId) {
        var _this = this;
        if (confirm('Are you sure you want to delete this user?')) {
            this.http["delete"]("http://localhost:3050/DeletUser/" + userId).subscribe(function (response) {
                if (response.massege == 'User deleted successfully') {
                    alert("User deleted successfuly");
                    _this.manageUser();
                }
            }, function (error) {
                console.error("Error:", error);
            });
        }
    };
    AdminComponent.prototype.activateUser = function (userId) {
        var dataStatus = {
            data: '1'
        };
        this.http.put("http://localhost:3050/ActivateUserStatus/" + userId, dataStatus).subscribe(function (response) {
            if (response.massege == 'User activated succsessufly!') {
                alert("User activated succsessufly!");
            }
        }, function (error) {
            console.error("Error", error);
        });
    };
    AdminComponent.prototype.deactivateUser = function (userId) {
        var dataStatus = {
            data: '0'
        };
        this.http.put("http://localhost:3050/deActivateUserStatus/" + userId, dataStatus).subscribe(function (response) {
            if (response.massege == 'User deactivated successfully!') {
                alert("User deactivated successfully!");
            }
        }, function (error) {
            console.error("Error!", error);
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css']
        })
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
