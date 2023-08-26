"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerComponent = void 0;
var core_1 = require("@angular/core");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.shoppingcart = false;
        this.isNavbarOpen = false;
        this.action = false;
        this.uploadproduct = false;
        this.viewproduct = false;
        this.userId = this.userSession.getUserId();
        this.product1 = [];
        //Fetching data from the cart table
        this.product2 = [];
    }
    CustomerComponent.prototype.toggleNavbar = function () {
        alert('clicked');
        return (this.isNavbarOpen = !this.isNavbarOpen);
    };
    CustomerComponent.prototype.actionOn = function () {
        this.action = true;
    };
    CustomerComponent.prototype.viewAllProduct = function () {
        this.viewproduct = false;
        this.shoppingcart = false;
    };
    CustomerComponent.prototype.remobeRightSideBar = function () {
        this.action = false;
    };
    CustomerComponent.prototype.navigateToProductDetail = function (productId) {
        this.router.navigate(['product-detail', productId]);
        this.userSession.setProductId(productId);
    };
    CustomerComponent.prototype.shoppingCart = function () {
        this.shoppingcart = true;
        this.viewproduct = true;
    };
    CustomerComponent.prototype.ngOnInit = function () {
        if (this.userSession.getUserRoll() === 'Buyer' ||
            this.userSession.getUserRoll() === 'Both') {
            this.fetchProductData();
            this.fetchCartData();
            this.calculateTotalPrice();
        }
        else {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
    };
    CustomerComponent.prototype.fetchProductData = function () {
        var _this = this;
        // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
        var backendUrl = 'http://localhost:3050';
        // Call the backend API to fetch product data
        this.http.get(backendUrl + "/loadAllProducts").subscribe(function (data) {
            _this.product1 = data;
        }, function (error) {
            console.error(error);
        });
    };
    CustomerComponent.prototype.fetchCartData = function () {
        var _this = this;
        // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
        var backendUrl = 'http://localhost:3050';
        // Call the backend API to fetch product data
        this.http.get(backendUrl + "/getCartsData/" + this.userId).subscribe(function (data) {
            _this.product2 = data;
        }, function (error) {
            console.error(error);
        });
    };
    CustomerComponent.prototype.calculateTotalPrice = function () {
        var totalPrice = 0;
        for (var _i = 0, _a = this.product2; _i < _a.length; _i++) {
            var product = _a[_i];
            totalPrice += product.ProductPrice * product.ProductQuantity;
        }
        return totalPrice;
    };
    CustomerComponent.prototype.getCustomerBalance = function (productowner, calculatedPrice, productIdInCart) {
        var _this = this;
        //get customer Balance
        this.http
            .get("http://localhost:3050/customerBalance/" + this.userId)
            .subscribe(function (response) {
            if (response.message == 'Customer Balance exists') {
                _this.customerBalance = response.Ids;
                _this.convertBalanceToFloat(productowner, calculatedPrice, productIdInCart);
            }
            else {
                alert('Something is an error');
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    CustomerComponent.prototype.convertBalanceToFloat = function (productowner, calculatedPrice, productIdInCart) {
        if (typeof this.customerBalance === 'string') {
            var balanceFloat = parseFloat(this.customerBalance);
            this.customerBalance = balanceFloat;
            this.commissionFromCustomer = this.customerBalance * 0.01;
            var updatedCustomerbalance = this.customerBalance - (calculatedPrice + this.commissionFromCustomer);
            if (calculatedPrice >
                this.customerBalance + this.commissionFromCustomer) {
                alert('Your Balance is insufficient!');
            }
            else {
                this.updateCustomerBalance(productowner, calculatedPrice, updatedCustomerbalance, productIdInCart);
            }
        }
    };
    CustomerComponent.prototype.updateCustomerBalance = function (productowner, calculatedPrice, updatedCustomerBalance, productIdInCart) {
        var _this = this;
        var updateData4 = { updated_Customer_Balance: updatedCustomerBalance };
        this.http
            .put("http://localhost:3050/updateCustomerBalance/" + this.userId, updateData4, { responseType: 'text' })
            .subscribe(function (response) {
            console.log('Customer Balance updated successfully:', response);
            alert('Customer Balance updated successfully!');
            _this.changeProductStatusInCart(productIdInCart);
            _this.getProductOwnerBalance(productowner, calculatedPrice);
        }, function (error) {
            console.error('Error updating Customer Balance', error);
        });
    };
    CustomerComponent.prototype.getProductOwnerBalance = function (productOwner, calculatedPrice) {
        var _this = this;
        this.http
            .get("http://localhost:3050/ProductOwnerBalance/" + productOwner)
            .subscribe(function (response) {
            if (response.message == 'Product Owner Balance exists') {
                _this.productOwnerBalance = response.Ids;
                _this.convertProductOwnerBalanceToFloat(productOwner, calculatedPrice);
            }
            else {
                alert('Something is an error');
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    CustomerComponent.prototype.convertProductOwnerBalanceToFloat = function (productOwner, calculatedPrice) {
        if (typeof this.productOwnerBalance === 'string') {
            var balanceFloat1 = parseFloat(this.productOwnerBalance);
            this.productOwnerBalance = balanceFloat1; // Update customerBalance with the float value
            this.commissionFomProductOwner = 0.02 * calculatedPrice;
            var updatedProductOwnerBalance = this.productOwnerBalance +
                calculatedPrice -
                this.commissionFomProductOwner;
            this.updateProductOwnerBalance(productOwner, updatedProductOwnerBalance);
        }
    };
    CustomerComponent.prototype.updateProductOwnerBalance = function (productOwner, updatedProductOwnerBalance) {
        var _this = this;
        var updateData = {
            updated_Product_Owner_Balance: updatedProductOwnerBalance
        };
        this.http
            .put("http://localhost:3050/updateProductOwnerBalance/" + productOwner, updateData, { responseType: 'text' })
            .subscribe(function (response) {
            console.log('Product Owner Balance updated successfully:', response);
            alert('Product Owner Balance updated successfully!');
            _this.getSystemOwnerBalance();
        }, function (error) {
            console.error('Error updating Product Owner Balance:', error);
        });
    };
    CustomerComponent.prototype.getSystemOwnerBalance = function () {
        var _this = this;
        this.http.get("http://localhost:3050/systemOwnerBalance").subscribe(function (response) {
            if (response.message == 'System Owner Balance exists') {
                _this.systemOwnerBalance = response.Ids;
                _this.convertSystemOwnerBalance();
            }
            else {
                alert('Something is an error');
            }
        }, function (error) {
            //this.dataAdded = false;
            console.error('Error: ', error);
        });
    };
    CustomerComponent.prototype.convertSystemOwnerBalance = function () {
        if (typeof this.systemOwnerBalance === 'string') {
            var balanceFloat2 = parseFloat(this.systemOwnerBalance);
            this.systemOwnerBalance = balanceFloat2;
            var updatedSystemOwnerBalance = this.systemOwnerBalance +
                (this.commissionFromCustomer + this.commissionFomProductOwner);
            this.updateSystemOwnerbalance(updatedSystemOwnerBalance);
        }
    };
    CustomerComponent.prototype.updateSystemOwnerbalance = function (updatedSystemOwnerBalance) {
        var _this = this;
        var updateData3 = {
            updated_System_Owner_Balance: updatedSystemOwnerBalance
        };
        this.http
            .put("http://localhost:3050/updateSystemOwnerBalance", updateData3, {
            responseType: 'text'
        })
            .subscribe(function (response) {
            console.log('System Owner Balance updated successfully:', response);
            alert('System Owner Balance updated successfully!');
            _this.fetchCartData();
        }, function (error) {
            console.error('Error updating System Owner Balance:', error);
        });
    };
    CustomerComponent.prototype.changeProductStatusInCart = function (productIdInCart) {
        // Create a payload for the HTTP request, assuming you want to send productIdInCart to the server
        var payload = { productIdInCart: productIdInCart };
        this.http
            .put('http://localhost:3050/changeProductStatusInCart', payload)
            .subscribe(function (response) {
            console.log('Product status changed successfully:', response);
            // You can perform further actions or update UI here
        }, function (error) {
            console.error('Error changing product status:', error);
        });
    };
    CustomerComponent.prototype.makePayment = function (productowner, productPrice, productQuantity, productIdInCart) {
        var priceFloat = parseFloat(productPrice);
        var quantityFloat = parseFloat(productQuantity);
        var calculatedPrice = priceFloat * quantityFloat;
        this.getCustomerBalance(productowner, calculatedPrice, productIdInCart);
    };
    //Deleting from carts table
    CustomerComponent.prototype.deleteFromCart = function (productId, productIdInCart, productOwner, product_Quantity) {
        var _this = this;
        // Assuming you have an API call to delete the product from the cart
        if (confirm('Are you sure you want to delete this product?')) {
            this.http["delete"]("http://localhost:3050/deleteFromCart/" + productIdInCart + "/" + productOwner, { responseType: 'text' } // Set the response type to text
            )
                .subscribe(function () {
                console.log('Product deleted from cart successfully');
                alert("Product deleted from cart successfully");
                _this.getProductQuantity(productId, productOwner, product_Quantity);
            }, function (error) {
                console.error('Error deleting product from cart:', error);
            });
        }
    };
    CustomerComponent.prototype.getProductQuantity = function (productId, productOwner, product_Quantity) {
        var _this = this;
        this.http.get("http://localhost:3050/getProductQuantity/" + productId + "/" + productOwner).subscribe(function (response) {
            console.log('Raw response:', response); // Log the raw response
            try {
                var productQuantity = parseInt(response.quantity);
                console.log('Parsed product quantity:', productQuantity); // Log the parsed quantity
                alert(productQuantity);
                var quantity = parseInt(product_Quantity);
                var updatedProductQuantity = productQuantity + quantity;
                alert(updatedProductQuantity);
                _this.updateProductQuantity(productId, productOwner, updatedProductQuantity);
            }
            catch (error) {
                console.error('Error parsing product quantity:', error);
            }
        }, function (error) {
            console.error('Error retrieving product quantity:', error);
        });
    };
    CustomerComponent.prototype.updateProductQuantity = function (productId, productOwner, productQuantity) {
        var _this = this;
        var updateData5 = {
            productId: productId,
            productOwner: productOwner,
            productQuantity: productQuantity
        };
        this.http
            .put("http://localhost:3050/updateProductQuantity/" + productId + "/" + productOwner + "/" + productQuantity, updateData5)
            .subscribe(function (response) {
            console.log('Product quantity updated successfully:', response);
            alert('Product quantity updated successfully!');
            _this.fetchCartData();
        }, function (error) {
            console.error('Error updating product quantity:', error);
        });
    };
    CustomerComponent.prototype.logOut = function () {
        this.userSession.clearUserId();
        this.userSession.clearProductId();
        this.userSession.clearUserName();
        this.userSession.clearUserRoll();
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.css']
        })
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
