import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryActions, CategoryActionsType } from '../actions/category.actions';

export function CategoryReducer(state: CategoryDto[] = [],
    action : CategoryActions){
        
        switch(action.type){
            case CategoryActionsType.ADD_CATEGORY:
                return [...state, action.payload];
            case CategoryActionsType.DELETE_CATEGORY:
                return state.filter(item => item.id !== action.payload);
            case CategoryActionsType.GET_CATEGORY:
                return [...action.payload];
            default:
                return state;
        }
    }