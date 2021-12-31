import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Belizabeth Montilla - Psicóloga';
  schema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Belizabeth Montilla - Psicóloga",
    "url": "https://belizabethmontilla.com",
    "jobTitle": "Psicóloga Clínica - Coach de vida - Quito"
  };

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
    { name: 'keywords', content: 'Belizabeth Montilla, Psicólogo, Coach de vida, Quito,Psicóloga' },
      {name: 'description', content: 'Belizabeth Montilla, Psicólogo, Coach de vida, Quito. Me apasiona el ayudar a las personas a resolver los inconvenientes que aquejan su vida, concentro mis energías...'},
      // {name: 'robots', content: 'index, follow'}
    ]);
  }
}
