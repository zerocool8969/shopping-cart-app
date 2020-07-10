import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/authentication-service';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../app.config';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  checkOutArray : any = [];
  private _postService;
  constructor(private httpClient: HttpClient, private authService: AuthService, @Inject(APP_CONFIG) private config: IAppConfig) { 
    this._postService = new PostService(httpClient, config.apiEndpoint,"products/get_my_orders")
  }

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    this._postService.getById(id).subscribe(res =>{
        this.checkOutArray = res;
      });
  }
}
