import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranches } from '../../interfaces/branches';
import { IBanks } from '../../interfaces/banks';

@Component({
  selector: 'app-branches-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.css'
})
export class BranchesFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  banks: IBanks[] = [];

  branchesForm = this.formBuilder.group({

    ref_code: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
    ifsc: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
    bank_id: [0, [Validators.required]]
  });


  branchesId!: number;
  isEdit = false;
  ngOnInit() {
    this.branchesId = this.route.snapshot.params["id"];
    if (this.branchesId) {
      this.isEdit = true;
      this.httpService.getBranches(this.branchesId).subscribe(result => {
        console.log(result);
        this.branchesForm.patchValue(result);
      })
    }

    this.httpService.getAllBanks().subscribe(banks => {
      this.banks = banks;
    });

  }



  save() {
    console.log(this.branchesForm.value);

    const branches: IBranches = {
      ref_code: this.branchesForm.value.ref_code!,
      name: this.branchesForm.value.name!,
      address: this.branchesForm.value.address!,
      ifsc: this.branchesForm.value.ifsc!,
      bank_id: this.branchesForm.value.bank_id!,
      updated_at: new Date(),
      created_at: new Date(),

    }



    if (this.isEdit) {
      if (this.branchesForm.valid) {
        this.httpService.updateBranches(this.branchesId, branches).subscribe(() => {
          console.log("Success");
          this.router.navigateByUrl("/branch-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.branchesForm.valid) {
        this.httpService.createBranches(branches).subscribe(() => {
          console.log("Success");

          this.router.navigateByUrl("/branch-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }
}


