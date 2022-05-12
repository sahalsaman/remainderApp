import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm=this.fb.group({
    fname:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pswd:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    var fname=this.registerForm.value.fname
    var uname=this.registerForm.value.uname
    var pswd=this.registerForm.value.pswd

    if(this.registerForm.valid){
       this.ds.register(fname,uname,pswd).subscribe((result:any)=>{
         if(result){
           this.router.navigateByUrl("/")
           alert(result.message)
         }
       },result=>{
         alert(result.error.message)
       })
    }else{
      alert("invalid form")
    }
  }

}
