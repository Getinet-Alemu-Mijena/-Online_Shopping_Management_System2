import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  constructor(private http: HttpClient, private router: Router) { };


  //Form Validation
  uploadForm = new FormGroup({
    productname: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    productprice: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[0-9]+(\.[0-9]*)?$')
    ])
  });
  get productname(): FormControl {
    return this.uploadForm.get('productname') as FormControl;
  }
  get productprice(): FormControl {
    return this.uploadForm.get('productprice') as FormControl;
  }



  //Navigation throu page
  isNavbarOpen: boolean = false;
  action: boolean = false;
  uploadproduct: boolean = false;
  viewproduct: boolean = false;
  manageproduct: boolean = false;
  electronicsprodact: boolean = false;
  productspecifications: boolean = false;
  produtkeyfeatures: boolean = false;
  clothesprodact: boolean = false;

  toggleNavbar(): boolean {
    alert("clicked");
    return this.isNavbarOpen = !this.isNavbarOpen;
  }

  actionOn() {
    this.action = true;
  }

  uploadProduct() {
    this.uploadproduct = true;
    this.viewproduct = false;
    this.manageproduct = false;
  }

  viewProduct() {
    this.viewproduct = true;
    this.uploadproduct = false;
    this.manageproduct = false;
  }

  manageProduct() {
    this.manageproduct = true;
    this.uploadproduct = false;
    this.viewproduct = false;
  }

  electronicsProdact() {
    this.electronicsprodact = true;
    this.manageproduct = false;
    this.uploadproduct = false;
    this.viewproduct = false;
  }
  clothesProdact() {
    this.clothesprodact = true;
    this.electronicsprodact = false;
    this.manageproduct = false;
    this.uploadproduct = false;
    this.viewproduct = false;
  }
  productSpecifications() {
    this.productspecifications = true;
  }

  produtKeyFeatures() {
    this.produtkeyfeatures = true;
  }

}
