import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filehandling',
  templateUrl: './filehandling.component.html',
  styleUrls: ['./filehandling.component.css'],
})
export class FilehandlingComponent {
//   [x: string]: any;

//   constructor(private http: HttpClient) {}
//   message: string = '';
//   selectedFile: File | null = null;

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }
//   uploadVideo() {
//     if (this.selectedFile) {
//       const formData = new FormData();
//       formData.append('video', this.selectedFile);

//       this.http.post('http://localhost:3050/upload', formData).subscribe(
//         (response) => {
//           this.message = response as string; // Assuming the server responds with a message
//         },
//         (error) => {
//           this.message = 'An error occurred while uploading the video.';
//         }
//       );
//     } else {
//       this.message = 'Please select a video file before uploading.';
//     }
//   }
// 
}
