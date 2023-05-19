import { Component } from '@angular/core';

@Component({
  selector: 'app-filehandling',
  templateUrl: './filehandling.component.html',
  styleUrls: ['./filehandling.component.css']
})
export class FilehandlingComponent {
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      // Here, you can implement the logic to upload the image to a server
      // For example, using Angular's HttpClient to make a POST request
      // You can send the image data using FormData or base64 encoded string

      // Reset the input and image preview after successful upload
      this.imageUrl = null;
      this.selectedFile = null;
      const fileInput: HTMLInputElement = document.querySelector('#imageInput')!;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  onFilesSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadVideo();
  }

  uploadVideo() {
    const fileInput: HTMLInputElement = document.querySelector('#videoInput')!;
    const file: File | null = fileInput?.files?.[0] || null;

    if (file) {
      // Here, you can implement the logic to upload the video to a server
      // For example, using Angular's HttpClient to make a POST request
      // You can send the video data using FormData or any other desired format

      // For demonstration purposes, log the file name
      console.log('Video uploaded:', file.name);

      // Reset the input after successful upload
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }
  onFilePdfSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadPDF();
  }

  uploadPDF() {
    // Here, you can implement the logic to upload the PDF to a server
    // For example, using Angular's HttpClient to make a POST request
    // You can send the PDF data using FormData or any other desired format

    // For demonstration purposes, log the file name
    // console.log('PDF uploaded:', file.name);

    // Reset the input after successful upload
    const fileInput: HTMLInputElement = document.querySelector('#pdfInput')!;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}