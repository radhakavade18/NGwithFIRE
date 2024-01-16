import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetadata } from '../model/file-metadata';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore, private fireStorage: AngularFireStorage) { }

  // save metadat of file to firestore
  saveMetaDataOfFile(file: FileMetadata){
    const fileMeta = {
      id: '',
      name: file.name,
      url: file.url,
      size: file.size,
    }

    file.id = this.fireStore.createId();

    this.fireStore.collection('/Upload').add(file);
  }

  // display all files
  getAllFiles() {
    return this.fireStore.collection('/Upload').snapshotChanges();
  }

  // delete file
  deleteFile(fileMeta: FileMetadata){
    this.fireStore.collection('/Upload').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Upload/'+fileMeta.name).delete();
  }
}
