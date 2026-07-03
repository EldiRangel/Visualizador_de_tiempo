import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ¡Esto es vital para que las rutas funcionen!
  templateUrl: './app.html', // Asumiendo que tu HTML se llama app.html
  styleUrls: ['./app.css']   // Asumiendo que tu CSS se llama app.css
})
export class AppComponent {
  title = 'visualizador-tiempo';
}