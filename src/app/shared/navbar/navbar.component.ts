import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  username:string|null=null
constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.isLoggedIn$ = this.auth.isLoggedIn;

  }
logout(){
  this.auth.logout();
}
}
