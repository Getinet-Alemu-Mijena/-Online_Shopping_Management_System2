import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {


  isNavbarOpen:boolean = false;
  edit_profile:boolean = false;
  edit_Input:boolean = false;
  saveButton:boolean = false;
  action:boolean = false;

  constructor(){}
  toggleNavbar(){
   this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }

  editProfile(){
     this.edit_profile = !this.edit_profile;
  }
  updateInfo(){
    this.edit_Input = !this.edit_Input;
    this.saveButton = !this.saveButton;
  }
}
