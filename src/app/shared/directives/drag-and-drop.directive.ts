import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[deDrag]',
  standalone: true,
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('style.background') private background!: string;

  constructor(private _sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(63,81,181,.4)';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '';
  }
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '';
    let files: FileHandle[] = [];
    if (evt.dataTransfer?.files.length) {
      for (let i = 0; i < evt?.dataTransfer?.files?.length; i++) {
        const file = evt.dataTransfer?.files[i];
        const url = this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        files.push({ file, url });
      }
      if (files.length > 0) {
        this.files.emit(files);
      }
    }
  }
}
