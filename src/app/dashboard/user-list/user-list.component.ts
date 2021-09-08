import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardViewComponent } from '../dashboard-view/dashboard-view.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isPopupOpened = true;

  constructor(private dialog?: MatDialog,
    private appService?: AppService) { }

  ngOnInit() {
  
  }

  get UserList() {
    return this.appService.getAllUsers();
  }

  addUser() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(DashboardViewComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  
  editUser(id: number) {
    this.isPopupOpened = true;
    const user = this.appService.getAllUsers().find(c => c.ID === id);
    const dialogRef = this.dialog.open(DashboardViewComponent, {
      data: user
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteUser(id: number) {
    this.appService.deleteUser(id);
  }
}