import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SellerComponent } from './seller/seller.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FilehandlingComponent } from './filehandling/filehandling.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'seller',component:SellerComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'userprofile',component:UserprofileComponent},
  {path:'files',component:FilehandlingComponent},
  {path:'Home',component:HomeComponent},
  { path: '',   redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
