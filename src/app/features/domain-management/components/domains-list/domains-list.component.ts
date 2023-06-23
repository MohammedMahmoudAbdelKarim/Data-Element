import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { ConfirmPopupComponent } from './../../../../shared/components/confirm-popup/confirm-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { DomainFormComponent } from '../domain-form/domain-form.component';
import { DomainModel } from '../../models/domain.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-domains-list',
  templateUrl: './domains-list.component.html',
})
export class DomainsListComponent implements OnInit {
  @Input() dataSource!: DataSourceModel;
  @Output() paginateEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  public subscriptions$: Subscription = new Subscription();
  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _domainService: DomainService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  public handleAction(event: { action: string; element: any }): void {
    switch (event.action) {
      case 'VIEW':
        this._router.navigate(
          ['/data-elements/domain-management/domain-details'],
          {
            queryParams: { id: event?.element?.id },
          }
        );
        break;
      case 'EDIT':
        this.openDomainForm(event.element);
        break;
      case 'DELETE':
        this.openDeleteConfirmPopup(event?.element?.id);
        break;
    }
  }
  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.paginateEmitter.emit(event);
  }
  public openDeleteConfirmPopup(id: number): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent);
    this.subscriptions$.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteModelGroup(id);
        }
      })
    );
  }
  public deleteModelGroup(id: number): void {
    this.subscriptions$.add(
      this._domainService.delete(id).subscribe(() => {
        this.deleteEmitter.emit(true);
        this._toastr.success(
          `Deleted!`,
          `Domain has been deleted successfully`
        );
      })
    );
  }
  public openDomainForm(event: DomainModel): void {
    const dialogRef = this.dialog.open(DomainFormComponent, {
      data: event,
    });
    this.subscriptions$.add(
      dialogRef.afterClosed().subscribe((isEdit: boolean) => {
        if (isEdit) {
          this.editEmitter.emit(isEdit);
        }
      })
    );
  }
}
