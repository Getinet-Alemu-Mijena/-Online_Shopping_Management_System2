import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersessionService } from '../usersession.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  UserRole: any;
  UserId: any;
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  IncorrectUserOrPassword:any;
  
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ])
  });
  get userName(): FormControl {
    return this.loginForm.get('userName') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  LoginSubmitted(){

    this.http
        .get(`http://localhost:3050/loginCheck/${this.userName.value}/${this.password.value}`)
        .subscribe(
          (response) => {
            if ((response as any).message == 'User exists') {
              this.userSession.setUserName(this.userName.value);
              this.UsersId(this.userName.value);
              this.CheckRole(this.userName.value);
            // this.router.navigate(['/Home']);
            } else {
              this.IncorrectUserOrPassword="Incorrect phone number Or Password";
            }
          },
          (error) => {
            //this.dataAdded = false;
            console.error('Error: ', error);

          }
        );
  }

  CheckRole(userName: string) {
    this.http.get(`http://localhost:3050/RollCheck/${userName}`).subscribe(
      (response) => {
        if ((response as any).message == 'User exists') {
          this.UserRole = (response as any).roll;
          if(this.UserRole === "Seller"){
            this.router.navigate(['/seller']);
            this.userSession.setUserRoll("Seller");
          }
          else if(this.UserRole === "Buyer"){
            this.router.navigate(['/customer']);
            this.userSession.setUserRoll("Buyer");
          }
          else if(this.UserRole === "Admin"){
            this.router.navigate(['/admins']);
            this.userSession.setUserRoll("Admin");
          }
          else {
            this.router.navigate(['/Home']);
            this.userSession.setUserRoll("Both");
          }
          // alert(this.UserRole);
          // alert(this.userSession.getUserName());
          // this.Load_User_Balance(userName);
         
        } else {
          this.IncorrectUserOrPassword = 'Incorrect User Name Or Password/ You are not activated!';
        }
      },
      (error) => {
        //this.dataAdded = false;
        console.error('Error: ', error);
      }
    );
  }


  UsersId(userName: string) {
    // alert("called");
    this.http.get(`http://localhost:3050/UserId/${userName}`).subscribe(
      (response) => {
        if ((response as any).message == 'User exists') {
          this.UserId = (response as any).Ids;
          // alert(this.UserId);
           this.userSession.setUserId(this.UserId);
        } else {
          this.IncorrectUserOrPassword = 'Incorrect User Name Or Password';
        }
      },
      (error) => {
        //this.dataAdded = false;
        console.error('Error: ', error);
      }
    );
  }
}
