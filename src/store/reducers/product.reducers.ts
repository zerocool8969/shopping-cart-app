import { ProductDto } from 'src/app/models/productDto';
import { ProductActions, ProductActionsType } from '../actions/product.actions';

export function ProductReducer(state: ProductDto[] = [],
    action : ProductActions){
        
        switch(action.type){
            case ProductActionsType.ADD_PRODUCT:
                return [...state, action.payload];
            case ProductActionsType.DELETE_PRODUCT:
                return state.filter(item => item.id !== action.payload);
            case ProductActionsType.GET_PRODUCT:
                return [...action.payload];
            default:
                return state;
        }
    }