import { Component, inject } from '@angular/core';
import { IBanks } from '../../interfaces/banks';
import { HttpService } from '../../http.service';
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
  selector: 'app-banks-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatInputModule, MatFormFieldModule, MatSortModule, MatPaginatorModule],
  templateUrl: './banks-list.component.html',
  styleUrl: './banks-list.component.css'
})
export class BanksListComponent {
  banksList: IBanks[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'ref_code', 'name', 'short_name', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<IBanks>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit() {
    this.getBanksFormServer();
  }

  getBanksFormServer() {
    this.httpService.getAllBanks().subscribe((result: IBanks[]) => {

      this.banksList = result;
      this.dataSource = new MatTableDataSource(this.banksList);
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
    this.router.navigateByUrl("/banks/" + id);

  }
  delete(id: number) {
    this.httpService.deleteBanks(id).subscribe(() => {
      console.log("Deleted");
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getBanksFormServer();
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
