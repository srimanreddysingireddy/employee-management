import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone:true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']

})
export class EmpAddEditComponent  implements OnInit{
   empForm:FormGroup;
    education: string[]=['matric', 'Diploma','Indermediate','Graduate','Post Graduate'];

    constructor(
      private _fb: FormBuilder,
      private _empService:EmployeeService,
      private _dialogRef: MatDialogRef<EmpAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
    ) {
      this.empForm = this._fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        education: ['', Validators.required],
        company: ['', Validators.required],
        experience: ['', [Validators.required, Validators.min(0)]],
        salary: ['', [Validators.required, Validators.min(0)]],
      });
    }
    ngOnInit(): void {
        this.empForm.patchValue(this.data);
    }

    onFormSubmit(){
      if(this.empForm.valid )
      {
        if(this.data){
          this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
            next: (val: any)=>
            {
                alert('Employee Details Updated ');
                this._dialogRef.close(true);    
            },
            error:(err: any)=>{
              console.error(err);
            }
          
          })

        }
        else{
              this._empService.addEmployee(this.empForm.value).subscribe({
                next: (val: any)=>
                {
                    alert('Employee Added Successfully');
                    this._dialogRef.close(true);    
                },
                error:(err: any)=>{
                  console.error(err);
                }
              
              })
            }
      }
               
    }
}
