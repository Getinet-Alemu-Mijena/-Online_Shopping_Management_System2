"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.isNavbarOpen = false;
        this.product2 = [];
    }
    HomeComponent.prototype.toggleNavbar = function () {
        this.isNavbarOpen = !this.isNavbarOpen;
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.userId = this.userSession.getUserId();
        if (this.userSession.getUserRoll() != "Seller" || this.userSession.getUserRoll() != "Admin" || this.userSession.getUserRoll() != "Buyer" || this.userSession.getUserRoll() != "Both" || this.userSession.getUserRoll() == " ") {
            this.router.navigate(['/Home']);
        }
        else {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
        this.fetchProductData();
    };
    HomeComponent.prototype.navigateToProductDetail = function (productId) {
        this.router.navigate(['product-detail', productId]);
        this.userSession.setProductId(productId);
    };
    HomeComponent.prototype.fetchProductData = function () {
        var _this = this;
        // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
        var backendUrl = 'http://localhost:3050';
        // Call the backend API to fetch product data
        this.http.get(backendUrl + "/getHomePageProducts").subscribe(function (data) {
            _this.product2 = data;
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
