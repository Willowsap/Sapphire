import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  qrlink: string;
  password: string;
  showInput: boolean;

  constructor() {
    this.qrlink = "";
    this.password = "";
    this.showInput = true;
  }
}
