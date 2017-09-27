import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 
import { Injectable } from '@angular/core';

@Injectable()
export class Service{
    BASE_URL: string = 'http://api.fixer.io/';
    
    constructor(public http:Http){
       
    }

    gimmeData(str){
        let obs = this.http.get(this.BASE_URL + str)
            .map(res => res.json());

        return obs;
    }
}