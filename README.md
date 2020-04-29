[![Build Status](https://travis-ci.com/Ashlook/ash-material-file-input.svg?branch=master)](https://travis-ci.com/Ashlook/ash-material-file-input)
[![Coverage Status](https://coveralls.io/repos/github/Ashlook/ash-material-file-input/badge.svg?branch=master)](https://coveralls.io/github/Ashlook/ash-material-file-input?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Ashlook/ash-material-file-input/badge.svg)](https://snyk.io/test/github/Ashlook/ash-material-file-input)

# ash-material-file-input

This project provides a set of tools to help you add file input into Angular Material forms :

* `ash-mat-file-input` Component, to use inside `mat-form-field`, it supports the optional dropping of file.
* a `FileValidator` with a set of validators to use with formControl.
* an `ashDrop` Directive, to drop files into container of your choice.
* a `byteFormat` Pipe, to format the file size to the unit of your choice.

DEMO SITE is under construction

## Install

NOT PUBLISHED YET
<!-- ```
    npm i ash-material-file-input
``` -->

## Usage

### AshFileInputModule

```ts
import { AshFileInputModule } from 'ash-material-file-input';
```

### FileInputComponent

selector : `ash-mat-file-input`  
implements : [MatFormFieldControl](https://material.angular.io/components/form-field/api#MatFormFieldControl)

It supports form field features, error messages, hint, prefix, suffix and appearance. You can also change when error message are shown using a custom `ErrorStateMatcher`.

**Attributes**

It works with `ngModel` and `formControl` directives.  

`value`: The value of the formControl is the same type ([`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList)) as the `<input type="file">`
 `files` attribute.

| Name | Description |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @Input()<br>placeholder: string | Placeholder for file names, empty by default |
| @Input()<br>accept: string | Same usage as a classic `<input type="file">` |
| @Input()<br>multiple: boolean | Same usage as a classic `<input type="file">`<br>If not set, add a validator to avoid dropping multiple files with fileDrop |
| fileDrop | If present, add a container above the filenames where you can drop file (default height 20px).<br>You can customize the inside of the container by adding elements inside `<ash-mat-file-input>` |

**Method**

| `open` |
|--------|
| Opens the file explorer for the linked input |

| `clear`|
|--------|
| Clear the input, removing his value |
| @param event?: Event -- The event triggering the method |

### FileValidator

A set of validators 