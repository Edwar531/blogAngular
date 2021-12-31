import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() { }

  urlYoutube(control: any) {
    console.log(control);

    if (control?.value) {
      let url = control.value;
      var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(regExp)) {
        return true;
      }
    }

    return {
      urlyoutube:true
    };
  }

  server(control: any): { [s: string]: boolean } {
    return {
      prueba: true
    };

  }
}
