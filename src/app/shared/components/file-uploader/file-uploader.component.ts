import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DragDirective } from './../../directives/drag-and-drop.directive';
import { MatIconModule } from '@angular/material/icon';
import { FileSizePipe } from './../../pipes/file-size.pipe';
import { CommonModule } from '@angular/common';
import { FileUploadOptions } from './../../models/uploader-options.model';
import { DocumentFile } from './../../models/document-file.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'de-file-uploader',
  templateUrl: './file-uploader.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FileSizePipe,
    MatIconModule,
    DragDirective,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
  ],
})
export class FileUploaderComponent {
  public uploadedFiles: File[] = [];
  public allowedUploadedFilesLimit: boolean = true;
  public allowedFileSize: boolean = true;
  public allowedFilesSize: boolean = true;
  public allowedFileType: boolean = true;
  public fileNotDuplicated: boolean = true;
  public activeFile?: DocumentFile;
  @Input() deleteFromApi?: boolean;
  @Input() options?: FileUploadOptions;
  @Input() multiple?: boolean;
  @Input() displayedFiles: DocumentFile[] = [];
  @Input() label: string = '';
  @Input() display: boolean = false;
  @Input() required: boolean = false;
  @Output() filesList = new EventEmitter();
  @Output() downloadEmitter = new EventEmitter();
  @Output() removeDisplayedFile = new EventEmitter();
  @Output() removeUploadedFile = new EventEmitter();
  constructor() {}
  ngOnChanges() {
    if (this.displayedFiles?.length) {
      this.uploadedFiles = [];
    }
  }
  ngOnInit(): void {}
  public onHandleFileInput(files: FileList): void {
    this.resetValidations();
    Object.keys(files).forEach((key: any) => {
      if (this.handleOptionsValidity(files[key])) {
        this.uploadedFiles.push(files[key]);
      }
    });
    let uploadFiles = this.displayedFiles.concat(this.uploadedFiles);
    this.filesList.emit(uploadFiles);
  }
  public handleOptionsValidity(file: File): boolean {
    this.fileNotDuplicated = this.checkFileExistence(file);
    this.allowedUploadedFilesLimit = this.options?.maxFilesLimit
      ? this.checkUploadedFilesLimit()
      : true;
    this.allowedFileSize = this.checkFileSize(file);
    this.allowedFilesSize = this.checkFilesSize(file);
    this.allowedFileType = this.checkFileType(file);
    return (
      this.fileNotDuplicated &&
      this.allowedUploadedFilesLimit &&
      this.allowedFileSize &&
      this.allowedFileType &&
      this.allowedFilesSize
    );
  }
  public checkUploadedFilesLimit(): boolean {
    return this.options?.maxFilesLimit
      ? this.uploadedFiles.length + this.displayedFiles.length <
          this.options?.maxFilesLimit
      : false;
  }
  public checkFileSize(file: File): boolean {
    return this.options?.maxFileSize
      ? file.size / 1024 / 1024 <= this.options?.maxFileSize
      : false;
  }
  public checkFilesSize(file: File): boolean {
    let filesSize = this.uploadedFiles?.reduce(
      (prev, curr) => prev + curr.size / 1024 / 1024,
      file.size / 1024 / 1024
    );
    return this.options?.maxFilesSize
      ? filesSize <= this.options.maxFilesSize
      : true;
  }
  public checkFileType(file: File): boolean {
    let fileName = file?.name?.split('.').pop()?.toLowerCase();
    return this.options?.allowedExtensions
      ? this.options?.allowedExtensions.includes(fileName ? '.' + fileName : '')
      : false;
  }
  public checkFileExistence(file: File): boolean {
    return (
      this.uploadedFiles.findIndex(
        ($file) =>
          file.name === $file?.name &&
          file.size === $file?.size &&
          file.lastModified === $file?.lastModified
      ) === -1
    );
  }
  public resetValidations(): void {
    this.fileNotDuplicated =
      this.allowedUploadedFilesLimit =
      this.allowedFileSize =
      this.allowedFileType =
        true;
  }
  public onDeleteDisplayedFile($file: DocumentFile): void {
    if (this.deleteFromApi) {
      this.removeDisplayedFile.emit($file);
      return;
    }
    this.resetValidations();
    const INDEX = $file?.id
      ? this.displayedFiles.findIndex(
          (file) => file.name === $file.name && file.id === $file.id
        )
      : this.displayedFiles.findIndex((file) => file.name === $file.name);
    this.displayedFiles.splice(INDEX, 1);
    let uploadFiles = this.displayedFiles.concat(this.uploadedFiles);
    this.allowedFileSize = true;
    this.allowedFilesSize = true;
    this.allowedFileType = true;
    this.fileNotDuplicated = true;
    this.filesList.emit(uploadFiles);
    this.removeDisplayedFile.emit($file);
  }
  public onDeleteUploadedFile($file: File): void {
    this.resetValidations();
    const INDEX = this.uploadedFiles.findIndex(
      (file) => file.name === $file.name && file.size === $file.size
    );
    this.uploadedFiles.splice(INDEX, 1);
    let uploadFiles = this.displayedFiles.concat(this.uploadedFiles);
    this.allowedFileSize = true;
    this.allowedFilesSize = true;
    this.allowedFileType = true;
    this.fileNotDuplicated = true;
    this.filesList.emit(uploadFiles);
  }
  public trackByFun(index: number): number {
    return index;
  }
  public filesDropped(file: any): void {
    if (this.handleOptionsValidity(file[0]['file'])) {
      this.uploadedFiles.push(file[0]['file']);
    }
  }
}
