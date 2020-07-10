import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryDto} from '../models/categoryDto'
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { AddCategoryAction, DeleteCategoryAction } from 'src/store/actions/category.actions';
import { selectFeatureCategoryCount } from 'src/store/selectors/selectors';
import { APP_CONFIG, IAppConfig, AppConfig } from '../app.config';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  private _addPostService;
  private _deletePostService;

  productCategoryForm = new FormGroup({
    categoryName: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    categoryDescription: new FormControl('',[Validators.maxLength(250)])
  });
  
  submitted = false;
  dataArray: any = [];

  constructor(private httpClient: HttpClient, private store: Store<AppState>, @Inject(APP_CONFIG) private config: IAppConfig) 
  { 
    this._addPostService = new PostService(httpClient, config.apiEndpoint, "category/add_category");
    this._deletePostService = new PostService(httpClient, config.apiEndpoint, "category/delete_category_by_category_id");
  }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){

    this.store.select(selectFeatureCategoryCount).subscribe(res =>{
      this.dataArray = res;
    });
  }

  addCategory(form: any){
    this.submitted = true;
    if(form.invalid){
      return;
    }
    
    var dto: CategoryDto = {
      id : 0,
      name: form.controls["categoryName"].value,
      description: form.controls["categoryDescription"].value
    }
    
    this._addPostService.create(dto).subscribe( (response : CategoryDto)  =>{
      this.store.dispatch(new AddCategoryAction(response));
    });
  }

  deleteCategory(id: string){
    this._deletePostService.deleteById(id).subscribe( response =>{
      this.store.dispatch(new DeleteCategoryAction(Number(id)));
    });
  }

  get f(){
    return this.productCategoryForm.controls;    
  }
}
