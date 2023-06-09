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
    this.isLoggedIn$ = this.auth.isLoggedIn;
    if(this.isLoggedIn$){
      this.username=localStorage.getItem('username');
    }

  }
logout(){
  this.auth.logout();
}
}
