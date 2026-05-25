import { Component } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NotificationComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notificationHubAPP';
}
