import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Subscription } from 'rxjs';
import { ClientModel } from '../../models/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-client-details',
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  private _subscription$: Subscription = new Subscription();
  public clientId!: number;
  public clientDetails!: ClientModel;

  constructor(private _route: ActivatedRoute, private _clientService: ClientService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.clientId = +this._route.snapshot.queryParams['id'];
    this.getDetails();
  }

  public getDetails() {
    this._subscription$.add(
      this._clientService.getByID(this.clientId).subscribe(res => {
        this.clientDetails = res;
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe()
  }
}
