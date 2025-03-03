import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../service/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bannerImgs = [
    {
      id: 1,
      img: "./assets/7dcc28ed89760319.webp"
    },
    {
      id: 2,
      img: './assets/9021283f0be266c1.webp'
    },
    {
      id: 3,
      img: './assets/ef637eb93bf1a887.webp'
    },
  
   ];

getCategoriesData: any;
getApplianceProductData: any=[];
getFashionProductData: any=[];

  constructor(private getData:GetDataService) {}

  ngOnInit(): void {
    this.getCategoriesData = this.getData.CategoriesData;

    this.getData.productData.filter((ele:any)=>{
      
      if(ele.pdCategory == 'appliances')
      {
        this.getApplianceProductData.push(ele);
      }
      if(ele.pdCategory == 'fashion')
      {
        this.getFashionProductData.push(ele);
      }
    });
  }



}
