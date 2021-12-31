import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationsMessage'
})
export class ValidationsMessagePipe implements PipeTransform {

  transform(error: any): string {


    if (error?.required) {
      return 'Este campo es requerido.';
    } else if (error?.boolean) {
      return 'Este campo debe ser verdadero o falso.';
    } else if (error?.file) {
      return 'Este campo debe ser un archivo.';
    } else if (error?.image) {
      return 'Este campo debe ser una imagen.';
    } else if (error?.min) {
      return 'Este campo debe tener almenos: ' + error.min.min + ' caracateres.';
    } else if (error?.max) {
      return 'Este campo debe tener almenos: ' + error.max.max + ' caracateres.';
    } else if (error?.maxlength) {
      return 'arreglar este';
    } else if (error?.minlength) {
      return 'Este campo debe tener almenos: ' + error?.minlength.requiredLength + ' caracateres.';
    } else if (error?.number) {
      return 'Este campo debe ser un número.';
    } else if (error?.email) {
      return 'La dirección de correo es invalida.';
    } else if (error?.urlyoutube) {
      return 'La dirección url de youtube es incorrecta.';
    } else {
      return 'Formato de texto inválido para este campo.';
    }
  }

}
