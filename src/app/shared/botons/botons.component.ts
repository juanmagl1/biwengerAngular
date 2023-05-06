import { Component } from '@angular/core';

@Component({
  selector: 'app-botons',
  templateUrl: './botons.component.html',
  styleUrls: ['./botons.component.css']
})
export class BotonsComponent {
botones!:[
  {
    nombre: "Mercado",
    ruta:"/jugadores"
  }
];
}
