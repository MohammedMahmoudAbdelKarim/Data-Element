import { Subscription } from 'rxjs';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { ConfirmPopupComponent } from './../../../../shared/components/confirm-popup/confirm-popup.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataModelService } from '../../services/data-model.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-data-model-list',
  templateUrl: './data-model-list.component.html',
})
export class DataModelListComponent implements OnInit {
  private readonly _subscription$: Subscription = new Subscription();
  @Input() dataSource!: DataSourceModel;
  @Output() deleteEmitter = new EventEmitter();
  @Output() paginateEmitter = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _toastr: ToastrService,
    private _dataModelService: DataModelService
  ) {}

  ngOnInit(): void {}

  public handleAction(event: { action: string; element: any }) {
    switch (event.action) {
      case 'VIEW':
        this._router.navigate(
          ['/data-elements/data-model-management/data-model-details'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'DELETE':
        this.openDeleteConfirmPopup(event?.element?.id);
        break;
      case 'EDIT':
        this._router.navigate(
          ['/data-elements/data-model-management/data-model-template'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
    }
  }

  public openDeleteConfirmPopup(id: number): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent);
    this._subscription$.add(
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.deleteModel(id);
          }
        },
      })
    );
  }

  public deleteModel(id: number): void {
    this._subscription$.add(
      this._dataModelService.delete(id).subscribe({
        next: () => {
          this.deleteEmitter.emit();
          this._toastr.success(
            'Success',
            'Model has been deleted successfully'
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
