import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  isNavbarOpen:boolean = false;
  action:boolean = false;
  uploadproduct:boolean = false;
  viewproduct:boolean = false;
  toggleNavbar():boolean {
    alert("clicked");
   return this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }
  ngOnInit(){
    if(this.userSession.getUserRoll() === "Buyer" || this.userSession.getUserRoll() === "Both"){
      alert("Allowed!")
    }
    else{
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
  }
}
