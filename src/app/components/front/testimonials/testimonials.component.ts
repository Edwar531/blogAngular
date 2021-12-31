import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  countVideos = 0;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){


    (function(d, s, id) {
      var js:any, fjs:any = d.getElementsByTagName(s)[0];
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v12.0&appId=201064434390930&autoLogAppEvents=1";


      if (d.getElementById(id)){
        delete (<any>window).FB;
        //if <script id="facebook-jsshttps://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v12.0&appId=440733043264222&autoLogAppEvents=1
        fjs.parentNode.replaceChild(js, fjs);
        (<any>window).fbAsyncInit = function() {
          (<any>window).FB.Event.subscribe("xfbml.render", function() {
              //   oculta loader al cargar comentarios de facebook
              let loader_fc = (<any>document).getElementById('loader-fc').style.display = "none";

          });
      };

      } else {


        fjs.parentNode.insertBefore(js, fjs);
        (<any>window).fbAsyncInit = function() {
          (<any>window).FB.Event.subscribe("xfbml.render", function() {
              //   oculta loader al cargar comentarios de facebook
              let loader_fc = (<any>document).getElementById('loader-fc').style.display = "none";

          });
      };
      }

    }(document, 'script', 'facebook-jssdk'));
  }
}
