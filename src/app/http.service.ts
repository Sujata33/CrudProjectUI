import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBanks } from './interfaces/banks';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:7236";
  http = inject(HttpClient);
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
}
