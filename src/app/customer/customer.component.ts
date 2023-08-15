import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{
  shoppingcart: boolean = false;
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  isNavbarOpen:boolean = false;
  action:boolean = false;
  uploadproduct:boolean = false;
  viewproduct:boolean = false;
  toggleNavbar():boolean {
    alert("clicked");
   return this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }
  viewAllProduct(){
    this.viewproduct = false;
    this.shoppingcart = false;
  }
  remobeRightSideBar(){
    this.action = false;
  }
  navigateToProductDetail(productId: number) {
    this.router.navigate(['product-detail', productId]);
    this.userSession.setProductId(productId);
  }
  shoppingCart(){
    this.shoppingcart = true;
    this.viewproduct = true;
  }
  userId:any = this.userSession.getUserId();
  ngOnInit(){
    if(this.userSession.getUserRoll() === "Buyer" || this.userSession.getUserRoll() === "Both"){
      this.fetchProductData();
    }
    else{
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
  logOut() {
    this.userSession.clearUserId();
    this.userSession.clearProductId();
    this.userSession.clearUserName();
    this.userSession.clearUserRoll();
  }
}
