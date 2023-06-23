import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSourceModel } from 'src/app/core/models';
import { PermissionService } from '../../services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'de-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  @Input() dataSource!: DataSourceModel;
  @Output() deleteEmitter = new EventEmitter();
  @Output() paginateEmitter = new EventEmitter();

  constructor(
    private _router: Router,
    private _permissionService: PermissionService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public handleAction(event: { action: string; element: any }) {
    switch (event.action) {
      case 'VIEW':
        this._router.navigate(
          ['/data-elements/permissions/permission-details'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'EDIT':
        this._router.navigate(
          ['/data-elements/permissions/permission-template'],
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
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deletePermission(id);
        }
      })
    );
  }

  public deletePermission(id: number): void {
    this._subscription$.add(
      this._permissionService.delete(id).subscribe((res) => {
        this._toastr.success(
          `Deleted!`,
          `Permission has been deleted successfully`
        );
        this.deleteEmitter.emit();
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
