import {Action} from '@ngrx/store';
import { ProductDto } from 'src/app/models/productDto';

export enum ProductActionsType{
    ADD_PRODUCT = '[Product] Add Product',
    DELETE_PRODUCT = '[Product] Delete Product',
    GET_PRODUCT = '[Product] Get Product'
}

export class AddProductAction implements Action {
    readonly type = ProductActionsType.ADD_PRODUCT

    constructor(public payload: ProductDto){

    }
}

export class DeleteProductAction implements Action {
    readonly type = ProductActionsType.DELETE_PRODUCT
  
    constructor(public payload: number) { }
}

export class GetProductAction implements Action {
    readonly type = ProductActionsType.GET_PRODUCT
  
    constructor(public payload: any) { }
}

export type ProductActions = AddProductAction | DeleteProductAction | GetProductAction;