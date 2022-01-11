import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
          this.authenticated=auth;
      }
    );
  }

  logout(): void{

      this.authenticated=false,
         sessionStorage.removeItem("Authorization"),
        sessionStorage.removeItem("username")
      // this.http.post('http://localhost:8083/logout',{headers:{'Authorization': `Bearer ${sessionStorage.getItem("Authorization")}`}}).subscribe(
      //   ()=>{this.authenticated=false,
      //   sessionStorage.removeItem("Authorization"),
      //   sessionStorage.removeItem("username")
      //   }
      // )
  }

}
