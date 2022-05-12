import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  today: number = Date.now()
  todayEvent:any
  user: any
  uname: any
  events:any
  vEvent:any

  EventAdd = this.fb.group({
    nDate: ["", [Validators.required]],
    nEvent: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  eventView = this.fb.group({
    sDate: ["", [Validators.required]],
  })

  constructor(private fb: FormBuilder, private ds: DataService,private router:Router) {
    this.user = JSON.parse(localStorage.getItem('currentName') || '')
  //  this.todayEvents()
  // console.log("today: "+this.today)
  }


  ngOnInit(): void {
  }
  addEvent() {
    var nDate = this.EventAdd.value.nDate
    var nEvent = this.EventAdd.value.nEvent
    var uname = JSON.parse(localStorage.getItem('currentUser') || '')
    if (this.EventAdd.valid) {
      this.ds.addEvent(uname, nDate, nEvent).subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }
      }, result => {
        alert(result.error.message)
      })
    } else {
      alert("invalid Add Event form")
    }
  }

  viewEvent() {
    var sDate = this.eventView.value.sDate
    var uname = JSON.parse(localStorage.getItem('currentUser') || '')
    if (this.eventView.valid) {
      this.ds.viewEvent(uname).subscribe((result:any) => {
        if(result){
          // alert(result.events)
          
          this.events=result.events
          // console.log(this.events)
          for(let e of this.events){
            if(sDate==e.date){
              this.vEvent=e.event
            }
          }
        }

      },result=>{
        alert(result.error.message)
      })
    }
  }

  logout(){
    localStorage.removeItem('currentName')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  


todayEvents(){
  var sDate = this.today
  var uname = JSON.parse(localStorage.getItem('currentUser') || '')
  if (this.eventView.valid) {
    this.ds.todayEvents(uname, sDate).subscribe((result:any) => {
      if(result){
        // alert(result.events)
        this.events=result.events
        // console.log(this.events)
        for(let e of this.events){
          if(sDate==e.date){
            this.todayEvent=e.event
          }
        }
      }

    },result=>{
      alert(result.error.message)
    })
  }
}

}
