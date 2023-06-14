import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>=this.auth.isLoggedIn;
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }
  title = 'JuegoAngular';
}
