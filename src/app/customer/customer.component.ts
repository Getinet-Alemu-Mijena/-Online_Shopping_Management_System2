import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) { }

  preferenceForm = new FormGroup({
    productCategory: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    ProductBrand:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ProductType:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ProductSize:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ProductPrice:new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('[0-9 ]*')
    ]),
    ProductColor:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ProductShipping:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    NotificationPreferences:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    PromotionsAndOffers:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')
    ]),
  });

  get productCategory(): FormControl {
    return this.preferenceForm.get('productCategory') as FormControl;
  }
  get ProductBrand(): FormControl {
    return this.preferenceForm.get('ProductBrand') as FormControl;
  }
  get ProductType(): FormControl {
    return this.preferenceForm.get('ProductType') as FormControl;
  }
  get ProductSize(): FormControl {
    return this.preferenceForm.get('ProductSize') as FormControl;
  }
  get ProductPrice(): FormControl {
    return this.preferenceForm.get('ProductPrice') as FormControl;
  }
  get ProductColor(): FormControl {
    return this.preferenceForm.get('ProductColor') as FormControl;
  }
  get ProductShipping(): FormControl {
    return this.preferenceForm.get('ProductShipping') as FormControl;
  }
  get NotificationPreferences(): FormControl {
    return this.preferenceForm.get('NotificationPreferences') as FormControl;
  }
  get PromotionsAndOffers(): FormControl {
    return this.preferenceForm.get('PromotionsAndOffers') as FormControl;
  }
  isNavbarOpen: boolean = false;
  action: boolean = false;
  uploadproduct: boolean = false;
  viewproduct: boolean = false;
  shoppingcart: boolean = false;
  customerPreferences:boolean = false;
  recommended_products:boolean = false;
  product_Wishlist:boolean = false;
  toggleNavbar(): boolean {
    alert('clicked');
    return (this.isNavbarOpen = !this.isNavbarOpen);
  }
  actionOn() {
    this.action = true;
  }
  viewAllProduct() {
    this.viewproduct = false;
    this.shoppingcart = false;
    this.customerPreferences = false;
    this.recommended_products = false
    this.product_Wishlist = false;
  }
  customerpreferences(){
    this.viewproduct = true;
    this.shoppingcart = false;
    this.customerPreferences = true;
    this.recommended_products = false
    this.product_Wishlist = false;
  }
  recommendedProducts(){
    this.recommended_products = true
    this.viewproduct = true;
    this.shoppingcart = false;
    this.customerPreferences = false;
    this.product_Wishlist = false;
  }
  remobeRightSideBar() {
    this.action = false;
  }
  navigateToProductDetail(productId: number) {
    this.router.navigate(['product-detail', productId]);
    this.userSession.setProductId(productId);
  }
  shoppingCart() {
    this.shoppingcart = true;
    this.viewproduct = true;
    this.customerPreferences = false;
    this.recommended_products = false
    this.product_Wishlist = false;
  }

  productWishlist(){
    this.product_Wishlist = true;
    this.shoppingcart = false;
    this.viewproduct = true;
    this.customerPreferences = false;
    this.recommended_products = false
  }
  userId: any;
  ngOnInit() {
      
    this.userId = this.userSession.getUserId();
    if (
      this.userSession.getUserRoll() === 'Buyer' ||
      this.userSession.getUserRoll() === 'Both'
    ) {
      this.fetchProductData();
      this.fetchCartData();
      this.calculateTotalPrice();
      this.recommendToCustomer();
      this.displayWishListProduct();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
  }


  // Add product preferences
  productPreferences(){
    let data = {
      UserId: this.userId,
      product_Category: this.productCategory.value,
      productBrand: this.ProductBrand.value,
      productType: this.ProductType.value,
      productSize: this.ProductSize.value,
      productPrice: this.ProductPrice.value,
      productColor: this.ProductColor.value,
      productShipping: this.ProductShipping.value,
      notificationPreferences:this.NotificationPreferences.value,
      promotionsAndOffers: this.PromotionsAndOffers.value
    };
    this.http.post('http://localhost:3050/addPreferences', data).subscribe(
      (response)=>{
        if((response as any).message == 'Preference added successfully'){
         alert("Done successfully!");
         this.preferenceForm.reset();
        }else{
          alert("Something is wrong!");
        }
      }, 
      (error)=>{
        console.error('Error:', error);
      }
    );
  }
  // Id	
  // UserId	
  // ProductCategory	
  // ProductBrand	
  // ProductType	
  // ProductSize	
  // ProductColor	
  // ProductPrice	
  // PrefferedShipping	
  // Notification	
  // Promotion	
  // Recommendation to the user
  User_Id:any;
  product_Category:any;
  Product_Brand:any;
  Product_Type:any;	
  Product_Size	:any;
  Product_Color:any;	
  Product_Price:any;	
  Preffered_Shipping	:any;
  Notification_:any;	
  Promotion_	:any;
  product3: any[] = [];
  recommendToCustomer(): void{
    this.http.get<any[]>(`http://localhost:3050/recommendationToTheUser/${this.userId}`).subscribe(
  (data) => {
    this.product3 = data; 
    for (const product of this.product3) {
      this.User_Id = product.UserId;
      this.product_Category = product.ProductCategory;
     this.Product_Brand = product.ProductBrand;
     this. Product_Type = product.ProductType;	
     this. Product_Size	= product.ProductSize;
     this. Product_Color=product.ProductColor;
     this. Product_Price=product.ProductPrice;
     this. Preffered_Shipping	=product.PrefferedShipping;
     this. Notification_=product.Notification;
     this.Promotion_	=product.Promotion;
     this.displayRecommendeProducts(this.product_Category, this.Product_Brand, this.Product_Type, this.Product_Size, this.Product_Color, this.Product_Price,this.Preffered_Shipping, this.Notification_, this.Promotion_);
    }
  },
  (error) => {
    console.error(error);
  }
);
}

// code to display products from wishlist
product5: any[] = [];
displayWishListProduct(){
 this.http.get<any[]>(`http://localhost:3050/displayWishListProduct/${this.userId}`).subscribe(
  (data)=>{
    this.product5 = data;
  },
  (error)=>{
    console.error("Error:", error);
  }
 );
}

// code to display recommended products 
product4: any[] = [];
displayRecommendeProducts(product_Category:string, Product_Brand:string, Product_Type:string, Product_Size:string, Product_Color:string, Product_Price:string, Preffered_Shipping:string, Notification_:string, Promotion_:string){
  this.http.get<any[]>(`http://localhost:3050/displayRecommendeProducts/${product_Category}/${Product_Brand}/${Product_Type}/${Product_Size}/${Product_Color}/${Product_Price}/${Preffered_Shipping}/${Notification_}/${Promotion_}`).subscribe(
   (data)=>{
   this.product4 = data;
   for(const product of this.product4){
    // alert(product.Product_Name);
   }
   },
   (error)=>{
    console.error(error);
   }
  );
}

  product1: any[] = [];
  fetchProductData(): void {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const backendUrl = 'http://localhost:3050';

    // Call the backend API to fetch product data
    this.http.get<any[]>(`${backendUrl}/loadAllProducts`).subscribe(
      (data) => {
        this.product1 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //Fetching data from the cart table
  product2: any[] = [];
  fetchCartData(): void {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const backendUrl = 'http://localhost:3050';

    // Call the backend API to fetch product data
    this.http.get<any[]>(`${backendUrl}/getCartsData/${this.userId}`).subscribe(
      (data) => {
        this.product2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const product of this.product2) {
      totalPrice += product.ProductPrice * product.ProductQuantity;
    }
    return totalPrice;
  }

  productOwnerBalance!: number;
  customerBalance!: number;
  systemOwnerBalance!: number;
  commissionFromCustomer!: number;
  commissionFomProductOwner!: number;
  getCustomerBalance(
    productowner: number,
    calculatedPrice: number,
    productIdInCart: number
  ) {
    //get customer Balance
    this.http
      .get(`http://localhost:3050/customerBalance/${this.userId}`)
      .subscribe(
        (response) => {
          if ((response as any).message == 'Customer Balance exists') {
            this.customerBalance = (response as any).Ids;
            this.convertBalanceToFloat(
              productowner,
              calculatedPrice,
              productIdInCart
            );
          } else {
            alert('Something is an error');
          }
        },
        (error) => {
          //this.dataAdded = false;
          console.error('Error: ', error);
        }
      );
  }
  convertBalanceToFloat(
    productowner: number,
    calculatedPrice: number,
    productIdInCart: number
  ): void {
    if (typeof this.customerBalance === 'string') {
      const balanceFloat = parseFloat(this.customerBalance);
      this.customerBalance = balanceFloat;
      this.commissionFromCustomer = this.customerBalance * 0.01;
      let updatedCustomerbalance: number =
        this.customerBalance - (calculatedPrice + this.commissionFromCustomer);
      if (
        calculatedPrice >
        this.customerBalance + this.commissionFromCustomer
      ) {
        alert('Your Balance is insufficient!');
      } else {
        this.updateCustomerBalance(
          productowner,
          calculatedPrice,
          updatedCustomerbalance,
          productIdInCart
        );
      }
    }
  }
  updateCustomerBalance(
    productowner: number,
    calculatedPrice: number,
    updatedCustomerBalance: number,
    productIdInCart: number
  ) {
    const updateData4 = { updated_Customer_Balance: updatedCustomerBalance };
    this.http
      .put(
        `http://localhost:3050/updateCustomerBalance/${this.userId}`,
        updateData4,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          console.log('Customer Balance updated successfully:', response);
          alert('Customer Balance updated successfully!');
          this.changeProductStatusInCart(productIdInCart);
          this.getProductOwnerBalance(productowner, calculatedPrice);
        },
        (error) => {
          console.error('Error updating Customer Balance', error);
        }
      );
  }
  getProductOwnerBalance(productOwner: number, calculatedPrice: number) {
    this.http
      .get(`http://localhost:3050/ProductOwnerBalance/${productOwner}`)
      .subscribe(
        (response) => {
          if ((response as any).message == 'Product Owner Balance exists') {
            this.productOwnerBalance = (response as any).Ids;
            this.convertProductOwnerBalanceToFloat(
              productOwner,
              calculatedPrice
            );
          } else {
            alert('Something is an error');
          }
        },
        (error) => {
          //this.dataAdded = false;
          console.error('Error: ', error);
        }
      );
  }

  convertProductOwnerBalanceToFloat(
    productOwner: number,
    calculatedPrice: number
  ): void {
    if (typeof this.productOwnerBalance === 'string') {
      const balanceFloat1 = parseFloat(this.productOwnerBalance);
      this.productOwnerBalance = balanceFloat1; // Update customerBalance with the float value
      this.commissionFomProductOwner = 0.02 * calculatedPrice;
      let updatedProductOwnerBalance: number =
        this.productOwnerBalance +
        calculatedPrice -
        this.commissionFomProductOwner;
      this.updateProductOwnerBalance(productOwner, updatedProductOwnerBalance);
    }
  }

  updateProductOwnerBalance(
    productOwner: number,
    updatedProductOwnerBalance: number
  ) {
    const updateData = {
      updated_Product_Owner_Balance: updatedProductOwnerBalance,
    };
    this.http
      .put(
        `http://localhost:3050/updateProductOwnerBalance/${productOwner}`,
        updateData,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          console.log('Product Owner Balance updated successfully:', response);
          alert('Product Owner Balance updated successfully!');
          this.getSystemOwnerBalance();
        },
        (error) => {
          console.error('Error updating Product Owner Balance:', error);
        }
      );
  }

  getSystemOwnerBalance() {
    this.http.get(`http://localhost:3050/systemOwnerBalance`).subscribe(
      (response) => {
        if ((response as any).message == 'System Owner Balance exists') {
          this.systemOwnerBalance = (response as any).Ids;
          this.convertSystemOwnerBalance();
        } else {
          alert('Something is an error');
        }
      },
      (error) => {
        //this.dataAdded = false;
        console.error('Error: ', error);
      }
    );
  }

  convertSystemOwnerBalance() {
    if (typeof this.systemOwnerBalance === 'string') {
      const balanceFloat2 = parseFloat(this.systemOwnerBalance);
      this.systemOwnerBalance = balanceFloat2;
      let updatedSystemOwnerBalance: number =
        this.systemOwnerBalance +
        (this.commissionFromCustomer + this.commissionFomProductOwner);
      this.updateSystemOwnerbalance(updatedSystemOwnerBalance);
    }
  }

  updateSystemOwnerbalance(updatedSystemOwnerBalance: number) {
    const updateData3 = {
      updated_System_Owner_Balance: updatedSystemOwnerBalance,
    };
    this.http
      .put(`http://localhost:3050/updateSystemOwnerBalance`, updateData3, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log('System Owner Balance updated successfully:', response);
          alert('System Owner Balance updated successfully!');
          this.fetchCartData();
        },
        (error) => {
          console.error('Error updating System Owner Balance:', error);
        }
      );
  }

  changeProductStatusInCart(productIdInCart: number): void {
    // Create a payload for the HTTP request, assuming you want to send productIdInCart to the server
    const payload = { productIdInCart };

    this.http
      .put<any>('http://localhost:3050/changeProductStatusInCart', payload)
      .subscribe(
        (response) => {
          console.log('Product status changed successfully:', response);
          // You can perform further actions or update UI here
        },
        (error) => {
          console.error('Error changing product status:', error);
        }
      );
  }

  makePayment(
    productowner: number,
    productPrice: string,
    productQuantity: string,
    productIdInCart: number
  ) {
    let priceFloat: number = parseFloat(productPrice);
    let quantityFloat: number = parseFloat(productQuantity);
    let calculatedPrice: number = priceFloat * quantityFloat;
    this.getCustomerBalance(productowner, calculatedPrice, productIdInCart);
  }
  //Deleting from carts table
  deleteFromCart(
    productId: number,
    productIdInCart: any,
    productOwner: any,
    product_Quantity: string
  ) {
    // Assuming you have an API call to delete the product from the cart
    if(confirm('Are you sure you want to delete this product?')){
    this.http
      .delete(
        `http://localhost:3050/deleteFromCart/${productIdInCart}/${productOwner}`,
        { responseType: 'text' } // Set the response type to text
      )
      .subscribe(
        () => {
          console.log('Product deleted from cart successfully');
          alert("Product deleted from cart successfully");
          this.getProductQuantity(productId, productOwner, product_Quantity);
        },
        (error) => {
          console.error('Error deleting product from cart:', error);
        }
      );
  }
}
  getProductQuantity(productId: number, productOwner: string, product_Quantity: string) {
    this.http.get<any>(
      `http://localhost:3050/getProductQuantity/${productId}/${productOwner}`
    ).subscribe(
      response => {
        console.log('Raw response:', response); // Log the raw response
  
        try {
          let productQuantity: number = parseInt(response.quantity);
          console.log('Parsed product quantity:', productQuantity); // Log the parsed quantity
          alert(productQuantity);
          
          let quantity: number = parseInt(product_Quantity);
          let updatedProductQuantity: number = productQuantity + quantity;
          alert(updatedProductQuantity);
          this.updateProductQuantity(productId, productOwner, updatedProductQuantity);
        } catch (error) {
          console.error('Error parsing product quantity:', error);
        }
      },
      error => {
        console.error('Error retrieving product quantity:', error);
      }
    );
  }
  
  updateProductQuantity(
    productId: number,
    productOwner: string,
    productQuantity: number
  ) {
    const updateData5 = {
      productId: productId,
      productOwner: productOwner,
      productQuantity: productQuantity,
    };

    this.http
      .put<any>(`http://localhost:3050/updateProductQuantity/${productId}/${productOwner}/${productQuantity}`,
        updateData5
      )
      .subscribe(
        (response) => {
          console.log('Product quantity updated successfully:', response);
          alert('Product quantity updated successfully!');
          this.fetchCartData();
        },
        (error) => {
          console.error('Error updating product quantity:', error);
        }
      );
  }

  logOut() {
    this.userSession.clearUserId();
    this.userSession.clearProductId();
    this.userSession.clearUserName();
    this.userSession.clearUserRoll();
  }
}
