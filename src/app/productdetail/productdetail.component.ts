import { Component } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent {
   
  category:boolean = false;
  backicon:boolean = false;
  categoryOfProduct(){
    this.category = true;
  }

  remove(){
   this.backicon = true;
  }
}
