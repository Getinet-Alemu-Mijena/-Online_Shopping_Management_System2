import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  displaymore:boolean = false;
  displayMore(){
    this.displaymore = true;
  }
  displayLess(){
    this.displaymore = false;
  }
}
