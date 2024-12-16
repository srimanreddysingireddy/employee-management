import { Component, OnInit,ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule ,} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
     
  ],
  providers: [EmployeeService], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('start', style({ opacity: 1 })),
      state('end', style({ opacity: 0 })),
      transition('start => end', [animate('0.3s')]),
      transition('end => start', [animate('0.3s')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Employee-Management';

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','salary','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private _empService: EmployeeService) {}

  ngOnInit(): void {
      this.getEmployeeList();
  }

  openAddEditForm() {
    const dialogRef=this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("employee deleted");
        this.getEmployeeList();

      },
      error:console.log,
    })
  }


  openEditForm(data: any) {
   const dialogRef= this._dialog.open(EmpAddEditComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.getEmployeeList();
          }
        }
      })
    
  }
}
