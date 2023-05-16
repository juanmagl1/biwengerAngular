import { Component } from '@angular/core';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private auth:AuthService){}
logout(){
  this.auth.logout();
}
}
