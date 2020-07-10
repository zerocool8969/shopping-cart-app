import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from './services/cart-services';
import { AuthService } from './services/authentication-service';
import { AuthGuard } from './services/authGuard-service';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuardForUser } from './services/auth-guard-service';
import { StoreModule } from '@ngrx/store';
import { CategoryReducer } from 'src/store/reducers/category.reducers';
import { APICategoryResolver } from './resolvers/resolver-category-service';
import { PostService } from './services/post.service'
import { DataService } from './services/data-service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { HttpErrorInterceptor } from './interceptors/httpError-interceptor';
import { AppConfig, APP_CONFIG } from './app.config';
import { APIProductResolver } from './resolvers/resolver-product-service';
import { ProductReducer } from 'src/store/reducers/product.reducers';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ShopComponent,
    DetailsComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      category : CategoryReducer,
      product : ProductReducer
    })
  ],
  providers: [APICategoryResolver, APIProductResolver, CartService, 
    AuthService, AuthGuard, AuthGuardForUser,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }, PostService, DataService,
    { provide: APP_CONFIG, useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
