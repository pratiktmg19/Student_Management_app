import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppUploadComponent,
      multi: true
    }
  ]
})

export class AppUploadComponent implements ControlValueAccessor {

  onChange : Function;

  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
    
  }

  writeValue(value: null){

    this.host.nativeElement.value = '';
    this.file = null;

  }


  registerOnChange(fn:Function){
    this.onChange = fn;
    // console.log("2");
    // console.log( this.onChange);

  }

  registerOnTouched(fn:Function){

  }

}
