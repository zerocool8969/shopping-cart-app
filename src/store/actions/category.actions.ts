import {Action} from '@ngrx/store';
import { CategoryDto } from 'src/app/models/categoryDto';

export enum CategoryActionsType{
    ADD_CATEGORY = '[Category] Add Category',
    DELETE_CATEGORY = '[Category] Delete Category',
    GET_CATEGORY = '[Category] Get Category'
}

export class AddCategoryAction implements Action {
    readonly type = CategoryActionsType.ADD_CATEGORY

    constructor(public payload: CategoryDto){

    }
}

export class DeleteCategoryAction implements Action {
    readonly type = CategoryActionsType.DELETE_CATEGORY
  
    constructor(public payload: number) { }
}

export class GetCategoryAction implements Action {
    readonly type = CategoryActionsType.GET_CATEGORY
  
    constructor(public payload: any) { }
}

export type CategoryActions = AddCategoryAction | DeleteCategoryAction | GetCategoryAction;