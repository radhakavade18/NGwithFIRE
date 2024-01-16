import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileMetadata } from 'src/app/model/file-metadata';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedFile!: FileList;
  currentFileUpload!: FileMetadata;
  percentage: number = 0;

  listOfFiles : FileMetadata[] = [];

  constructor(
    private fileService: FileService,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getAllFile();
  }

  uploadFile() {
    this.currentFileUpload =  new FileMetadata(this.selectedFile[0]);
    const path = 'Uploads/'+this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFile[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
       storageRef.getDownloadURL().subscribe(downloadLink => {
         this.currentFileUpload.id = '';
         this.currentFileUpload.url = downloadLink;
         this.currentFileUpload.size = this.currentFileUpload.file.size;
         this.currentFileUpload.name = this.currentFileUpload.file.name;

         this.fileService.saveMetaDataOfFile(this.currentFileUpload);
         this.ngOnInit();
       })
       this.ngOnInit();
    })
    ).subscribe( (res : any) => {
       this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
       console.log('Error occured');
    });

 }

  getAllFile() {
    this.fileService.getAllFiles().subscribe(res => {
      this.listOfFiles = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      console.log("Error occurend while fetching files");
    })
  }

  deleteFile(file: FileMetadata) {
    if(window.confirm('Are your sure you want to delete file '+file.name)){
      this.fileService.deleteFile(file);
      this.ngOnInit();
    }
  }

  selectFile(event: any) {
    this.selectedFile = event.target.files;
  }
}
