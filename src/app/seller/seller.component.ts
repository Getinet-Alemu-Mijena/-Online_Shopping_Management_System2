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
  userId: any;
  ProductsPictures!: string[];
  ProductPicture: any;
  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  fb: any;
  fileName: any;
  // ProductPicture!: string;
  Product1!: string;
  Product2!: string;

  // start of Form Validation
  uploadForm = new FormGroup({
    productname: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    produttype: new FormControl('', [Validators.required]),
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
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    productmodel: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    productconnectivity: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    powerrequirements: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    warranty: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    dimensions: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('d+(.d+)?s*xs*d+(.d+)?s*xs*d+(.d+)?'),
    ]),
    inputsoutputs: new FormControl('', [
      // Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    compatibility: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    accessories: new FormControl('', [
      // Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    reviews: new FormControl('', [
      // Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    availability: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    ratings: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    energyEfficiency: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
    ]),
    userManual: new FormControl('', [
      // Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ][a-zA-Zs ]*'),
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
      // Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    resolution: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    memoryCapacity: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    operatingSystem: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    batteryLife: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    cameraSpecifications: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    audioFeatures: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    processor: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    installedRAM: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    systemType: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    penAndTouch: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    edition: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    version: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    installedOn: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    oSBuild: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    serialNumber: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    experience: new FormControl('', [
      // Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    produtImage: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required]),
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
  get experience(): FormControl {
    return this.uploadForm.get('experience') as FormControl;
  }
  get produtImage(): FormControl {
    return this.uploadForm.get('produtImage') as FormControl;
  }
  get images(): FormControl {
    return this.uploadForm.get('images') as FormControl;
  }
  ngOnInit() {
    this.userId = this.userSession.getUserId();
    // alert(this.userId);
    if (
      this.userSession.getUserRoll() === 'Seller' ||
      this.userSession.getUserRoll() === 'Both'
    ) {
      // this.fetchProductImages();
      this.fetchProductData();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }

    this.uploadForm = this.fb.group({
      produtImage: [null, [Validators.required]],
    });
    // this.uploadForm = this.fb.group({
    //   images: [
    //     null,
    //     [Validators.required, this.validateFileTypes(['image/*'])],
    //     [Validators.required, this.validateFileTypesVideo(['video/*'])],
    //   ],
    // });
    this.uploadForm = this.fb.group({
      images: [null, Validators.required],
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.ProductPicture = file.name;
    this.Product1 = file;
    if (file.type.includes('image/') || file.type.includes('video/')) {
      this.uploadForm.patchValue({ produtImage: file });
    } else {
      this.uploadForm.patchValue({ produtImage: null });
    }
  }

  // fileSelected(event: any) {
  //   const files = event.target.files;
  //   console.log(files);  // Debugging line.
  //   this.ProductsPicture = files.name;
  //   this.Product2 = files;
  //   if (files.length > 0) {
  //     this.uploadForm.patchValue({ images: files });
  //   } else {
  //     this.uploadForm.patchValue({ images: null });
  //   }
  // }

  // fileSelected(event: any) {
  //   const files = event.target.files;
  //   console.log(files); // Debugging line.

  //   if (files.length > 0) {
  //     this.ProductsPicture = files[0].name;
  //     this.Product2 = files[0];
  //     this.uploadForm.patchValue({ images: files });
  //   }
  // }

  fileSelected(event: any) {
    const files = event.target.files;
    this.Product2 = files;

    if (files.length > 0) {
      this.ProductsPictures = [];

      for (const file of files) {
        this.ProductsPictures.push(file.name);
        console.log(this.ProductsPictures);
      }

      // Replace the input element with a new one to reset its value
      const inputElement = document.getElementById(
        'image-upload'
      ) as HTMLInputElement;
      inputElement.outerHTML = inputElement.outerHTML;
    }
  }

  validateFileTypes(allowedTypes: string[]) {
    return (control: any) => {
      const files = control.value;
      let valid = true;

      if (files) {
        for (const file of files) {
          if (!allowedTypes.some((type) => file.type.match(type))) {
            valid = false;
            break;
          }
        }
      }

      return valid ? null : { invalidFileType: true };
    };
  }

  validateFileTypesVideo(allowedTypes: string[]) {
    return (control: any) => {
      const files = control.value;
      let valid = true;

      if (files) {
        for (const file of files) {
          if (!allowedTypes.some((type) => file.type.match(type))) {
            valid = false;
            break;
          }
        }
      }

      return valid ? null : { invalidFileType: true };
    };
  }
  //End of form validation

  // Start navigation through page
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
    alert('clicked');
    return (this.isNavbarOpen = !this.isNavbarOpen);
  }

  actionOn() {
    this.action = true;
  }
  notActionOn() {
    this.action = false;
  }

  uploadProduct() {
    this.uploadproduct = true;
    this.viewproduct = true;
    this.manageproduct = false;
    this.electronicsprodact = false;
  }

  viewProduct() {
    this.viewproduct = false;
    this.uploadproduct = false;
    this.manageproduct = false;
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
  // End navigation through page

  // Start of backend code

  addProduct() {
    let data = {
      productName: this.productname.value,
      produtType: this.produttype.value,
      productPrice: this.productprice.value,
      produtDescription: this.produtdescription.value,
      produtBrand: this.produtbrand.value,
      productModel: this.productmodel.value,
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
      productExprience: this.experience.value,
      productConnectivity: this.productconnectivity.value,
      powerRequirements: this.powerrequirements.value,
      productWarranty: this.warranty.value,
      productDimensions: this.dimensions.value,
      productInputsoutputs: this.inputsoutputs.value,
      productCompatibility: this.compatibility.value,
      productAccessories: this.accessories.value,
      productReviews: this.reviews.value,
      productAvailability: this.availability.value,
      productRatings: this.ratings.value,
      energyEfficiency: this.energyEfficiency.value,
      userManual: this.userManual.value,
      produtQuantity: this.produtQuantity.value,
      produtWeight: this.produtWeight.value,
      produtImage: this.ProductPicture,
      images: this.ProductsPictures,
      UserId: this.userId,
    };

    // add here the typescript code to copy the selected file to assets/Images folder

    this.http.post('http://localhost:3050/addProduct', data).subscribe(
      (response) => {
        if ((response as any).message == 'Product added successfully') {
          this.uploadForm.reset();
          alert('Product added sucessfully');

          if (this.Product1) {
            //alert('some how it is working');
            const formData = new FormData();
            formData.append('file', this.Product1);
            this.http
              .post('http://localhost:3050/uploadImage', formData)
              .subscribe((response) => {
                console.log(response);
                alert('File Uploaded!');
              });
          }

          if (this.ProductsPictures) {
            const formData = new FormData();
          
            // Convert filenames to File objects and append them to FormData
            // for (const selectedFileName of this.ProductsPictures) {
            //   const file = new File([selectedFileName], selectedFileName, {
            //     type: 'image/png/webp/png/jpg/jfif' // Adjust the MIME type as needed
            //   });
            //   formData.append('files', file);
            // }
            for (const selectedFileName of this.ProductsPictures) {
              const file = new File([selectedFileName], selectedFileName);
              formData.append('files', file);
            }
            
            // Send the FormData object in the POST request
            this.http.post('http://localhost:3050/uploadImages', formData).subscribe(
              (response) => {
                console.log(response);
                alert('Files Uploaded!');
              },
              (error) => {
                console.error('Error uploading files: ', error);
              }
            );
            }
          
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  //Check if the product alreeady exists
  checkProduct() {
    this.http
      .get(
        `http://localhost:3050/checkProducts/${this.productname.value}/${this.serialNumber.value}`
      )
      .subscribe(
        (response) => {
          if ((response as any).message == 'Product already exists') {
            alert('Product already exists');
          } else {
            this.addProduct();
          }
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
  }
  //End of backend

  //View All Products
  // product2:any;
  // fetchProductImages(): void {
  //   this.http.get<any[]>(`http://localhost:3050/getProductImages/${this.userId}`).subscribe(
  //     (response) => {
  //       this.product2 = response;
  //       // alert(this.product2);
  //       // console.log(this.product2);
  //     },
  //     (error) => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // View All Products
  product2: any[] = [];
  fetchProductData(): void {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const backendUrl = 'http://localhost:3050';

    // Call the backend API to fetch product data
    this.http.get<any[]>(`${backendUrl}/getProducts/${this.userId}`).subscribe(
      (data) => {
        this.product2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  navigateToProductDetail(productId: number) {
    this.router.navigate(['product-detail', productId]);
    this.userSession.setProductId(productId);
  }
  // End of backend code

  logOut() {
    this.userSession.clearUserId();
  }
}
