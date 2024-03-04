import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBanks } from './interfaces/banks';
import { IBranches } from './interfaces/branches';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7236";
  http = inject(HttpClient);
  banks: any;

  constructor() { }

  getAllBanks() {
    return this.http.get<IBanks[]>(this.apiUrl + "/api/Banks")
  }

  createBanks(banks: IBanks) {
    return this.http.post(this.apiUrl + "/api/Banks", banks);
  }

  getBanks(banksId: number) {
    return this.http.get<IBanks>(this.apiUrl + "/api/Banks/" + banksId)
  }

  updateBanks(banksId: number, banks: IBanks) {
    return this.http.put<IBanks>(this.apiUrl + "/api/Banks/" + banksId, banks)
  }
  deleteBanks(banksId: number) {
    return this.http.delete(this.apiUrl + "/api/Banks/" + banksId)
  }


  getAllBranches() {
    return this.http.get<IBranches[]>(this.apiUrl + "/api/Branches")
  }

  createBranches(branches: IBranches) {
    return this.http.post(this.apiUrl + "/api/Branches", branches);
  }

  getBranches(branchesId: number) {
    return this.http.get<IBranches>(this.apiUrl + "/api/Branches/" + branchesId)
  }

  updateBranches(branchesId: number, branches: IBranches) {
    return this.http.put<IBranches[]>(this.apiUrl + "/api/Branches/" + branchesId, branches)
  }
  deleteBranches(branchesId: number) {
    return this.http.delete(this.apiUrl + "/api/Branches/" + branchesId)
  }

}
