import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

  user:any
  today: number = Date.now()
  events:any
  uname:any

  EditEvent = this.fb.group({
    // nDate: ["", [Validators.required]],
    uEvent: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.user=JSON.parse(localStorage.getItem('currentName')||'')
    var uname = JSON.parse(localStorage.getItem('currentUser') || '')
    if (uname) {
      this.ds.viewEvent(uname).subscribe((result:any) => {
        if(result){
          // alert(result.events)
          
          this.events=result.events
          // console.log(this.events)
          
        }

      },result=>{
        alert(result.error.message)
      })
    }
  }

  ngOnInit(): void {
  }

  editEvent(date:any){
    var uEvent= this.EditEvent.value.uEvent
    var uname = JSON.parse(localStorage.getItem('currentUser') || '')
     this.ds.editEvent(uname,date,uEvent).subscribe((result:any)=>{
         if(result){
           alert(result.message)
         }
     },result=>{
       alert(result.error.message)
     })
  }

updateEvent(){

}

  deleteEvent(date:any){
    var uname = JSON.parse(localStorage.getItem('currentUser') || '')
    this.ds.deleteEvent(uname,date).subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
  },result=>{
    alert(result.error.message)
  })
  }

    
  

}
