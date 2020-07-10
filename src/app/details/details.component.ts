import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart-services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartDto } from '../models/cart-model';
import { selectFeatureProductCount } from 'src/store/selectors/selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  submitted = false;
  productArray: any = [];
  checkOutArray : any =[];

  productForm = new FormGroup({
    id: new FormControl(''),
    newQuantity: new FormControl('',[Validators.required, Validators.maxLength(2)]),
    productAmount: new FormControl(''),
    productQuantity: new FormControl(''),
    productName: new FormControl(''),
    productImage: new FormControl('')
  });

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit(): void {
    const productId: string = this.route.snapshot.queryParamMap.get('productId');
    this.updateTable(productId);
  }

  updateTable(id: any){

     const nid = parseInt(id);
      this.store.select(selectFeatureProductCount).subscribe(res =>{  
      this.productArray = res.filter(x=>x.id == id);
      if(this.productArray !=null &&  this.productArray.length > 0){
      this.f["id"].setValue(parseFloat(this.productArray[0].id));
      this.f["newQuantity"].setValue(parseFloat(this.productArray[0].quantity));
      this.f["productAmount"].setValue(parseFloat(this.productArray[0].amount));
      this.f["productQuantity"].setValue(parseFloat(this.productArray[0].quantity));
      this.f["productName"].setValue(this.productArray[0].name);
      this.f["productImage"].setValue(this.productArray[0].image);
      }
    });
  }

  addToCart(form: any){
    this.submitted = true;

    if(form.invalid){
      return;
    }

    var id = parseFloat(form.value["id"]);
    var newQuantity = parseFloat(form.value["newQuantity"]);
    var productAmount = parseFloat(form.value["productAmount"]);
    var oldQuantity = parseFloat(form.value["productQuantity"]);
    var productName = form.value["productName"];
    var productImage = form.value["productImage"];
    var calculatedAmount = newQuantity * productAmount;

    if(newQuantity > oldQuantity) {
      alert("Quantity cannot be greater than old quantity.");
      return;
    }

    let cart = new CartDto();  

    cart.amount = productAmount;
    cart.id = id.toString();
    cart.name = productName;
    cart.newquantity = newQuantity;
    cart.oldquantity = oldQuantity;
    cart.totalamount = calculatedAmount;
    cart.image = productImage;
    var result = this.cartService.addToCart(cart);
    result == true ? alert("Added to cart successfully") : alert("Exception occurred. Please contact admin.") 
  }
  
  get f(){
    return this.productForm.controls;    
  }

}
