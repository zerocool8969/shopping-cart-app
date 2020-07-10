import { CategoryDto } from './categoryDto';
import {ProductDto} from './productDto'

export interface AppState{
    category: CategoryDto[],
    product: ProductDto[]
};