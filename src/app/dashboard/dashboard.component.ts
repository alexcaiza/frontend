import { Policy } from './../policy';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  policies: Policy[];

  selectedPolicy: Policy = { id: null, number: null, amount: null };

  constructor(
    private apiService: ApiService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.apiService.readPolicies().subscribe((policies: Policy[]) => {
      this.policies = policies;
      console.log(this.policies);
    })
  }

  createOrUpdatePolicy(form) {
    if (this.selectedPolicy && this.selectedPolicy.id) {
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy) => {
        console.log("Policy updated", policy);
      });
    }
    else {

      this.apiService.createPolicy(form.value).subscribe((policy: Policy) => {
        console.log("Policy created, ", policy);
        this.router.navigate(['/']);
      });
    }

  }

  selectPolicy(policy: Policy) {
    this.selectedPolicy = policy;
  }

  deletePolicy(id) {
    this.apiService.deletePolicy(id).subscribe((policy: Policy) => {
      console.log("Policy deleted, ", policy);
    });
  }

}
