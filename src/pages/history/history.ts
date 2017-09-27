import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Service } from '../../service/service';



@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
    data;
    dataArray;
    baseCurrency;
    valuesPerMonth:number[] = new Array();
    hundredPercent;
    onePercent;
    w;
    h;
    positionXArray:number[] = new Array();
    positionYArray:number[] = new Array();
    lastYear:number;
    myDate:number;
    thisisit:string[]=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

    @ViewChild('canvas') canvasEl:ElementRef;

    private _CANVAS:any;
    private _CONTEXT:any;
    
 
    constructor(public nc:NavController, public np:NavParams, public service:Service, public platform:Platform){
        let d = new Date().getFullYear();
        this.lastYear=d-1;
        this.data=this.np.get('id');
        this.dataArray=this.data.split(" =");

        this.baseCurrency=this.np.get('baseID');
        
       /* for(let j=1;j<10;j++){
          this.service.gimmeData('2010-0'+j+'-01'+this.baseCurrency).subscribe(
              response => {
              
              
                console.log(response.rates[this.dataArray[0]]);
                for(let i=j-1;i<9;i++){
                  this.valuesPerMonth[i]=response.rates[this.dataArray[0]];
                  console.log(this.valuesPerMonth[i]);
                }  
                },
                error => {
                console.log(error);
              }
            );
          }for(let i=10;i<13;i++){
            this.service.gimmeData('2010'+'-'+i+'-01'+this.baseCurrency).subscribe(
              response => {
              
                console.log(response.rates[this.dataArray[0]]);
                for(let y=i-1;y<12;y++){
                  this.valuesPerMonth[y]=response.rates[this.dataArray[0]];
                  console.log(this.valuesPerMonth[i]);
                }  
                },
                error => {
                console.log(error);
              }
            );
          }*/
        console.log(this.dataArray[0]+this.baseCurrency);
        
        this.w=this.platform.width();
        this.h=this.platform.height(); 
    }

    stringMyBitchUp():void{
      var datStr;
      if(this.myDate!=undefined){
        datStr=this.myDate.toString();
      }else{datStr='2000';}
      for(let j=1;j<10;j++){
        this.service.gimmeData(datStr+'-0'+j+'-01'+this.baseCurrency).subscribe(
            response => {
            
              /*for(let j in response.rates){
              this.givenData.push(j+" = "+response.rates[j]);
              }*/
              console.log(response.rates[this.dataArray[0]]);
              for(let i=j-1;i<9;i++){
                this.valuesPerMonth[i]=response.rates[this.dataArray[0]];
                console.log(this.valuesPerMonth[i]);
              }  
              },
              error => {
              console.log(error);
            }
          );
        }for(let i=10;i<13;i++){
          this.service.gimmeData(datStr+'-'+i+'-01'+this.baseCurrency).subscribe(
            response => {
            
              /*for(let j in response.rates){
              this.givenData.push(j+" = "+response.rates[j]);
              }*/
              console.log(response.rates[this.dataArray[0]]);
              for(let y=i-1;y<12;y++){
                this.valuesPerMonth[y]=response.rates[this.dataArray[0]];
                console.log(this.valuesPerMonth[i]);
              }  
              },
              error => {
              console.log(error);
            }
          );
        }
      
        
      
    }

    ionViewDidLoad(): void{
      this._CANVAS = this.canvasEl.nativeElement;
      this._CANVAS.width=this.w;
      this._CANVAS.height=this.h/1.5;
      this.initializeCanvas();
      
     
    }

    initializeCanvas():void{
      if(this._CANVAS.getContext)this.setupCanvas();
    }

    drawCoordinate(w,h){
      let ctx=this._CONTEXT;
      let ww=w*0.07;
      
      ctx.beginPath();
      
      ctx.moveTo(w*0.01, h*0.1);
      ctx.lineTo(w*0.01, h*0.8);
    
      ctx.lineTo(w,h*0.8);

      for(let c=0;c<12;c++){
      ctx.moveTo(ww+(ww*c),h*0.8);
      ctx.lineTo(ww+(ww*c),h*0.82)
      ctx.fillStyle="black";
      ctx.fillText(this.thisisit[c],(ww+(ww*c)),h*0.83);
      }
      
      ctx.stroke();

    }

    visualize():void{
      
      this.clearCanvas();
      //this.stringMyBitchUp();
      let c = this._CONTEXT;
      let ix = this._CANVAS.width*0.07;      
      c.beginPath();
      for(let j=0;j<this.valuesPerMonth.length;j++){
      var xpos=ix+(ix*j);
      c.moveTo(xpos,this.yposition(this.valuesPerMonth[j]));
      c.arc(xpos,this.yposition(this.valuesPerMonth[j]) ,5, 0,Math.PI*2,true);
      this.positionXArray[j]=xpos;
      this.positionYArray[j]=this.yposition(this.valuesPerMonth[j]);
      console.log("yposition "+this.yposition(this.valuesPerMonth[j].valueOf())+" "+this.largestNumber(this.valuesPerMonth));
      }
      c.lineWidth=2;
      c.strokeStyle='#000000';
      c.fillStyle="black";
      c.fill();
      this.bezierConnection(this.positionXArray,this.positionYArray,c);
      
      
    }
    bezierConnection(ix,iy,c):void{
      c.beginPath();
      for(let f=0;f<12;f++){
      c.moveTo(ix[f],iy)
      c.quadraticCurveTo(ix[f],iy[f],ix[f],iy[f]);
      }
      c.stroke();
    }
    

    setupCanvas():void{
      this._CONTEXT=this._CANVAS.getContext('2d');
      this._CONTEXT.fillStyle='lightblue';
      this._CONTEXT.fillRect(0,0,this.platform.width(),this.platform.height());
      this.drawCoordinate(this._CANVAS.width,this._CANVAS.height);
      
    }

    clearCanvas():void{
      this._CONTEXT.clearRect(0,0,this._CANVAS.width, this._CANVAS.height);
      this.setupCanvas();
    }

    largestNumber(tmb):number{
      let n = Math.max.apply(Math,tmb);
      console.log(`MAX = ${n}`);
      return n;
    }

    lowestNumber(tmb):number{
      return Math.min.apply(Math,tmb);
    }

    yposition(i):number{
      let max = this.largestNumber(this.valuesPerMonth);
      let min = this.lowestNumber(this.valuesPerMonth);
      let maxPosY=30;
      let minPosY=(this.h/1.5)*0.8;
      let interval=max-min;
      let a=i-min;
      let b=a/(interval/100);
      if(i<max&&i>min){
        return (minPosY*(b/100));
      }else if(i==max){
        return maxPosY;
      }else if(i==min){
        return minPosY;
      }

    }

    writeShitonScreen():void{
      let c=this._CONTEXT;
      c.beginPath();
     let gradient = c.createLinearGradient(0, 0, this._CANVAS.width, 0);
     gradient.addColorStop("0", "magenta");
     gradient.addColorStop("0.5", "green");
     gradient.addColorStop("1.0", "red");
     c.fillStyle = gradient;
     c.font="50px";
      for(let x=0;x<12;x++){
      
      c.fillText(this.valuesPerMonth[x],this.positionXArray[x]
        ,this.positionYArray[x]);
      }
    }
    
}
