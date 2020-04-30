[![Build Status](https://travis-ci.com/Ashlook/ash-material-file-input.svg?branch=master)](https://travis-ci.com/Ashlook/ash-material-file-input)
[![Coverage Status](https://coveralls.io/repos/github/Ashlook/ash-material-file-input/badge.svg?branch=master)](https://coveralls.io/github/Ashlook/ash-material-file-input?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Ashlook/ash-material-file-input/badge.svg)](https://snyk.io/test/github/Ashlook/ash-material-file-input)

# ash-material-file-input

This project provides a set of tools to help you add file input into Angular Material forms :

* [`ash-mat-file-input`](#fileinputcomponent) Component, to use inside `mat-form-field`, it supports the optional dropping of file.
* a [`FileValidator`](#filevalidators) with a set of validators to use with formControl.
* an [`ashDrop`](#dropdirective) Directive, to drop files into container of your choice.
* a [`byteFormat`](#byteformatpipe) Pipe, to format the file size to the unit of your choice.

DEMO SITE is under construction

## Install

```
    npm i ash-material-file-input
```
---
## AshFileInputModule

```ts
import { AshFileInputModule } from 'ash-material-file-input';
```

## FileInputComponent

selector : `ash-mat-file-input`  
implements : [MatFormFieldControl](https://material.angular.io/components/form-field/api#MatFormFieldControl)

Supports form field features, error messages, hint, prefix, suffix and appearance. You can also change when error message are shown using a custom `ErrorStateMatcher`.

### Properties

It works with `ngModel` and `formControl` directives.  

`value`: The value of the formControl is the same type ([`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList)) of the `<input type="file">`
 `files` attribute.

| Name                              | Description                                                                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| @Input()<br>placeholder: `string` | Placeholder for file names, empty by default                                                                                                                                                     |
| @Input()<br>accept: `string`      | Same usage as a classic `<input type="file">`                                                                                                                                                    |
| @Input()<br>multiple: `boolean`   | Same usage as a classic `<input type="file">`<br>If not set, add a validator to avoid dropping multiple files with fileDrop                                                                      |
| fileDrop                          | If present, add a container above the filenames where you can drop file (default height 20px).<br>You can customize the inside of the container by adding elements inside `<ash-mat-file-input>` |

### Methods

| `open`                                       |
| :------------------------------------------- |
| Opens the file explorer for the linked input |

| `clear`                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------ |
| Clear the input, removing his value                                                                                                   |
| @param event?: Event -- The event triggering the method <br> If set, the moethod will call `preventDefault()` and `stopPropagation()` |
---
## FileValidators

A set of validators to help you manage `formControl` with value of type `FileList`.

### Usage
```ts
control = new FormControl(null, FileValidators.acceptedExtensions('.jpg,.png'));
```
control will be invalid if file extension is neither `.jpg` or `.png`.

### maxFileSize

Requires each file to be lesser or equal to `maxSize`.

**Parameters** :  
`maxSize: number` - The size max of each file.

**Error structure** :  
```ts
{
    maxSize: {
        max: number,        // Size max defined
        size: string,       // Size of the first file too big
        filename: string,   // name of the file
    }
}
```

### acceptedExtensions

Requires each file extension to match the one of `accepted` extensions.

**Parameters** :  
`accepted: string` - Accepted extensions, separated by a comma (`".jpg,.png"`).

**Error structure** :
```ts
{
    extension: {
        accepted: string,   // List of accepted extensions
        current: string,    // File extension of the first file not matching
        filename: string,   // Name of the file
    }
}
```

### acceptedTypes

Requires each file MIME type to be one of `accepted`.

**Parameters** :  
`accepted: string` - Accepted MIME type, separated by a comma (`"text/plain,image/*"`).

**Error structure** :
```ts
{
    type: {
        accepted: string,   // List of accepted types
        current: string,    // File MIME type of the firs file not matching
        filename: string,   // Name od the file
    }
}
```
---
## DropDirective

selector: `[ashDrop]`

Transform any element into a drop container where you can drop files from file explorer.

### Properties

| Name                                               | Description                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| @Input()<br>dragoverClass?: `string`               | Name of the class to apply on the element when a file is over it.<br>(default: `'ash-dragover'`). |
| @Output()<br>fileDropped: `EventEmitter<FileList>` | Event emitted when file(s) are dropped.                                                           |

---

## Combining DropDirective with FileInputComponent

Alternatively to use `fileDrop` attribute on `<ash-mat-file-input>` you can use any element in your component with the `ashDrop` directive to be the drop container.

```html
<mat-form-field>
    <mat-label>Drop a file in a container anywhere</mat-label>
    <ash-mat-file-input [formControl]="fc"></ash-mat-file-input>
</mat-form-field>
<!-- You can place the next element anywhere you want -->
<mat-card ashDrop (fileDropped)="updateControl($event)">
    Drop your file here
</mat-card>
```
```ts
updateControl(files: FileList) {
    this.fc.patchValue(files);
    this.fc.markAsTouched();
}
```
---
## ByteFormatPipe

format: `{{ number | byteFormat [ : unitSrc [ : unitDest ] ] }}`  

**Parameters** :  
`unitSrc?: string`  - The source unit. Default is `b`.  
`unitDest?: string` - The destination unit. Default is `Mb`. 

It supports unit from Byte (b) to Yottabyte (Yb).

**Examples** :
```html
<span>{{ 104857600 | byteFormat }}</span>           <!-- Output: "100Mb" -->
<span>{{ 102400 | byteFormat:'Kb' }}</span>         <!-- Output: "100Mb" -->
<span>{{ 104857600 | byteFormat:'b':'Kb' }}</span>  <!-- Output: "102400Kb" -->
```