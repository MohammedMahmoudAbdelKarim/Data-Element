import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DomainService } from '../../services/domain.service';
import { ActivatedRoute } from '@angular/router';
import { DomainModel } from '../../models/domain.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-domain-details',
  templateUrl: './domain-details.component.html',
})
export class DomainDetailsComponent implements OnInit {
  constructor(
    private _domainService: DomainService,
    private _route: ActivatedRoute,
    public toastr: ToastrService
  ) {}
  public subscription$: Subscription = new Subscription();
  public domainDetails!: DomainModel;
  ngOnInit(): void {
    this.getByID(+this._route.snapshot.queryParams['id']);
  }

  public getByID(id: number): void {
    this.subscription$.add(
      this._domainService.getByID(id).subscribe((res: any) => {
        this.domainDetails = res['payload'];
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
