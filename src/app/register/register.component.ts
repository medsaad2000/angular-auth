import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      address:'',
      email: '',
      password: '',
      confirmedPassword:''

    })
  }

  submit(): void{
    
    this.http.post('http://localhost:8083/register',this.form.getRawValue())
    .subscribe(res =>{
      this.router.navigate(['/login']),
      console.log(res);
    })
  }

}
