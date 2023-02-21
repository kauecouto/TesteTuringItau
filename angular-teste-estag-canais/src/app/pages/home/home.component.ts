import { Component, OnInit } from '@angular/core';

import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  user!: User
  typeTransfer!: string
  isALiveFormTransfer: boolean = false
  isALiveExtract : boolean = false
  hiddenAccount: boolean = false
  constructor(private  authenticationService :AuthenticationService){}

  ngOnInit(){
    const id = localStorage.getItem('UserID')
    if(id){
      this.authenticationService.getUserByID(id).subscribe(res => this.user = res)
    }
  }

  controlModal(type?: string){
    if(type){
      this.typeTransfer = type
    }
    this.isALiveFormTransfer = !this.isALiveFormTransfer
  }

  controlHiddenBalance(){
    this.hiddenAccount = !this.hiddenAccount
  }

  controlExtract(){
    this.isALiveExtract = !this.isALiveExtract
  }
}

