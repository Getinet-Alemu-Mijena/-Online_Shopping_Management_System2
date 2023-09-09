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
var forms_1 = require("@angular/forms");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.preferenceForm = new forms_1.FormGroup({
            productCategory: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(3)
            ]),
            ProductBrand: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            ProductType: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            ProductSize: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            ProductPrice: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[0-9 ]*')
            ]),
            ProductColor: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            ProductShipping: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            NotificationPreferences: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ]),
            PromotionsAndOffers: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(20),
                forms_1.Validators.pattern('[a-zA-Z ]*')
            ])
        });
        this.isNavbarOpen = false;
        this.action = false;
        this.uploadproduct = false;
        this.viewproduct = false;
        this.shoppingcart = false;
        this.customerPreferences = false;
        this.recommended_products = false;
        this.product_Wishlist = false;
        this.product3 = [];
        // code to display products from wishlist
        this.product5 = [];
        // code to display recommended products 
        this.product4 = [];
        this.product1 = [];
        //Fetching data from the cart table
        this.product2 = [];
    }
    Object.defineProperty(CustomerComponent.prototype, "productCategory", {
        get: function () {
            return this.preferenceForm.get('productCategory');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductBrand", {
        get: function () {
            return this.preferenceForm.get('ProductBrand');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductType", {
        get: function () {
            return this.preferenceForm.get('ProductType');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductSize", {
        get: function () {
            return this.preferenceForm.get('ProductSize');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductPrice", {
        get: function () {
            return this.preferenceForm.get('ProductPrice');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductColor", {
        get: function () {
            return this.preferenceForm.get('ProductColor');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "ProductShipping", {
        get: function () {
            return this.preferenceForm.get('ProductShipping');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "NotificationPreferences", {
        get: function () {
            return this.preferenceForm.get('NotificationPreferences');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "PromotionsAndOffers", {
        get: function () {
            return this.preferenceForm.get('PromotionsAndOffers');
        },
        enumerable: false,
        configurable: true
    });
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
        this.customerPreferences = false;
        this.recommended_products = false;
        this.product_Wishlist = false;
    };
    CustomerComponent.prototype.customerpreferences = function () {
        this.viewproduct = true;
        this.shoppingcart = false;
        this.customerPreferences = true;
        this.recommended_products = false;
        this.product_Wishlist = false;
    };
    CustomerComponent.prototype.recommendedProducts = function () {
        this.recommended_products = true;
        this.viewproduct = true;
        this.shoppingcart = false;
        this.customerPreferences = false;
        this.product_Wishlist = false;
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
        this.customerPreferences = false;
        this.recommended_products = false;
        this.product_Wishlist = false;
    };
    CustomerComponent.prototype.productWishlist = function () {
        this.product_Wishlist = true;
        this.shoppingcart = false;
        this.viewproduct = true;
        this.customerPreferences = false;
        this.recommended_products = false;
    };
    CustomerComponent.prototype.ngOnInit = function () {
        this.userId = this.userSession.getUserId();
        if (this.userSession.getUserRoll() === 'Buyer' ||
            this.userSession.getUserRoll() === 'Both') {
            this.fetchProductData();
            this.fetchCartData();
            this.calculateTotalPrice();
            this.recommendToCustomer();
            this.displayWishListProduct();
        }
        else {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
    };
    // Add product preferences
    CustomerComponent.prototype.productPreferences = function () {
        var _this = this;
        var data = {
            UserId: this.userId,
            product_Category: this.productCategory.value,
            productBrand: this.ProductBrand.value,
            productType: this.ProductType.value,
            productSize: this.ProductSize.value,
            productPrice: this.ProductPrice.value,
            productColor: this.ProductColor.value,
            productShipping: this.ProductShipping.value,
            notificationPreferences: this.NotificationPreferences.value,
            promotionsAndOffers: this.PromotionsAndOffers.value
        };
        this.http.post('http://localhost:3050/addPreferences', data).subscribe(function (response) {
            if (response.message == 'Preference added successfully') {
                alert("Done successfully!");
                _this.preferenceForm.reset();
            }
            else {
                alert("Something is wrong!");
            }
        }, function (error) {
            console.error('Error:', error);
        });
    };
    CustomerComponent.prototype.recommendToCustomer = function () {
        var _this = this;
        this.http.get("http://localhost:3050/recommendationToTheUser/" + this.userId).subscribe(function (data) {
            _this.product3 = data;
            for (var _i = 0, _a = _this.product3; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.User_Id = product.UserId;
                _this.product_Category = product.ProductCategory;
                _this.Product_Brand = product.ProductBrand;
                _this.Product_Type = product.ProductType;
                _this.Product_Size = product.ProductSize;
                _this.Product_Color = product.ProductColor;
                _this.Product_Price = product.ProductPrice;
                _this.Preffered_Shipping = product.PrefferedShipping;
                _this.Notification_ = product.Notification;
                _this.Promotion_ = product.Promotion;
                _this.displayRecommendeProducts(_this.product_Category, _this.Product_Brand, _this.Product_Type, _this.Product_Size, _this.Product_Color, _this.Product_Price, _this.Preffered_Shipping, _this.Notification_, _this.Promotion_);
            }
        }, function (error) {
            console.error(error);
        });
    };
    CustomerComponent.prototype.displayWishListProduct = function () {
        var _this = this;
        this.http.get("http://localhost:3050/displayWishListProduct/" + this.userId).subscribe(function (data) {
            _this.product5 = data;
        }, function (error) {
            console.error("Error:", error);
        });
    };
    CustomerComponent.prototype.displayRecommendeProducts = function (product_Category, Product_Brand, Product_Type, Product_Size, Product_Color, Product_Price, Preffered_Shipping, Notification_, Promotion_) {
        var _this = this;
        this.http.get("http://localhost:3050/displayRecommendeProducts/" + product_Category + "/" + Product_Brand + "/" + Product_Type + "/" + Product_Size + "/" + Product_Color + "/" + Product_Price + "/" + Preffered_Shipping + "/" + Notification_ + "/" + Promotion_).subscribe(function (data) {
            _this.product4 = data;
            for (var _i = 0, _a = _this.product4; _i < _a.length; _i++) {
                var product = _a[_i];
                // alert(product.Product_Name);
            }
        }, function (error) {
            console.error(error);
        });
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
