import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const option={
  headers: new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentName:any
  currentUser:any


  constructor(private http:HttpClient) { 
    this.getDetails()
  }

  saveDetails(){
    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.currentName){
      localStorage.setItem('currentName',JSON.stringify(this.currentName))
    }
  }

  getDetails(){
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'')
    }
    if(localStorage.getItem('currentName')){
      this.currentName=JSON.parse(localStorage.getItem('currentName')||'')
    }
  }

  register(fname:any,uname:any,pswd:any){
  const data={
    fname,
    uname,
    pswd
  }
  return this.http.post('http://localhost:3200/register',data)
  }

  login(uname:any,pswd:any){
    const data={
      uname,
      pswd
    }
    console.log();
    return this.http.post('http://localhost:3200/login',data)
  }

  getOption(){
    const token=JSON.parse(localStorage.getItem('token')||'')
    let headers= new HttpHeaders
    if(token){
      headers=headers.append('access-token',token)
      option.headers=headers
    }
return option
  }

  addEvent(uname:any,date:any,event:any){
    const data={
      uname,
      date,
      event
    }
    return this.http.post('http://localhost:3200/addEvent',data,this.getOption())
  }


viewEvent(uname:any){
  const data={
    uname,
  }
  return this.http.post('http://localhost:3200/viewEvent',data,this.getOption())
}
todayEvents(uname:any,date:any){
  const data={
    uname,
    date
  }
  return this.http.post('http://localhost:3200/viewEvent',data,this.getOption())
}
editEvent(uname:any,date:any,event:any){
  const data={
    uname,
    date,
    event
  }
  return this.http.post('http://localhost:3200/editEvent',data,this.getOption())
}

deleteEvent(uname:any,date:any){
  const data={
    uname,
    date
  }
  return this.http.post('http://localhost:3200/deleteEvent',data,this.getOption())
}

}