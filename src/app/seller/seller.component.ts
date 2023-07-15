import { Component } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

  isNavbarOpen:boolean = false;
  action:boolean = false;
  uploadproduct:boolean = false;
  viewproduct:boolean = false;
  manageproduct:boolean = false;

  toggleNavbar():boolean {
    alert("clicked");
   return this.isNavbarOpen = !this.isNavbarOpen;
  }

  actionOn(){
     this.action = true;
  }

  uploadProduct(){
    this.uploadproduct = true;
    this.viewproduct = false;
    this.manageproduct = false;
  }
  
  viewProduct(){
    this.viewproduct = true;
    this.uploadproduct = false;
    this.manageproduct = false;
  }

  manageProduct(){
   this.manageproduct = true;
   this.uploadproduct = false;
   this.viewproduct = false;
  }

}
