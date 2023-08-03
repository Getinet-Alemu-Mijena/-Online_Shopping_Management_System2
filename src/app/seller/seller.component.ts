import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent {
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}

  // start of Form Validation
  uploadForm = new FormGroup({
    productname: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    produttype: new FormControl('', [
      Validators.required,
    ]),
    productprice: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[0-9]+[d+(.d+)]?[0-9]*$'),
    ]),
    produtdescription: new FormControl('', [
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(700),
      Validators.pattern(/^[a-zA-Z0-9\s.,!?'"()-]+$/),
    ]),
    produtbrand: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    productmodel: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    productconnectivity: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    powerrequirements: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    warranty: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    dimensions: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('d+(.d+)?s*xs*d+(.d+)?s*xs*d+(.d+)?'),
    ]),
    inputsoutputs: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    compatibility: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    accessories: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    reviews: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    availability: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    ratings: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    energyEfficiency: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    userManual: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Zs]*'),
    ]),
    produtQuantity: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern('[0-9]*'),
    ]),
    produtWeight: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern('[0-9]*'),
    ]),
    screensize: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    resolution: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    memoryCapacity: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    operatingSystem: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    batteryLife: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    cameraSpecifications: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    audioFeatures: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    processor: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    installedRAM: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    systemType: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    penAndTouch: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    edition: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    version: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    installedOn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    oSBuild: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    serialNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    exprience: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    produtImage: new FormControl('', [
      Validators.required
    ]),
    images: new FormControl('', [
      Validators.required
    ])
  });
  get productname(): FormControl {
    return this.uploadForm.get('productname') as FormControl;
  }
  get produttype(): FormControl {
    return this.uploadForm.get('produttype') as FormControl;
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
  get accessories(): FormControl {
    return this.uploadForm.get('accessories') as FormControl;
  }
  get reviews(): FormControl {
    return this.uploadForm.get('reviews') as FormControl;
  }
  get availability(): FormControl {
    return this.uploadForm.get('availability') as FormControl;
  }
  get ratings(): FormControl {
    return this.uploadForm.get('ratings') as FormControl;
  }
  get energyEfficiency(): FormControl {
    return this.uploadForm.get('energyEfficiency') as FormControl;
  }
  get userManual(): FormControl {
    return this.uploadForm.get('userManual') as FormControl;
  }
  get produtQuantity(): FormControl {
    return this.uploadForm.get('produtQuantity') as FormControl;
  }
  get produtWeight(): FormControl {
    return this.uploadForm.get('produtWeight') as FormControl;
  }
  get screensize(): FormControl {
    return this.uploadForm.get('screensize') as FormControl;
  }
  get resolution(): FormControl {
    return this.uploadForm.get('resolution') as FormControl;
  }
  get memoryCapacity(): FormControl {
    return this.uploadForm.get('memoryCapacity') as FormControl;
  }
  get operatingSystem(): FormControl {
    return this.uploadForm.get('operatingSystem') as FormControl;
  }
  get batteryLife(): FormControl {
    return this.uploadForm.get('batteryLife') as FormControl;
  }
  get cameraSpecifications(): FormControl {
    return this.uploadForm.get('cameraSpecifications') as FormControl;
  }
  get audioFeatures(): FormControl {
    return this.uploadForm.get('audioFeatures') as FormControl;
  }
  get processor(): FormControl {
    return this.uploadForm.get('processor') as FormControl;
  }
  get installedRAM(): FormControl {
    return this.uploadForm.get('installedRAM') as FormControl;
  }
  get systemType(): FormControl {
    return this.uploadForm.get('systemType') as FormControl;
  }
  get penAndTouch(): FormControl {
    return this.uploadForm.get('penAndTouch') as FormControl;
  }
  get edition(): FormControl {
    return this.uploadForm.get('edition') as FormControl;
  }
  get version(): FormControl {
    return this.uploadForm.get('version') as FormControl;
  }
  get installedOn(): FormControl {
    return this.uploadForm.get('installedOn') as FormControl;
  }
  get oSBuild(): FormControl {
    return this.uploadForm.get('oSBuild') as FormControl;
  }
  get serialNumber(): FormControl {
    return this.uploadForm.get('serialNumber') as FormControl;
  }
  get exprience(): FormControl {
    return this.uploadForm.get('exprience') as FormControl;
  }
  get produtImage(): FormControl {
    return this.uploadForm.get('produtImage') as FormControl;
  }
  get images(): FormControl {
    return this.uploadForm.get('images') as FormControl;
  }
  // ngOnInit(){
  //   if(this.userSession.getUserRoll() === "Seller" || this.userSession.getUserRoll() === "Both"){
  //     alert("Allowed!")
  //   }
  //   else{
  //     this.router.navigate(['/login']);
  //     this.userSession.clearUserRoll();
  //   }
  // }
  //End of form validation

  // Start navigation through page
  isNavbarOpen: boolean = false;
  action: boolean = false;
  uploadproduct: boolean = false;
  viewproduct: boolean = false;
  manageproduct: boolean = false;
  //Start of Electronics Product
  electronicsprodact: boolean = false;
  computersproduct: boolean = false;
  //End Electronics Product
  productspecifications: boolean = false;
  produtkeyfeatures: boolean = false;
  clothesprodact: boolean = false;

  toggleNavbar(): boolean {
    alert('clicked');
    return (this.isNavbarOpen = !this.isNavbarOpen);
  }

  actionOn() {
    this.action = true;
  }
  notActionOn(){
    this.action = false;
  }

  uploadProduct() {
    this.uploadproduct = true;
    this.viewproduct = false;
    this.manageproduct = false;
    this.computersproduct = false;
    this.electronicsprodact = false;
  }

  viewProduct() {
    this.viewproduct = false;
    this.uploadproduct = false;
    this.manageproduct = false;
    this.computersproduct = false;
    this.electronicsprodact = false;
  }

  manageProduct() {
    this.manageproduct = true;
    this.uploadproduct = false;
    this.viewproduct = true;
  }

  electronicsProdact() {
    this.electronicsprodact = true;
    this.manageproduct = false;
    this.uploadproduct = false;
    this.viewproduct = false;
  }
  computers() {
    this.computersproduct = true;
    this.viewproduct = true;
  }
  clothesProdact() {
    this.clothesprodact = true;
    this.electronicsprodact = false;
    this.manageproduct = false;
    this.uploadproduct = false;
    this.viewproduct = true;
  }
  productSpecifications() {
    this.productspecifications = true;
  }

  produtKeyFeatures() {
    this.produtkeyfeatures = true;
  }
  // Start navigation through page

  // Start of backend code
  addUser(){
    let data = {
      productName: this.productname.value,
      productPrice: this.productprice.value,
      produtDescription: this.produtdescription.value,
      produtBrand: this.produtbrand.value,
      productModel: this.productmodel.value,
      productConnectivity: this.productconnectivity.value,
      powerRequirements: this.powerrequirements.value,
      productWarranty: this.warranty.value,
      productDimensions: this.dimensions.value,
      productInputsoutputs: this.inputsoutputs.value,
      productCompatibility: this.compatibility.value,
      productAccessories: this.accessories.value,
      productAvailability: this.availability.value,
      productRatings: this.ratings.value,
      energyEfficiency: this.energyEfficiency.value,
      userManual: this.userManual.value,
      produtQuantity: this.produtQuantity.value,
      produtWeight: this.produtWeight.value,
      screenSize: this.screensize.value,
      productResolution: this.resolution.value,
      memoryCapacity: this.memoryCapacity.value,
      operatingSystem: this.operatingSystem.value,
      batteryLife: this.batteryLife.value,
      cameraSpecifications: this.cameraSpecifications.value,
      audioFeatures: this.audioFeatures.value,
      productProcessor: this.processor.value,
      installedRAM: this.installedRAM.value,
      systemType: this.systemType.value,
      penAndTouch: this.penAndTouch.value,
      productEdition: this.edition.value,
      productVersion: this.version.value,
      installedOn: this.installedOn.value,
      oSBuild: this.oSBuild.value,
      serialNumber: this.serialNumber.value,
      productExprience: this.exprience.value,
    };
    this.http.post('http://localhost:3050/addProduct', data).subscribe(
      (response) => {
        if ((response as any).message == 'Product added successfully') {

          this.uploadForm.reset();
          alert('Product added sucessfully');
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  // End of backend code
}
