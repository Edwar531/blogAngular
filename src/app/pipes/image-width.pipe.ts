import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageWidth'
})
export class ImageWidthPipe implements PipeTransform {

  transform(path: any, width:string = '',imageDefault:string = 'notImage'): string {
    let rep:string;
    if (width.length != 0){
      rep = '-'+width;
    }else{
      rep = '';
    }

    if(path?.length == 0 || path == undefined){
      if(rep == '-xs'){
       return `assets/imagenes/default/${imageDefault}-xs.jpg`;
      }else if(rep == '-sm'){
        return `assets/imagenes/default/${imageDefault}-sm.jpg`;
      }else{
        return `assets/imagenes/default/${imageDefault}.jpg`;
      }

    }else{

      // divide = path.split(.j);
      let index = path.lastIndexOf(".");
      let ext =path.substring(index);
      let newPath = path.replace(ext,rep+ext);
      return newPath;

    }

  }

}
