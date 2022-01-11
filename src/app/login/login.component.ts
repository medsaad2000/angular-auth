import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  headers:HttpHeaders
  constructor(private formBuilder: FormBuilder , private http : HttpClient , private router: Router) { 
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:'',
      password:''
    });
  }

  setCookie(name:any,value:any,days:any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

  submit(): void{
    
     this.http.post('http://localhost:8083/login',this.form.getRawValue(),{observe : 'response'}).subscribe(res =>{
      
      this.router.navigate(['/']),
      console.log(res.headers.get('Authorization'));
      sessionStorage.setItem('Authorization',String(res.headers.get("Authorization"))),
      sessionStorage.setItem('username',String(this.form.getRawValue().username)),
      this.setCookie('Authorization',res.headers.get("Authorization"),12)
      
    })
  }

}
