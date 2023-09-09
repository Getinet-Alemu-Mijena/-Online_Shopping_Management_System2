import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent {
  isNavbarOpen: boolean = false;
  edit_profile: boolean = false;
  edit_Input: boolean = false;
  saveButton: boolean = false;
  rightsidebar: boolean = false;
  cancelBtn: boolean = false;

  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  rightSideBar() {
    this.rightsidebar = true;
  }

  notRightSideBar() {
    this.rightsidebar = false;
  }

  editProfile() {
    this.edit_profile = true;
  }
  updateInfo() {
    this.edit_Input = true;
    this.saveButton = false;
    this.cancelBtn = false;
  }
  cancelMethod() {
    this.cancelBtn = true;
    this.edit_Input = false;
    this.saveButton = false;
    this.edit_profile = false;
  }

  savemethod() {
    this.saveButton = true;
    this.cancelBtn = false;
    this.edit_Input = false;
    this.edit_profile = false;
  }

  // Start of form validation
  updateForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    fileUpload: new FormControl('', [
      Validators.required
    ]),
    Bio: new FormControl('', [
      Validators.required,
      Validators.minLength(200),
      Validators.maxLength(1000),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[+251]?[0]?[1-9]*'),
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });

  get firstname(): FormControl {
    return this.updateForm.get('firstname') as FormControl;
  }
  get Bio(): FormControl {
    return this.updateForm.get('Bio') as FormControl;
  }
  get fileUpload(): FormControl {
    return this.updateForm.get('fileUpload') as FormControl;
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
    } else {
      return false;
    }
  }
  userId!: string;
  fb:any;
  ngOnInit() {
    this.userId = this.userSession.getUserId();
    if (
      this.userSession.getUserRoll() === 'Seller' ||
      this.userSession.getUserRoll() === 'Both' ||
      this.userSession.getUserRoll() === 'Buyer' ||
      this.userSession.getUserRoll() === 'Admin'
    ) {
      this.getUserDetail();
    } else {
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }

    this.updateForm = this.fb.group({
      fileUpload: [null, [Validators.required]],
    });
  }

  Product1:any;
  userPecture:any;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.userPecture = file.name;
    this.Product1 = file;
    if (file.type.includes('image/')) {
      this.updateForm.patchValue({ fileUpload: file });
    } else {
      this.updateForm.patchValue({ fileUpload: null });
    }
  }
  private apiUrl1 = 'http://localhost:3050';
  updateProfile(){
    if(this.Bio.value == ''){
      alert("Enter your bio!")
    } else{
    let userPicture = {
      Id: this.userId,		
      ProfilrPicture: this.userPecture,
      UserInfo: this.Bio.value
    };
      const url = `${this.apiUrl1}/update-user-picture/${userPicture.Id}`;
      
      this.http.put(url, userPicture).subscribe(
        response => {
          console.log('User updated:', response);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );

      // Send the FormData object in the POST request
      if (this.Product1) {
        //alert('some how it is working');
        const formData = new FormData();
        formData.append('file', this.Product1);
        console.log(formData);
        this.http.post('http://localhost:3050/updateUserProfilePicture', formData, { responseType: 'text' })
        .subscribe((response) => {
          console.log(response);
          this.updateForm.reset();
          this.getUserDetail();
        });      
      }
  }
  }
  private apiUrl = 'http://localhost:3050';
  updateUserAccount() {
    let user = {
      Id: this.userId,
      First_Name: this.firstname.value,
      Last_Name: this.lastname.value,
      User_Name: this.username.value,
      Email_Address: this.email.value,
      Phone_Number: this.phoneNumber.value,
      Gender: this.gender.value,
      Age: this.age.value
    };
      const url = `${this.apiUrl}/update-user/${user.Id}`;
      
      this.http.put(url, user).subscribe(
        response => {
          console.log('User updated:', response);
          this.getUserDetail();
        },
        error => {
          console.error('Error updating user:', error);
          alert("Something is wrong!");
        }
      );
    }
    userDetail:any;
    getUserDetail() {
      this.http
        .get<any>(`http://localhost:3050/userDetail?id=${this.userId}`)
        .subscribe(
          (response) => {
            this.userDetail = response;
          },
          (error) => {
            console.error('Error fetching user details: ', error);
          }
        );
    }
    logOut() {
      this.userSession.clearUserId();
      this.userSession.clearProductId();
      this.userSession.clearUserName();
      this.userSession.clearUserRoll()
      this.router.navigate(['/login']);
    }
  }

