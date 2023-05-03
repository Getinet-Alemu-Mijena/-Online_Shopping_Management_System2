import { Component } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  isNavbarOpen:boolean = false;
  action:boolean = false;
  toggleNavbar():boolean {
    alert("clicked");
   return this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }
}
