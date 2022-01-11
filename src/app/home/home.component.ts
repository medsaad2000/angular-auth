import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
message = ""
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("Authorization")!=null){
      this.http.get(`http://localhost:8083/users/${sessionStorage.getItem("username")}`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem("Authorization")}`}}).subscribe(
        (res:any)=>{
          console.log(res);
          this.message = `Hi ${res.username}`;
          Emitters.authEmitter.emit(true);
        },
        err => {
          console.log(err);
          this.message = "You are not logged in"
        }
      )
    }else{
      this.router.navigate(['/login']);
      Emitters.authEmitter.emit(false);
    }

  }

}
