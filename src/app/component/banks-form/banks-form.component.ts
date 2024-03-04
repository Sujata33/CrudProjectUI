import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpService } from '../../http.service';
import { IBanks } from '../../interfaces/banks';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-banks-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './banks-form.component.html',
  styleUrl: './banks-form.component.css'
})
export class BanksFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  banksForm = this.formBuilder.group({
    ref_code: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern("[a-zA-Z].$")]],
    short_name: ['', [Validators.required, Validators.pattern("[a-zA-Z].$")]]
  });


  banksId!: number;
  isEdit = false;
  ngOnInit() {
    this.banksId = this.route.snapshot.params["id"];
    if (this.banksId) {
      this.isEdit = true;
      this.httpService.getBanks(this.banksId).subscribe(result => {
        console.log(result);
        this.banksForm.patchValue(result);
      })
    }

  }



  save() {
    console.log(this.banksForm.value);
    const banks: IBanks = {

      ref_code: this.banksForm.value.ref_code!,
      name: this.banksForm.value.name!,
      short_name: this.banksForm.value.short_name!,

      updated_at: new Date(),
      created_at: new Date()
    }



    if (this.isEdit) {
      if (this.banksForm.valid) {
        this.httpService.updateBanks(this.banksId, banks).subscribe(() => {
          console.log("Success");
          this.router.navigateByUrl("/bank-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.banksForm.valid) {
        this.httpService.createBanks(banks).subscribe(() => {
          console.log("Success");

          this.router.navigateByUrl("/bank-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }
}
