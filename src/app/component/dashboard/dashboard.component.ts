import { Component } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  studentList: Student[] = [];
  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    gmail: '',
    mobileNumber: '',
  };
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  gmail: string = '';
  mobileNumber: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getAllStudents();
  }

  logout() {
    this.authService.logOut();
  }

  getAllStudents() {
    this.dataService.getAllStudents().subscribe(
      (res) => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching the data');
      }
    );
  }

  restForm() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.gmail = '';
    this.mobileNumber = '';
  }

  addStudent() {
    if (
      this.firstName == '' ||
      this.lastName == '' ||
      this.gmail == '' ||
      this.mobileNumber == ''
    ) {
      alert('Fill all the input fields');
      return;
    }

    this.studentObj.id = '';
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.gmail = this.gmail;
    this.studentObj.mobileNumber = this.mobileNumber;

    this.dataService.addStudent(this.studentObj);
  }

  updateStudent() {}

  deleteStudent(student: Student) {
    if (
      window.confirm(
        `Are you sure you want to delete ${student.firstName} ${student.lastName} ?`
      )
    ) {
      this.dataService.deleteStudent(student);
      this.restForm();
    }
  }
}
