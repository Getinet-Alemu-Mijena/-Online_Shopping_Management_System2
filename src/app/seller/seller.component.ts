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


  // start of Form Validation
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
      Validators.pattern('^[0-9]+[\d+(\.\d+)]?[0-9]*$')
    ]),
    produtdescription: new FormControl('',[
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(700),
      Validators.pattern(/^[a-zA-Z0-9\s.,!?'"()-]+$/)
    ]),
    produtbrand:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    productmodel: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    productconnectivity: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    powerrequirements: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    warranty: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z\s]*')
    ]),
    dimensions: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?')
    ]),
    inputsoutputs:new FormControl('',[
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9]*')
    ]),
    compatibility:new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*[ ] a-zA-Z0-9]*')
    ])
  });
  get productname(): FormControl {
    return this.uploadForm.get('productname') as FormControl;
  }
  get productprice(): FormControl {
    return this.uploadForm.get('productprice') as FormControl;
  }
  get produtdescription(): FormControl {
    return this.uploadForm.get('produtdescription') as FormControl;
  }
  get produtbrand(): FormControl {
    return this.uploadForm.get('produtbrand') as FormControl;
  }
  get productmodel(): FormControl {
    return this.uploadForm.get('productmodel') as FormControl;
  }
  get productconnectivity(): FormControl {
    return this.uploadForm.get('productconnectivity') as FormControl;
  }
  get powerrequirements(): FormControl {
    return this.uploadForm.get('powerrequirements') as FormControl;
  }
  get warranty(): FormControl {
    return this.uploadForm.get('warranty') as FormControl;
  }
  get dimensions(): FormControl {
    return this.uploadForm.get('dimensions') as FormControl;
  }
  get inputsoutputs(): FormControl {
    return this.uploadForm.get('inputsoutputs') as FormControl;
  }
  get compatibility(): FormControl {
    return this.uploadForm.get('compatibility') as FormControl;
  }

//End of form validation

  //Navigation throu page
  isNavbarOpen: boolean = false;
  action: boolean = false;
  uploadproduct: boolean = false;
  viewproduct: boolean = false;
  manageproduct: boolean = false;
  //Start of Electronics Product
  electronicsprodact: boolean = false;
   computersproduct:boolean = false;
   //End Electronics Product
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
    this.computersproduct = false;
    this.electronicsprodact = false;
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
  computers(){
    this.computersproduct = true;
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
