import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


   
  
  constructor(private dataStorage: DataStorageService, private router: Router) {}

  getCartData: any;
  storeCartArray:any=[];
  totalAmout: number=0;
  totalCart: number=0;

  ngOnInit(): void {
    this.getCartData = this.dataStorage.getCartData();
    this.totalCart = this.getCartData ? this.getCartData.length : 0;
      this.getCartData.filter((ele:any)=>{
        this.totalAmout = ele.price * ele.plusMinusCounter + this.totalAmout;
  });
  
  }

  removeCart(data: any) {
    this.totalAmout= 0;
    localStorage.removeItem('cart-data');
    this.storeCartArray=[];
    this.getCartData.filter((ele:any)=>{
      if(ele.pdId != data.pdId)
      {
         this.storeCartArray.push(ele);
         this.totalAmout = ele.pdPrice + this.totalAmout;
      }
    });
      
    this.dataStorage.storeCartData(this.storeCartArray);
    this.getCartData =this.dataStorage.getCartData();
    this.totalCart = this.getCartData.length;
  }

  plusMinusCount(data:any,type: any){
    
    this.storeCartArray=[];
    var plusMinusValue = data.plusMinusCounter;
    this.totalAmout=0;
    if(type== 'minus')
    {
      let minusCOunt = plusMinusValue - 1;
      this.getCartData.filter((ele:any)=> {
        if(data.pdId == ele.pdId){
             
          ele['plusMinusCounter'] = minusCOunt;

        }
        this.totalAmout = ele.pdPrice * ele.plusMinusCounter + this.totalAmout
      });

      this.storeCartArray = this.getCartData;
      this.dataStorage.storeCartData(this.storeCartArray);
      this.getCartData = this.dataStorage.getCartData();
    }
      
    if(type=='plus')
      {
        let plusCOunt = plusMinusValue  + 1;
        this.getCartData.filter((ele:any)=> {
          if(data.pdId == ele.pdId){
               
            ele['plusMinusCounter'] = plusCOunt;
  
          }
          
          this.totalAmout = ele.pdPrice * ele.plusMinusCounter + this.totalAmout;
        });
  
        this.storeCartArray = this.getCartData;
        this.dataStorage.storeCartData(this.storeCartArray);
        this.getCartData = this.dataStorage.getCartData();
      }

  }
  orderClick() {
    
    localStorage.removeItem('cart-data');
    this.router.navigate(['/']);

  }

}
