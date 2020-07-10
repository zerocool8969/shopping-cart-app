import { Injectable, EventEmitter } from '@angular/core';
import { CartDto } from '../models/cart-model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CartService{
    private headers : HttpHeaders;
    navchange: EventEmitter<string> = new EventEmitter();
    cartArray: CartDto[] = [];

        addToCart(model: CartDto){
            try   
            { 
            var cart = localStorage.getItem("cart");
            if(cart != null){
            var current = JSON.parse(cart);
            for(var i=0;i<current.length;i++){
                if(current[i].id == model.id){
                    delete current[i];
                    current.splice(i, 1);
                }
            }

            this.cartArray = current;
            this.cartArray.push(model);

            }
            else{
            this.cartArray.push(model);
            }
            
            localStorage.setItem("cart", JSON.stringify(this.cartArray));
            this.emitNavChangeEvent(this.cartArray.length.toString())
            return true;
        }
        catch(Error){
            return false;
        }
    }

        getOrders(){
            var x = localStorage.getItem("cart");
            this.cartArray = JSON.parse(x);
            return this.cartArray;
        }

        deleteOrder(id: number){
            try{
             var cart = localStorage.getItem("cart");
            if(cart != null){
            var current = JSON.parse(cart);
            for(var i=0;i<current.length;i++){
                if(current[i].id == id){
                    delete current[i];
                    current.splice(i, 1);
                }
            }

            this.cartArray = current;
            }
            localStorage.setItem("cart", JSON.stringify(this.cartArray));
            this.emitNavChangeEvent(this.cartArray.length.toString())
            return true;
        }
        catch(Error){
            return false;
        }
    }

    clearStorage(){
        localStorage.removeItem("cart");
        this.emitNavChangeEvent("0")
    }

    emitNavChangeEvent(number:any) {
        this.navchange.emit(number);
      }
      
      getNavChangeEmitter() {
        return this.navchange;
    }
}