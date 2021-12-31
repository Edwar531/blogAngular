import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  services2: any;
  services: any;

  constructor() {

    // };
    this.services = {
        "terapias-individuales": [

          {parrafos:[
            "La terapia se empezará exteriorizando las emociones o sentimientos que están interfiriendo en la estabilidad personal dentro de todos los contextos en los que se desempeñe. Posteriormente se definirá los objetivos terapéuticos, mismos que se irán alcanzando a través de la modificación de estructuras de pensamiento y de comportamientos. Se trabaja los problemas del aquí y el ahora así como los factores que los han desencadenado y mantienen la conflictiva actual. Podemos buscar apoyo psicológico individual cuando sentimos: desesperanza, tristeza persistente y sin causas representativas, baja autoestima, frustración, nerviosismo, dependencia emocional, impulsividad, irritabilidad, autoagresividad y comportamientos suicidas."
          ]},
          {image:"assets/imagenes/services/terapias individuales lg.jpg"},
          {name:"Terapias Individuales"},
        ],
        "terapias-de-pareja": [

          {parrafos:[
            "Los temas más comunes que se trabajan en pareja son infidelidad, maltrato o violencia doméstica, celos y conflictos con familias políticas. Se realiza orientación para una adecuada separación o divorcio, además cómo manejarlo con los hijos y crisis de adaptación de las diferentes etapas de la familia. La terapia se empezará exteriorizando las emociones o sentimientos que están interfiriendo en la estabilidad personal dentro de todos los contextos en los que se desempeñe. Posteriormente se definirá los objetivos terapéuticos, mismos que se irán alcanzando a través de la modificación de estructuras de pensamiento." ,
            // "Se pretende brindar asesoría a familias poniendo gran énfasis en la concientización de la etapa familiar que atraviesen y cómo aprender a manejar las dificultades coyunturales que estén viviendo, a través de consensos donde se fomente un diálogo amplio y respetuoso. Son espacios en los que podemos desahogarnos, compartir y conversar abiertamente sobre temas que en algún momento se han convertido en problemas. Temas que de una u otra manera no hemos podido salir, que nos hacen sentir atrapados y envueltos en el caos.",
          ]},
          {image:"assets/imagenes/services/terapia de pareja lg.jpg"},
          {name:"Terapias de Pareja"},

        ],
        "terapias-familiares": [
          {parrafos:[
            "Se pretende brindar asesoría a familias poniendo gran énfasis en la concientización de la etapa familiar que atraviesen y cómo aprender a manejar las dificultades coyunturales que estén viviendo, a través de consensos donde se fomente un diálogo amplio, respetuoso y responsable para con los demás miembros de la familia. Son espacios en los que podemos desahogarnos, compartir y conversar abiertamente sobre temas que en algún momento se han convertido en problemas. Temas que de una u otra manera no hemos podido salir, que nos hacen sentir atrapados y envueltos en el caos." ,
            "Las familias definitivamente son el núcleo de la sociedad y hoy en día este núcleo vive múltiples variantes, que intervienen en la mayoría de casos en la estabilidad y por ende la propia tranquilidad. Cuando hablamos de familia debemos tener en cuenta que cada estructura es un mundo diferente y por ende deben aprender a conocer, aceptar y crecer con las diferencias."
          ]},
          {image:"assets/imagenes/services/terapia familiar lg.jpg"},
          {name:"Terapias Familiares"},
        ],
        "terapias-grupales": [
          {parrafos:[
            "Muchas veces las personas pueden sentirse incomprendidas al describir lo que están atravesando, experimentando o viviendo. Las sesiones de psicoterapia grupal surgen como espacios en los que puedes expresarte libremente, alrededor de personas con problemas similares que intentan encontrar una salida a sus conflictos, problemas emocionales, conductuales, entre otros. La terapia grupal es el complemento perfecto de un tratamiento psicológico individual, de pareja o familiar." ,
            "La retroalimentación de los participantes puede proporcionarte respuestas, herramientas y alternativas de solución a situaciones que probablemente consideraste imposibles de resolver, además de sentirte cerca de vidas que han palpado de cerca el sufrimiento, la falta de empatía, el rechazo y la sensación de ser distinto o diferente."
          ]},
          {image:"assets/imagenes/services/terapias grupales lg.jpg"},
          {name:"Terapias Grupales"},
        ],

      }

  }

  get(text:string){
    return this.services[text];
  }

}
