import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {


  constructor(private subService: SubscribersService){}

  EmailStatus : Boolean = false;
  isSubscribe: Boolean = false;

  ngOnInit(): void {

  }

  onSubmit(formVal){

    const subData: Sub =
    {
      name: formVal.name,
      email: formVal.email
    }


    this.subService.checkSubs(subData.email).subscribe(val =>{

      if(val.empty){
        this.isSubscribe = true;
        this.subService.addSubs(subData);
      }else{
        this.EmailStatus = true;
        console.log("Email Address is Already in use");
      }

    })
  }
}
