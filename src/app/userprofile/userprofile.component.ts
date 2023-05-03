import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
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
