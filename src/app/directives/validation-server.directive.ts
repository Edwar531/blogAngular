import { Directive } from '@angular/core';
import { NG_VALIDATORS , AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ValidationServer(text:any):ValidatorFn{
  return (control: AbstractControl)=>{
    const validationServerDirective:any = new ValidationServerDirective();
    return validationServerDirective.validate(control,text)
  }
}

@Directive({
  selector: '[ValidationServer]',
  providers:[{provide:NG_VALIDATORS, useExisting:ValidationServerDirective,multi:true}]
})

export class ValidationServerDirective {

  constructor() { }

  validate(control: AbstractControl,text:any):any{
    console.log(control);
    if (text) {
      return {test:'probemoooss'}
    }
    return;

  }

}

