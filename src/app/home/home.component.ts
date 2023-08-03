import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  isNavbarOpen = false;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // ngOnInit(){
  //   if( this.userSession.getUserRoll()!= "Both" || this.userSession.getUserRoll() == " "){
  //     this.router.navigate(['/login']);
  //     this.userSession.clearUserRoll();
  //   }
  // }
}
