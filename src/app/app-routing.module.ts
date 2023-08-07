import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SellerComponent } from './seller/seller.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FilehandlingComponent } from './filehandling/filehandling.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {path:'seller',component:SellerComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'userprofile',component:UserprofileComponent},
  {path:'files',component:FilehandlingComponent},
  {path:'product-detail',component:ProductdetailComponent},
  {path:'customer',component:CustomerComponent},
  {path:'admins',component:AdminComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'faq',component: FaqComponent},
  {path:'Home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
