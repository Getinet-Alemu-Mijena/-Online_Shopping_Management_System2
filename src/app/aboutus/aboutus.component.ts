import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  constructor(
    private http: HttpClient,
    private userSession: UsersessionService,
    private router: Router
  ) {}
  displaymore:boolean = false;
  displayMore(){
    this.displaymore = true;
  }
  displayLess(){
    this.displaymore = false;
  }
  ngOnInit() {
    if(this.userSession.getUserRoll() === " "){
      alert("Allowed!")
    }
    else{
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
}
}
