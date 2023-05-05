import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {


  isNavbarOpen:boolean = false;
  edit_profile:boolean = false;
  action:boolean = false;

  constructor(){}
  toggleNavbar():boolean {
    alert("clicked");
   return this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }

  editProfile(){
     this.edit_profile = !this.edit_profile;
  }
}
