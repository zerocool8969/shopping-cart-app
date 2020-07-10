import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ProductDto } from '../models/productDto';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { AddProductAction, DeleteProductAction } from 'src/store/actions/product.actions';
import { selectFeatureProductCount, selectFeatureCategoryCount } from 'src/store/selectors/selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _productServiceAdd;
  private _productServiceDelete;
  submitted = false;
  dataArray: any = [];
  productArray: any = [];

  productForm = new FormGroup({
    categoryId : new FormControl(''),
    productName: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    productQuantity: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(4)]),
    productImage: new FormControl('',[Validators.required]),
    productDescription: new FormControl('',[Validators.maxLength(250)]),
    productAmount: new FormControl('',[Validators.required, Validators.maxLength(4)]),
    netPrice: new FormControl('',[Validators.required, Validators.maxLength(4)]),
  });
  
  constructor(private httpClient: HttpClient, private store: Store<AppState>, @Inject(APP_CONFIG) private config: IAppConfig) {

    this._productServiceAdd = new PostService(httpClient, config.apiEndpoint, "products/add_product");
    this._productServiceDelete = new PostService(httpClient,config.apiEndpoint,"products/delete_product_by_productId")
  }

 ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.store.select(selectFeatureCategoryCount).subscribe(res =>{
      this.dataArray = res;
      if(this.dataArray.length > 0){
        this.f["categoryId"].setValue(this.dataArray[0].id);
       }

    });

    this.store.select(selectFeatureProductCount).subscribe(response =>{
      this.productArray = response;
    });

  }

  addProduct(form: any){
    this.submitted = true;
    if(form.invalid){
      return;
    }

    var dto: ProductDto = {
      id : 0,
      name: form.controls["productName"].value,
      description: form.controls["productDescription"].value,
      image: form.controls["productImage"].value,
      quantity: parseInt(form.controls["productQuantity"].value),
      categoryId: form.controls["categoryId"].value,
      categoryName: "",
      amount: parseFloat(form.controls["productAmount"].value),
      netPrice: parseFloat(form.controls["netPrice"].value)
    }

    this._productServiceAdd.create(dto).subscribe( response =>{
      this.store.dispatch(new AddProductAction(response));
    });
  }

  deleteProduct(id:number){
    this._productServiceDelete.deleteById(id).subscribe( response =>{
      this.store.dispatch(new DeleteProductAction(Number(id)));
    });
  }

  get f(){
    return this.productForm.controls;    
  }

  changeCategory(e) {
    this.f["categoryId"].setValue(parseInt(e.target.value));
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  changeListener($event): void {
    this.readThis($event.target);
}

  readThis(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();
  var vm = this;
  myReader.onloadend = function (e) {
      console.log(myReader.result);
      vm.f["productImage"].setValue( myReader.result)
  }
  myReader.readAsDataURL(file);
  }

}
