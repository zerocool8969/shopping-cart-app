import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './services/authGuard-service';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuardForUser } from './services/auth-guard-service';
import { APICategoryResolver } from './resolvers/resolver-category-service';
import { APIProductResolver } from './resolvers/resolver-product-service';


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"shop", component: ShopComponent, resolve: { categories: APICategoryResolver, products: APIProductResolver  }},
  {path:"addProduct", component: ProductsComponent, canActivate: [AuthGuard],
  resolve: { categories: APICategoryResolver, products: APIProductResolver  }},
  {path:"addCategory", component: ProductCategoriesComponent, canActivate: [AuthGuard],
  resolve: { categories: APICategoryResolver }},
  {path:"details", component: DetailsComponent,
  resolve: { categories: APICategoryResolver, products: APIProductResolver  }},
  {path:"checkout", component: CheckoutComponent},
  {path:"orders", component: OrdersComponent, canActivate: [AuthGuardForUser]},
  {path:"**", redirectTo:"shop"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent, RegisterComponent, ShopComponent, ProductsComponent, ProductCategoriesComponent, DetailsComponent, CheckoutComponent, OrdersComponent]