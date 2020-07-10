import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { GetProductAction } from 'src/store/actions/product.actions';

@Injectable()
export class APIProductResolver implements Resolve<any> {
  private _postProductService;
  constructor(private httpClient :HttpClient, @Inject(APP_CONFIG) private config: IAppConfig, private store: Store<AppState>) 
  {
    this._postProductService = new PostService(httpClient, config.apiEndpoint, "products/get_all_products");
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._postProductService.getAll().subscribe( dto =>{
        this.store.dispatch(new GetProductAction(dto));
    });
  }
}