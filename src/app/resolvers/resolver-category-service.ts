import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { GetCategoryAction } from 'src/store/actions/category.actions';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';

@Injectable()
export class APICategoryResolver implements Resolve<any> {
  private _postCategoryService;
  constructor(private httpClient :HttpClient, @Inject(APP_CONFIG) private config: IAppConfig, private store: Store<AppState>) 
  {
    this._postCategoryService = new PostService(httpClient, config.apiEndpoint, "category/get_all_product_categories");
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._postCategoryService.getAll().subscribe( dto =>{
        this.store.dispatch(new GetCategoryAction(dto));
    });
  }
}