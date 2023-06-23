import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { ClientService } from '../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-client-list',
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
  public subscriptions$: Subscription = new Subscription();
  @Input() dataSource!: DataSourceModel;
  @Output() deleteEmitter = new EventEmitter();
  @Output() paginateEmitter = new EventEmitter();

  constructor(
    private _router: Router,
    private _clientService: ClientService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  public handleAction(event: { action: string; element: any }) {
    switch (event.action) {
      case 'VIEW':
        this._router.navigate(
          ['/data-elements/client-management/client-details'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'EDIT':
        this._router.navigate(
          ['/data-elements/client-management/client-template'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'ACCESS':
        this._router.navigate(
          ['/data-elements/client-management/client-permission'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'DELETE':
        this.openDeleteConfirmPopup(event?.element?.id);
        break;
    }
  }

  public openDeleteConfirmPopup(id: number): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent);
    this.subscriptions$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteClient(id);
        }
      })
    );
  }

  public deleteClient(id: number): void {
    this.subscriptions$.add(
      this._clientService.delete(id).subscribe((res) => {
        this._toastr.success(
          `Deleted!`,
          `Client has been deleted successfully`
        );
        this.deleteEmitter.emit();
      })
    );
  }

  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.paginateEmitter.emit(event);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
