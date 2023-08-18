import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent {
  productId: any;
  product: any;
  userId: any;
  // zoomin!: boolean;
  // subzoomin!: boolean;
  product1: any;
  currentTime: any;
  hours: any;
  minutes: any;
  seconds: any;
  formattedTime: any;
  image: string = '';
  subzoomin: number = -1;
  zoomin: boolean = false;
  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}

  addToChart = new FormGroup({
    productowner: new FormControl('', [Validators.required]),
    ProductId: new FormControl('', [Validators.required]),
    CustomerId: new FormControl('', [Validators.required]),
    ProductPrice: new FormControl('', [Validators.required]),
    ProductQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    DateAdded: new FormControl('', [Validators.required]),
    ProductCategory: new FormControl('', [Validators.required]),
    ProductType: new FormControl('', [Validators.required]),
  });

  get productowner(): FormControl {
    return this.addToChart.get('productowner') as FormControl;
  }
  get ProductId(): FormControl {
    return this.addToChart.get('ProductId') as FormControl;
  }
  get CustomerId(): FormControl {
    return this.addToChart.get('CustomerId') as FormControl;
  }
  get ProductPrice(): FormControl {
    return this.addToChart.get('ProductPrice') as FormControl;
  }
  get ProductQuantity(): FormControl {
    return this.addToChart.get('ProductQuantity') as FormControl;
  }
  get DateAdded(): FormControl {
    return this.addToChart.get('DateAdded') as FormControl;
  }
  get ProductCategory(): FormControl {
    return this.addToChart.get('ProductCategory') as FormControl;
  }
  get ProductType(): FormControl {
    return this.addToChart.get('ProductType') as FormControl;
  }

  ngOnInit(): void {
    this.productId = this.userSession.getProductId();
    this.currentTime = new Date(); // Current time according to user's device

    // Convert to Ethiopian Time (UTC+3)
    const ethiopianOffset = 3 * 60 * 60 * 1000; // UTC+3 in milliseconds
    this.currentTime.setTime(this.currentTime.getTime() + ethiopianOffset);

    this.hours = this.currentTime.getHours();
    this.minutes = this.currentTime.getMinutes();
    this.seconds = this.currentTime.getSeconds();

    // Convert to 12-hour time format with AM/PM
    const ampm = this.hours >= 12 ? 'PM' : 'AM';
    this.hours = this.hours % 12 || 12; // Convert to 12-hour format
    this.formattedTime = `${this.hours}:${this.minutes}:${this.seconds} ${ampm}`;

    this.userId = this.userSession.getUserId();

    if (
      this.userSession.getUserRoll() === 'Seller' ||
      this.userSession.getUserRoll() === 'Both' ||
      this.userSession.getUserRoll() === 'Admin' ||
      this.userSession.getUserRoll() === 'Buyer'
    ) {
      this.getProductDetail();
      this.loadProductSubImages();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
  }

  category: boolean = false;
  backicon: boolean = false;
  addtoCart: boolean = false;
  categoryOfProduct() {
    this.category = true;
    this.backicon = false;
  }

  remove() {
    this.backicon = true;
    this.category = false;
  }
  addToCart() {
    this.addtoCart = true;
  }
  notAddToCart() {
    this.addtoCart = false;
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

  productQuantity1!: string;
  parsedProductQuantity!:number;
  parsedProductQuantityValue!:number;
  insertToCart(productQuantity: any) {
    if(productQuantity == 0 || productQuantity == null || productQuantity < 0){
      const updateData1 = { Availability: 'unavailable' };
      this.http.put(`http://localhost:3050/updateProductAvailability/${this.ProductId.value}`, updateData1 )
      .subscribe(
        response => {
          console.log('Product quantity updated successfully:', response);
          alert('Product quantity updated successfully!');
        },
        error => {
          console.error('Error updating product quantity:', error);
        }
      );
      // alert("The product is unavailable!");
    }else{
     this.parsedProductQuantity = parseInt(productQuantity, 10); // Change base to 10 for integers
     this.parsedProductQuantityValue = parseInt(this.ProductQuantity.value, 10); 
    this.productQuantity1 = (this.parsedProductQuantity - this.parsedProductQuantityValue).toString(); 
    const updateData = { quantity: this.productQuantity1 };
    // alert(this.productQuantity1);
    const product2 = {
      // Set your product details here
      ProductOwner: this.productowner.value,
      ProductId: this.ProductId.value,
      CustomerId: this.CustomerId.value,
      ProductPrice: this.ProductPrice.value,
      ProductQuantity: this.ProductQuantity.value,
      DateAdded: this.DateAdded.value,
      ProductCategory: this.ProductCategory.value,
      ProductType: this.ProductType.value,
      status:'unpaid'
    };
    this.http
      .post<any>('http://localhost:3050/addToCart', product2) // Use 'any' as the response type
      .pipe(
        catchError((error) => {
          console.error('Error adding item to cart', error);
          return throwError('Something went wrong. Please try again later.');
        })
      )
      .subscribe((response) => {
        console.log('Item added to cart', response);
        this.addToChart.reset();
        // alert('Item added successfully!');
      });

      this.http.put(`http://localhost:3050/updateProductQuantity/${this.ProductId.value}`, updateData )
      .subscribe(
        response => {
          console.log('Product quantity updated successfully:', response);
          alert('Product quantity updated successfully!');
        },
        error => {
          console.error('Error updating product quantity:', error);
        }
      );

      const updateData1 = { Availability: 'available' };
      this.http.put(`http://localhost:3050/updateProductAvailability/${this.ProductId.value}`, updateData1 )
      .subscribe(
        response => {
          console.log('Product quantity updated successfully:', response);
          // alert('Product quantity updated successfully!');
        },
        error => {
          console.error('Error updating product quantity:', error);
        }
      );
      // alert("The product is available!");
    }
  }
}
