import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidations } from 'src/app/core/validations/custom-validation';
import { ClientFormModel } from '../../models/client-template.model';
import { ClientService } from '../../services/client.service';
import { Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'de-client-form',
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {
  public clientForm!: ClientFormModel;
  public apiWhiteList: string[] = [];
  public emailsList: string[] = [];
  public clientDetails!: ClientModel;
  private _subscription$: Subscription = new Subscription();

  @Output() editEmitter = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _clientService: ClientService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this._route.snapshot.queryParams['id']) {
      this.getClientById(this._route.snapshot.queryParams['id']);
    }
  }

  public initForm(): void {
    this.clientForm = this._fb.group({
      name: this._fb.control<string | null>(null, [
        Validators.required,
        Validators.maxLength(50),
        CustomValidations.disallowedWhiteSpace,
        CustomValidations.disallowedSpecialCharacters,
      ]),
      owners: this._fb.control<string[] | null>(
        [],
        [Validators.required, Validators.email]
      ),
      ipWhitelist: this._fb.control<string[] | null>([], [Validators.required]),
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.clientForm?.controls[controlName];
  }

  public addEmail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    value ? this.emailsList.push(value) : null;
    event.chipInput!.clear();
  }

  public removeEmail(value: string) {
    this.emailsList.includes(value)
      ? this.emailsList.splice(this.emailsList.indexOf(value), 1)
      : null;
  }

  public addIPAddress(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    value ? this.apiWhiteList.push(value) : null;
    event.chipInput!.clear();
  }

  public removeIPAddress(value: string): void {
    this.apiWhiteList.includes(value)
      ? this.apiWhiteList.splice(this.apiWhiteList.indexOf(value), 1)
      : null;
  }

  public getClientById(id: number) {
    this._subscription$.add(
      this._clientService.getByID(id).subscribe((res) => {
        this.clientDetails = res;
        this.patchClientForm(res);
      })
    );
  }

  public patchClientForm(data: ClientModel): void {
    this.clientForm.patchValue({
      name: data?.name,
      owners: data?.owners,
      ipWhitelist: data?.ipWhitelist,
    });
    this.apiWhiteList = data?.ipWhitelist;
    this.emailsList = data?.owners;
  }

  public onSubmit(): void {
    const clientData = this.clientForm.value;
    const request$ = this.clientDetails
      ? this._clientService.update(this.clientDetails.id, clientData)
      : this._clientService.create(clientData);
    this._subscription$.add(
      request$.subscribe(() => {
        const message = this.clientDetails ? 'Updated' : 'Created';
        this._toastr.success(
          `${message}!`,
          `Client has been ${message.toLowerCase()} successfully`
        );
        this._router.navigateByUrl('/data-elements/client-management');
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
