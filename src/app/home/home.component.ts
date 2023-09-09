import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: any;
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  isNavbarOpen = false;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(){

    this.userId = this.userSession.getUserId();
    if(this.userSession.getUserRoll()!= "Seller" || this.userSession.getUserRoll()!= "Admin" || this.userSession.getUserRoll()!= "Buyer" || this.userSession.getUserRoll()!= "Both" || this.userSession.getUserRoll() == " "){
      this.router.navigate(['/Home']);
    }
    else{
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
    this.fetchProductData();
  }
  navigateToProductDetail(productId: number) {
    this.router.navigate(['product-detail', productId]);
    this.userSession.setProductId(productId);
  }
  product2: any[] = [];
  fetchProductData(): void {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const backendUrl = 'http://localhost:3050';

    // Call the backend API to fetch product data
    this.http.get<any[]>(`${backendUrl}/getHomePageProducts`).subscribe(
      (data) => {
        this.product2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
