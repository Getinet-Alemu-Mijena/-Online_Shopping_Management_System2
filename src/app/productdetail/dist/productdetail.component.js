"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductdetailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var ProductdetailComponent = /** @class */ (function () {
    function ProductdetailComponent(http, userSession, router) {
        this.http = http;
        this.userSession = userSession;
        this.router = router;
        this.image = '';
        this.subzoomin = -1;
        this.zoomin = false;
        this.addToChart = new forms_1.FormGroup({
            productowner: new forms_1.FormControl('', [forms_1.Validators.required]),
            ProductId: new forms_1.FormControl('', [forms_1.Validators.required]),
            CustomerId: new forms_1.FormControl('', [forms_1.Validators.required]),
            ProductPrice: new forms_1.FormControl('', [forms_1.Validators.required]),
            ProductQuantity: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern('[0-9]*'),
            ]),
            DateAdded: new forms_1.FormControl('', [forms_1.Validators.required]),
            ProductCategory: new forms_1.FormControl('', [forms_1.Validators.required]),
            ProductType: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        this.category = false;
        this.backicon = false;
        this.addtoCart = false;
    }
    Object.defineProperty(ProductdetailComponent.prototype, "productowner", {
        get: function () {
            return this.addToChart.get('productowner');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "ProductId", {
        get: function () {
            return this.addToChart.get('ProductId');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "CustomerId", {
        get: function () {
            return this.addToChart.get('CustomerId');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "ProductPrice", {
        get: function () {
            return this.addToChart.get('ProductPrice');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "ProductQuantity", {
        get: function () {
            return this.addToChart.get('ProductQuantity');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "DateAdded", {
        get: function () {
            return this.addToChart.get('DateAdded');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "ProductCategory", {
        get: function () {
            return this.addToChart.get('ProductCategory');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductdetailComponent.prototype, "ProductType", {
        get: function () {
            return this.addToChart.get('ProductType');
        },
        enumerable: false,
        configurable: true
    });
    ProductdetailComponent.prototype.ngOnInit = function () {
        this.productId = this.userSession.getProductId();
        this.currentTime = new Date(); // Current time according to user's device
        // Convert to Ethiopian Time (UTC+3)
        var ethiopianOffset = 3 * 60 * 60 * 1000; // UTC+3 in milliseconds
        this.currentTime.setTime(this.currentTime.getTime() + ethiopianOffset);
        this.hours = this.currentTime.getHours();
        this.minutes = this.currentTime.getMinutes();
        this.seconds = this.currentTime.getSeconds();
        // Convert to 12-hour time format with AM/PM
        var ampm = this.hours >= 12 ? 'PM' : 'AM';
        this.hours = this.hours % 12 || 12; // Convert to 12-hour format
        this.formattedTime = this.hours + ":" + this.minutes + ":" + this.seconds + " " + ampm;
        this.userId = this.userSession.getUserId();
        if (this.userSession.getUserRoll() === 'Seller' ||
            this.userSession.getUserRoll() === 'Both' ||
            this.userSession.getUserRoll() === 'Admin' ||
            this.userSession.getUserRoll() === 'Buyer') {
            this.getProductDetail();
            this.loadProductSubImages();
        }
        else {
            this.router.navigate(['/login']);
            this.userSession.clearUserRoll();
        }
    };
    ProductdetailComponent.prototype.categoryOfProduct = function () {
        this.category = true;
        this.backicon = false;
    };
    ProductdetailComponent.prototype.remove = function () {
        this.backicon = true;
        this.category = false;
    };
    ProductdetailComponent.prototype.addToCart = function () {
        this.addtoCart = true;
    };
    ProductdetailComponent.prototype.notAddToCart = function () {
        this.addtoCart = false;
    };
    // code to add product to products wishlist
    ProductdetailComponent.prototype.addToWishList = function (productOwner, productId, Produt_Price, productCategory, productType, productName, productImage) {
        var data = {
            userId: this.userId,
            product_Owner: productOwner,
            product_Id: productId,
            ProdutPrice: Produt_Price,
            product_Category: productCategory,
            product_Type: productType,
            product_Name: productName,
            product_Image: productImage
        };
        this.http.post('http://localhost:3050/addToWishList', data).subscribe(function (response) {
            if (response.message == "Product added to your wishlist successfully") {
                alert("Product added to your wishlist successfully");
            }
            else {
                alert("Something is an error!");
            }
        }, function (error) {
            console.log("Error", error);
        });
    };
    // check if the product already exists
    ProductdetailComponent.prototype.checkProducts = function (productOwner, productId, Produt_Price, productCategory, productType, productName, productImage) {
        var _this = this;
        this.product_Owner = productOwner;
        this.product_Id = productId;
        this.ProdutPrice = Produt_Price;
        this.product_Category = productCategory;
        this.product_Type = productType;
        this.product_Name = productName;
        this.product_Image = productImage;
        this.http.get("http://localhost:3050/checkProductsInWishlist/" + this.userId + "/" + this.product_Id).subscribe(function (reponse) {
            if (reponse.message == 'Product already exists') {
                alert("Poroduct already exists!");
            }
            else {
                _this.addToWishList(_this.product_Owner, _this.product_Id, _this.ProdutPrice, _this.product_Category, _this.product_Type, _this.product_Name, _this.product_Image);
            }
        }, function (error) {
            console.error("Error", error);
        });
    };
    // Code to send http request to back end to load product detail
    ProductdetailComponent.prototype.getProductDetail = function () {
        var _this = this;
        this.http
            .get("http://localhost:3050/product?id=" + this.productId)
            .subscribe(function (response) {
            _this.product = response;
        }, function (error) {
            console.error('Error fetching product details: ', error);
        });
    };
    ProductdetailComponent.prototype.loadProductSubImages = function () {
        var _this = this;
        this.http
            .get("http://localhost:3050/subProducts/" + this.productId)
            .subscribe(function (response) {
            console.log('Sub-products response:', response);
            var imagesString = response.ProdutsImage; // Get the images string from the response
            _this.product1 = imagesString.split(', '); // Convert the string into an array
            console.log('Sub-product images:', _this.product1);
        }, function (error) {
            console.error('Error fetching sub-product details: ', error);
        });
    };
    ProductdetailComponent.prototype.insertToCart = function (productQuantity) {
        var _this = this;
        var product_Quantity = parseInt(productQuantity);
        var Product_Quantity1 = parseInt(this.ProductQuantity.value);
        if (product_Quantity == 0 || product_Quantity == null || product_Quantity < 0) {
            alert("Product is unavailable!");
            var updateData1 = { Availability: 'unavailable' };
            this.http.put("http://localhost:3050/updateProductAvailability/" + this.ProductId.value, updateData1)
                .subscribe(function (response) {
                console.log('Product quantity updated successfully:', response);
                alert('Product quantity updated successfully!');
            }, function (error) {
                console.error('Error updating product quantity:', error);
            });
            // alert("The product is unavailable!");
        }
        else if (product_Quantity < Product_Quantity1) {
            alert("Sorry the amount you need is not available. Please see the quantity of the product from the product detail and enter the amount you want accordingly!");
        }
        else {
            this.parsedProductQuantity = parseInt(productQuantity, 10); // Change base to 10 for integers
            this.parsedProductQuantityValue = parseInt(this.ProductQuantity.value, 10);
            this.productQuantity1 = (this.parsedProductQuantity - this.parsedProductQuantityValue).toString();
            var updateData = { quantity: this.productQuantity1 };
            // alert(this.productQuantity1);
            var product2 = {
                // Set your product details here
                ProductOwner: this.productowner.value,
                ProductId: this.ProductId.value,
                CustomerId: this.CustomerId.value,
                ProductPrice: this.ProductPrice.value,
                ProductQuantity: this.ProductQuantity.value,
                DateAdded: this.DateAdded.value,
                ProductCategory: this.ProductCategory.value,
                ProductType: this.ProductType.value,
                status: 'unpaid'
            };
            this.http
                .post('http://localhost:3050/addToCart', product2) // Use 'any' as the response type
                .pipe(operators_1.catchError(function (error) {
                console.error('Error adding item to cart', error);
                return rxjs_1.throwError('Something went wrong. Please try again later.');
            }))
                .subscribe(function (response) {
                console.log('Item added to cart', response);
                _this.addToChart.reset();
                // alert('Item added successfully!');
            });
            this.http.put("http://localhost:3050/updateProductQuantity/" + this.ProductId.value, updateData)
                .subscribe(function (response) {
                console.log('Product quantity updated successfully:', response);
                alert('Product quantity updated successfully!');
            }, function (error) {
                console.error('Error updating product quantity:', error);
            });
            var updateData1 = { Availability: 'available' };
            this.http.put("http://localhost:3050/updateProductAvailability/" + this.ProductId.value, updateData1)
                .subscribe(function (response) {
                console.log('Product quantity updated successfully:', response);
                // alert('Product quantity updated successfully!');
            }, function (error) {
                console.error('Error updating product quantity:', error);
            });
            // alert("The product is available!");
        }
    };
    ProductdetailComponent = __decorate([
        core_1.Component({
            selector: 'app-productdetail',
            templateUrl: './productdetail.component.html',
            styleUrls: ['./productdetail.component.css']
        })
    ], ProductdetailComponent);
    return ProductdetailComponent;
}());
exports.ProductdetailComponent = ProductdetailComponent;
