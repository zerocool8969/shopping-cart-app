import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../services/cart-services';
import { CartDto } from '../models/cart-model';
import { AuthService } from '../services/authentication-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CheckOutDto } from '../models/checkout-model';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  submitted = false;
  cartTotal = 0;
  shippingPrice = 10;
  finalPrice = 0;
  isAllowedToCheckout = false;
  checkOutArray : CartDto[] = [];

  private _postService;

  constructor(private httpClient: HttpClient, private cartService: CartService, private authService: AuthService, @Inject(APP_CONFIG) private config: IAppConfig) 
  {
    this._postService = new PostService(httpClient, config.apiEndpoint, "checkout/checkout" );
  }
  
  productForm = new FormGroup({
    address : new FormControl('',[Validators.required, Validators.maxLength(150)]),
    mobile : new FormControl('',[Validators.required, Validators.maxLength(20)]),
    zipcode : new FormControl('',[Validators.required, Validators.maxLength(20)]),
  });

  
  ngOnInit(): void {
    this.updateRecords();
    this.isAllowedToCheckout = this.authService.isLoggedIn();
  }
  
  get f(){
    return this.productForm.controls;    
  }

  updateRecords(){
    var cartotal = 0;
    this.checkOutArray = this.cartService.getOrders();
    if(this.checkOutArray == null || this.checkOutArray.length == 0){
      this.cartTotal = 0;
    }
    for(var i=0; i<this.checkOutArray.length;i++){
      cartotal += this.checkOutArray[i].totalamount;
    }

    this.cartTotal = cartotal;
    this.finalPrice = this.cartTotal + this.shippingPrice;
  }

  deleteOrder(id: number): void{
    var res = this.cartService.deleteOrder(id);
    res == true ? alert("Item removed successfully") : alert("Exception occurred. Contct admin");
    this.updateRecords();
  }

  checkout(form: any){
    this.submitted = true;

    if(form.invalid){
      return;
    }

    if(this.checkOutArray == null || this.checkOutArray.length == 0){
      alert("No items to checkout.");
      return;
    }

    let checkout = new CheckOutDto();
    checkout.address = form.value["address"];
    checkout.mobile = form.value["mobile"];
    checkout.zipcode = form.value["zipcode"];
    checkout.userId = this.authService.getCurrentUserId();
    
    for(var i=0;i<this.checkOutArray.length;i++){
      checkout.cart.push(this.checkOutArray[i]);
    }
  
  this._postService.create(checkout).subscribe(res =>{
    if(res){
      alert("Products checkout successfully");
      this.cartService.clearStorage();
      window.location.reload();
    }
  });
  }
}
