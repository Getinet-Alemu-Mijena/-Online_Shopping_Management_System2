import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersessionService } from '../usersession.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient,private userSession: UsersessionService, private router:Router){}
  isNavbarOpen:boolean = false;
  action:boolean = false;
  uploadproduct:boolean = false;
  viewproduct:boolean = false;
  manageProduct:boolean = false;


  toggleNavbar():boolean {
   return this.isNavbarOpen = !this.isNavbarOpen;
  }
  actionOn(){
     this.action = true;
  }

  viewProduct(){
    this.viewproduct = false;
    this.manageProduct = false;
  }
  managemeUser(){
    this.viewproduct = true;
    this.manageProduct = true;
    this.manageUser();
  }
  
  ngOnInit(){
    if(this.userSession.getUserRoll() != "Admin" || this.userSession.getUserRoll() == " "){
      this.router.navigate(['/login']);
      this.userSession.clearUserRoll();
    }
    else{
      this.manageUser();
    }
  }

  users: any[] = [];
  manageUser(){
     this.http.get<any[]>(`http://localhost:3050/displayUser`).subscribe(
      (response)=>{
       this.users = response;
      },
      (error)=>{
        console.error(error);
      }
     );
  }

  deleteUser(userId: string){

    if(confirm('Are you sure you want to delete this user?')){
      this.http.delete(`http://localhost:3050/DeletUser/${userId}`).subscribe(
       (response)=>{
        if((response as any).massege == 'User deleted successfully'){
          alert("User deleted successfuly");
          this.manageUser();
        }
       },
       (error)=>{
        console.error("Error:", error);
      }
      );
    }
  }

  activateUser(userId: string){
    
    const dataStatus = {
      data: '1'
    };
    this.http.put(`http://localhost:3050/ActivateUserStatus/${userId}`, dataStatus).subscribe(
     (response)=>{
      if((response as any).massege == 'User activated succsessufly!'){
        alert("User activated succsessufly!");
      }
     },
     (error)=>{
      console.error("Error",error);
    }
    );
  } 

  deactivateUser(userId: string){
    const dataStatus = {
      data: '0'
    };
      this.http.put(`http://localhost:3050/deActivateUserStatus/${userId}`, dataStatus).subscribe(
        (response)=>{
          if((response as any).massege == 'User deactivated successfully!'){
            alert("User deactivated successfully!");
          }
        },
        (error)=>{
         console.error("Error!", error);
        }
        );
  }
}

