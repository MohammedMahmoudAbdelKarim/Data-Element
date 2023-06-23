import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDirective } from './../../directives/drag-and-drop.directive';
import { FileSizePipe } from './../../pipes/file-size.pipe';
import { FileUploaderComponent } from './file-uploader.component';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DragDirective,
        FileSizePipe,
        FileUploaderComponent,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatFormFieldModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties set correctly', () => {
    expect(component.uploadedFiles).toEqual([]);
    expect(component.allowedUploadedFilesLimit).toBeTrue();
    expect(component.allowedFileSize).toBeTrue();
    expect(component.allowedFilesSize).toBeTrue();
    expect(component.allowedFileType).toBeTrue();
    expect(component.fileNotDuplicated).toBeTrue();
    expect(component.activeFile).toBeUndefined();
    expect(component.deleteFromApi).toBeUndefined();
    expect(component.options).toBeUndefined();
    expect(component.multiple).toBeUndefined();
    expect(component.displayedFiles).toEqual([]);
    expect(component.label).toBe('');
    expect(component.display).toBeFalse();
    expect(component.required).toBeFalse();
  });

  it('should handle file input correctly', () => {
    const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
    const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });
    const fileInputEvent = {
      target: {
        files: [file1, file2],
      },
    };
    spyOn(component, 'resetValidations').and.callThrough();
    spyOn(component, 'handleOptionsValidity').and.returnValue(true);
    spyOn(component.filesList, 'emit');

    component.onHandleFileInput(fileInputEvent.target.files as any);

    expect(component.resetValidations).toHaveBeenCalled();
    expect(component.handleOptionsValidity).toHaveBeenCalledTimes(2);
    expect(component.uploadedFiles).toEqual([file1, file2]);
    expect(component.filesList.emit).toHaveBeenCalledWith([
      ...component.displayedFiles,
      file1,
      file2,
    ]);
  });
});
