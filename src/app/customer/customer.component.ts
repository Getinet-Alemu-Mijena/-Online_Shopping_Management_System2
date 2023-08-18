import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  shoppingcart: boolean = false;
  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  isNavbarOpen: boolean = false;
  action: boolean = false;
  uploadproduct: boolean = false;
  viewproduct: boolean = false;
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
  }
  userId: any = this.userSession.getUserId();
  ngOnInit() {
    if (
      this.userSession.getUserRoll() === 'Buyer' ||
      this.userSession.getUserRoll() === 'Both'
    ) {
      this.fetchProductData();
      this.fetchCartData();
      this.calculateTotalPrice();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
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
  getCustomerBalance(productowner: number,calculatedPrice: number,productIdInCart:number) {
    //get customer Balance
    this.http
      .get(`http://localhost:3050/customerBalance/${this.userId}`)
      .subscribe(
        (response) => {
          if ((response as any).message == 'Customer Balance exists') {
            this.customerBalance = (response as any).Ids;
            this.convertBalanceToFloat(productowner,calculatedPrice,productIdInCart);
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
  convertBalanceToFloat(productowner:number,calculatedPrice: number,productIdInCart:number): void {
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
        this.updateCustomerBalance(productowner,calculatedPrice,updatedCustomerbalance,productIdInCart);
      }
    }
  }
  updateCustomerBalance(productowner:number, calculatedPrice:number, updatedCustomerBalance: number,productIdInCart:number) {
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

    this.http.put<any>('http://localhost:3050/changeProductStatusInCart', payload)
      .subscribe(
        response => {
          console.log('Product status changed successfully:', response);
          // You can perform further actions or update UI here
        },
        error => {
          console.error('Error changing product status:', error);
        }
      );
  }

  makePayment(
    productowner: number,
    productPrice: string,
    productQuantity: string,
    productIdInCart:number
  ) {
    let priceFloat: number = parseFloat(productPrice);
    let quantityFloat: number = parseFloat(productQuantity);
    let calculatedPrice: number = priceFloat * quantityFloat;
    this.getCustomerBalance(productowner,calculatedPrice,productIdInCart);
   }
  logOut() {
    this.userSession.clearUserId();
    this.userSession.clearProductId();
    this.userSession.clearUserName();
    this.userSession.clearUserRoll();
  }
}
