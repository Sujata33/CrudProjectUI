import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { IBranches } from '../../interfaces/branches';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatInputModule, MatFormFieldModule, MatSortModule, MatPaginatorModule],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.css'
})
export class BranchesListComponent {
  branchesList: IBranches[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'ref_code', 'name', 'bank_id', 'address', 'ifsc', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<IBranches>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit() {
    this.getBranchesFormServer();
  }

  getBranchesFormServer() {
    this.httpService.getAllBranches().subscribe((result: IBranches[]) => {

      this.branchesList = result;
      this.dataSource = new MatTableDataSource(this.branchesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  // ngOnInit() {
  //   this.httpService.getAllBanks().subscribe(result => {
  //     this.banksList = result;
  //     console.log(this.banksList);

  //   });
  // }



  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/branches/" + id);

  }
  delete(id: number) {
    this.httpService.deleteBranches(id).subscribe(() => {
      console.log("Deleted");
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getBranchesFormServer();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


