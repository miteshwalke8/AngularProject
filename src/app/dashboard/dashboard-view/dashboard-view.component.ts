import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
 
  public userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<DashboardViewComponent>,
  private appService: AppService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit(): void {

    this.userForm = this._formBuilder.group({
      ID: [this.data.ID],
      itemId: ['1'],

      FullName: [ this.data.fullName, [Validators.required]],
      
      Email: [ this.data.Email , [Validators.required]],
    });
  }
  
onNoClick(): void {
  this.dialogRef.close();
 }


 onSubmit() {
  if (isNaN(this.data.ID)) {
    this.appService.addUser(this.userForm.value);
    this.dialogRef.close();
  } else {
    this.appService.editUser(this.userForm.value);
    this.dialogRef.close();
  }
}
}


