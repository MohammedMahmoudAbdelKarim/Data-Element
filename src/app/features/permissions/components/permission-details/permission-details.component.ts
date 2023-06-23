import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/features/client-management/models/client.model';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-permission-details',
  templateUrl: './permission-details.component.html',
  styleUrls: ['./permission-details.component.scss'],
})
export class PermissionDetailsComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public permissionDetails!: ClientModel;

  constructor(
    private _route: ActivatedRoute,
    private _permissionService: PermissionService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDetails(+this._route.snapshot.queryParams['id']);
  }

  public getDetails(id: number) {
    this._subscription$.add(
      this._permissionService.getByID(id).subscribe((res) => {
        this.permissionDetails = res;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
