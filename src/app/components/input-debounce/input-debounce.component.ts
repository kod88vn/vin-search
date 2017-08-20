import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-input-debounce',
  templateUrl: './input-debounce.component.html',
  styleUrls: ['./input-debounce.component.less']
})
export class InputDebounceComponent implements OnInit {

  public value: string;
  @Input() placeholder: string;
  @Output() onInputCompleted = new EventEmitter<string>();
  public formControl;

  constructor() { }

  ngOnInit() {
    this.value = '';

    this.formControl = new FormControl('', [
      Validators.required
    ]);
  
    this.formControl.valueChanges
    .debounceTime(1000)
    .subscribe(newValue => {
      this.value = newValue;
      this.onInputCompleted.emit(this.value);
    });
  }

}
