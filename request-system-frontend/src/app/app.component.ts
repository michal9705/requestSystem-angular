// src/app/app.component.ts
import { Component } from '@angular/core';
import { RequestsListComponent } from './requests-list/requests-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RequestsListComponent],
  template: `<requests-list></requests-list>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'request-system-frontend';
}
