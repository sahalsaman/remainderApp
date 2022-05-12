import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=this.fb.group({
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pswd:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    var uname=this.loginForm.value.uname
    var pswd=this.loginForm.value.pswd

    if(this.loginForm.valid){
       this.ds.login(uname,pswd).subscribe((result:any)=>{
         if(result){
          //  alert(result.message)
           localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
           localStorage.setItem('currentName',JSON.stringify(result.currentName))
           localStorage.setItem('token',JSON.stringify(result.token))
           this.router.navigateByUrl("dashBoard")
         }
       },result=>{
         alert(result.error.message)
       })
    }else{
      alert("invalid form")
    }
  }

}
