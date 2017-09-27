import { NavController, NavParams, Platform } from 'ionic-angular';
import {Component} from '@angular/core';
import { HomePage } from '../home/home';
@Component({
    selector: 'page-currency',
    templateUrl: 'currency.html',

})

export class CurrencyPage{
    tileWidth: number = 50;


   
    
    constructor(public nc:NavController, public np:NavParams, public platform: Platform){
        // elkéred a width-et, kiszámolod egy rész szélességét
        var w=platform.width();

        this.tileWidth = this.calculateDaTileSizeMahNigga(w);
    }

    dollar(){
        this.nc.push(HomePage,{id: '?base=USD'});
    }
    euro(){
        this.nc.push(HomePage,{id: '?base=EUR'});
    }
    rubel(){
        this.nc.push(HomePage,{id: '?base=RUB'});
    }
    yen(){
        this.nc.push(HomePage,{id: '?base=JPY'});
    }
    forint(){
        this.nc.push(HomePage,{id: '?base=HUF'});
    } 
    pound(){
        this.nc.push(HomePage,{id: '?base=GBP'});
    }


    calculateDaTileSizeMahNigga(w) : number{
        let thisDaResult_Yo = ((w-32)/2)-23.5;
        console.log(thisDaResult_Yo);
        return thisDaResult_Yo;
    }
}