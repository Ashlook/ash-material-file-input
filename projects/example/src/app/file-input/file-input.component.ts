import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileValidators } from 'ash-material-file-input';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  get basicCode() {
    return `    <mat-form-field>
        <mat-label>Click me to chose a file</mat-label>
        <ash-mat-file-input></ash-mat-file-input>
        <mat-icon color="accent" matSuffix>publish</mat-icon>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Drop a file in the container</mat-label>
        <ash-mat-file-input fileDrop>
            <label dropLabel class="example-label">
                <mat-icon color="accent">publish</mat-icon> Custom label
            </label>
        </ash-mat-file-input>
    </mat-form-field>`;
  }

  fc = new FormControl(null, FileValidators.FileExtOk('.io'));

  constructor() { }

  ngOnInit(): void {
  }

}
