import { Routes } from '@angular/router';
import { BanksListComponent } from './component/banks-list/banks-list.component';
import { BanksFormComponent } from './component/banks-form/banks-form.component';

export const routes: Routes = [
    { path: "", component: BanksListComponent },
    { path: "bank-list", component: BanksListComponent },
    { path: "create-banks", component: BanksFormComponent },
    { path: "banks/:id", component: BanksFormComponent }
];
