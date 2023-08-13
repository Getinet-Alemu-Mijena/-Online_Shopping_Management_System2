import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent{
  productId: any;
  product: any;
  userId: any;
  zoomin!: boolean;
  subzoomin!: boolean;
  product1: any;

  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productId = this.userSession.getProductId();

    this.userId = this.userSession.getUserId();
    // alert(this.userId);
    if (
      this.userSession.getUserRoll() === 'Seller' ||
      this.userSession.getUserRoll() === 'Both' ||
      this.userSession.getUserRoll() === 'Admin'
    ) {
      this.getProductDetail();
      this.  loadProductSubImages();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
    // this.productId = this.router.snapshot.paramMap.get('Id');
    throw new Error('Method not implemented.');
  }

  category: boolean = false;
  backicon: boolean = false;
  categoryOfProduct() {
    this.category = true;
    this.backicon = false;
  }

  remove() {
    this.backicon = true;
    this.category = false;
  }
  // Code to send http request to back end to load product detail
  getProductDetail() {
    this.http
      .get<any>(`http://localhost:3050/product?id=${this.productId}`)
      .subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.error('Error fetching product details: ', error);
        }
      );
  }

  // loadProductSubImages(): void {
  //   this.http
  //     .get<any>(`http://localhost:3050/subProducts/${this.productId}`)
  //     .subscribe(
  //       (response) => {
  //         console.log('Sub-products response:', response); // Log the entire response
  //         this.product1 = response.ProdutsImage; // Assign the array to product1
  //         console.log('Sub-product images:', this.product1); // Log the product1 array
  //       },
  //       (error) => {
  //         console.error('Error fetching sub-product details: ', error);
  //       }
  //     );
  // }

  loadProductSubImages(): void {
    this.http
      .get<any>(`http://localhost:3050/subProducts/${this.productId}`)
      .subscribe(
        (response) => {
          console.log('Sub-products response:', response);
          const imagesString = response.ProdutsImage; // Get the images string from the response
          this.product1 = imagesString.split(', '); // Convert the string into an array
          console.log('Sub-product images:', this.product1);
        },
        (error) => {
          console.error('Error fetching sub-product details: ', error);
        }
      );
  }
  
  
}
