import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { selectFeatureCategoryCount, selectFeatureProductCount } from 'src/store/selectors/selectors';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  categoryArray: any = [];
  productArray: any = [];

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.updateTable();
  }

  detailsPage(item : any){
    this.router.navigate(['details'],{ queryParams: {productId: item}});
  }

  updateTable(){
    this.store.select(selectFeatureCategoryCount).subscribe(response => {
      this.categoryArray = response;
      if(this.categoryArray == null || this.categoryArray.length == 0) return;
      this.store.select(selectFeatureProductCount).subscribe(response => {
        var data = response.filter( x=> x.categoryId == this.categoryArray[0].id)
        this.productArray = data;
      });
    });
  }

  getProducts(id){
    this.store.select(selectFeatureProductCount).subscribe(response => {
      var data = response.filter( x=> x.categoryId == id)
      this.productArray = data;
    });
  }
}
