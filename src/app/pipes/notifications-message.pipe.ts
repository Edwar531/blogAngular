import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationsMessage'
})
export class NotificationsMessagePipe implements PipeTransform {

  transform(text: any): string {

    if (text == 'success') {
      return 'La petición ha sido realizada con éxito';
    } else {
      return 'message no encontrado';
    }
  }

}
