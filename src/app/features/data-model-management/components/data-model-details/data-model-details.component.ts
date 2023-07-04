import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldFormComponent } from '../fields/field-form/field-form.component';
import { Subscription } from 'rxjs';
import { FieldModel } from '../../models/fields.model';
import { DataModelService } from '../../services/data-model.service';
import { ActivatedRoute } from '@angular/router';
import { DataModelFormDataModel } from '../../models/data-model.model';

@Component({
  selector: 'de-data-model-details',
  templateUrl: './data-model-details.component.html',
})
export class DataModelDetailsComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public modelId!: number;
  public modelDetails!: DataModelFormDataModel;
  @Input() fieldList!: FieldModel[];

  constructor(
    public dialog: MatDialog,
    private _dataModelService: DataModelService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.modelId = +this._route.snapshot.queryParams['id'];
    this.getDataModelDetails();
  }

  public getDataModelDetails() {
    this._subscription$.add(
      this._dataModelService.getByID(this.modelId).subscribe({
        next: (res) => {
          this.modelDetails = res;
        },
      })
    );
  }

  public onCreateNewField(): void {
    const dialogRef = this.dialog.open(FieldFormComponent);
    this._subscription$.add(
      dialogRef.afterClosed().subscribe({
        next: (isCreated: boolean) => {
          if (isCreated) {
            this.getDataModelDetails();
          }
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
