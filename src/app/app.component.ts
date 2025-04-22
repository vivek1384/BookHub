import { Component } from '@angular/core';
import { HeaderComponent } from "./compo/header/header.component";
import { FooterComponent } from "./compo/footer/footer.component";



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'BookHub';
}
