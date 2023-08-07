import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

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
  rightsidebar:boolean = false;
  cancelBtn:boolean = false;

  constructor(  private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router ){}
  toggleNavbar(){
   this.isNavbarOpen = !this.isNavbarOpen;
  }
  rightSideBar(){

     this.rightsidebar = true;
  }

  notRightSideBar(){
    
    this.rightsidebar = false;
 }

  editProfile(){
     this.edit_profile = true;
  }
  updateInfo(){
    this.edit_Input = true;
    this.saveButton = false;
    this.cancelBtn = false
  }
  cancelMethod(){
    this.cancelBtn = true;
    this.edit_Input = false;
    this.saveButton = false;
  }

  savemethod(){
    this.saveButton = true;
    this.cancelBtn = false;
    this.edit_Input = false;
  }


  // Start of form validation
  updateForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    username: new FormControl('',[
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[+251]?[0]?[1-9]*'),
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    roll: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    age: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ])
  });

  get firstname(): FormControl {
    return this.updateForm.get('firstname') as FormControl;
  }
  get lastname(): FormControl {
    return this.updateForm.get('lastname') as FormControl;
  }
  get username(): FormControl {
    return this.updateForm.get('username') as FormControl;
  }
  get email(): FormControl {
    return this.updateForm.get('email') as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.updateForm.get('phoneNumber') as FormControl;
  }
  get roll(): FormControl {
    return this.updateForm.get('roll') as FormControl;
  }
  get gender(): FormControl {
    return this.updateForm.get('gender') as FormControl;
  }
  get age(): FormControl {
    return this.updateForm.get('age') as FormControl;
  }
  get password(): FormControl {
    return this.updateForm.get('password') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.updateForm.get('ConfirmPassword') as FormControl;
  }
  passWordValidators(): boolean {
    if (this.password.value === this.ConfirmPassword.value) {
      return true;
    }
    else {
      return false;
    }
  }
  ngOnInit() {
    if(this.userSession.getUserRoll() === "Seller" || this.userSession.getUserRoll() === "Both" || this.userSession.getUserRoll() === "Buyer" || this.userSession.getUserRoll() === "Admin" ){
      this.router.navigate(['/userprofile']);
    }
    else{
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
}
}
