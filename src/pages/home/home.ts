import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../service/service';
import { HistoryPage } from '../history/history';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 
  
 givenData: any[] = new Array();
 baseCurrency: any;
 title: any;
 

  constructor(public nc: NavController, public np:NavParams, public service:Service) { 
    
    this.baseCurrency=this.np.get('id');
    this.service.gimmeData('latest'+this.baseCurrency).subscribe(
      response => {

        this.title=response.base;
      
        for(let j in response.rates){
        this.givenData.push(j+" = "+response.rates[j]);
        }
        console.log(this.baseCurrency);  
        },
        error => {
        console.log(error);
      }
    );
    
  }

  toHistory(str){
    this.nc.push(HistoryPage,{baseID: this.baseCurrency,id: str});
}
  
  

}

