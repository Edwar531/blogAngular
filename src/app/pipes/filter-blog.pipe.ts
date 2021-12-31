import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBlog'
})
export class FilterBlogPipe implements PipeTransform {

  transform(items: any[], field: string, value: string, cate: string, valueCate: string,order:string,orderby:string): any[] {
    console.log('EXE');

    if (!items) return [];

    if (!value || value.length == 0) {
      value = '';
    } else {
      value = value.toLowerCase()
    }

    if (!valueCate || valueCate.length == 0) {
      valueCate = '';
    } else {
      valueCate = valueCate.toLowerCase()
    }

    if(value && valueCate){
      items = items.filter(it => it[field].toLowerCase().indexOf(value) != -1 && it[cate].toLowerCase() == valueCate);
    }else if(value){
      items = items.filter(it => it[field].toLowerCase().indexOf(value) != -1);
    }else if(valueCate){
      items = items.filter(it => it[cate].toLowerCase() == valueCate);
    }

    if(orderby == 'recientes'){
      return items.sort(((a, b) => b.id - a.id));
    }else{
      return items.sort(((a, b) => a.id - b.id ));
    }
    // if(orderby == 'recientes'){
    //   return items.sort(((a, b) => <any>new Date(b.datetime) - <any>new Date(a.datetime)));
    // }else{
    //   return items.sort(((a, b) => <any>new Date(a.datetime) - <any>new Date(b.datetime) ));
    // }

  }
}

