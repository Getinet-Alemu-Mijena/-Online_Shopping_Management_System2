import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit{
  productId: any;
  product: any;
  userId: any;

  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  ngOnInit(): void{


    this.productId = this.userSession.getProductId();

    this.userId = this.userSession.getUserId();
    // alert(this.userId);
    if (
      this.userSession.getUserRoll() === 'Seller' ||
      this.userSession.getUserRoll() === 'Both' ||
      this.userSession.getUserRoll() === 'Admin'
    ) {
      this.getProductDetail();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
    // this.productId = this.router.snapshot.paramMap.get('Id');
    throw new Error('Method not implemented.');
    
  }
   
  category:boolean = false;
  backicon:boolean = false;
  categoryOfProduct(){
    this.category = true;
    this.backicon = false;
  }

  remove(){
   this.backicon = true;
   this.category = false;
  }

  // Code to send http request to back end to load product detail
  getProductDetail() {
    this.http.get<any>(`http://localhost:3050/product?id=${this.productId}`).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.error('Error fetching product details: ', error);
      }
    );
  }
}
