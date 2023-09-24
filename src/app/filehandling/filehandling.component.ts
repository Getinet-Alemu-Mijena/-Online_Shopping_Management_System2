import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filehandling',
  templateUrl: './filehandling.component.html',
  styleUrls: ['./filehandling.component.css'],
})
export class FilehandlingComponent {

  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
