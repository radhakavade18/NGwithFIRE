import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  // add student
  addStudent(student: Student){
    student.id = this.afs.createId();
    return this.afs.collection('/Student').add(student);
  }

  // get all students
  getAllStudents(){
    return this.afs.collection('/Student').snapshotChanges();
  }

  // delete Student
  deleteStudent(student: Student){
    return this.afs.doc('/Student/'+student.id).delete();
  }

  // update student
  updateStudent(student : Student){
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
