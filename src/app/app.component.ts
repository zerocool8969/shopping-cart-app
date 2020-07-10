import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart-services';
import { AuthService } from './services/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;
  userName = "";
  message = "0";

  constructor(private cartService : CartService, private authService: AuthService){

  }
  ngOnInit(): void {

    this.updateCounter();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.userName = this.authService.getCurrentUserName();
  }

  updateCounter(){
    this.message ="0";
    var cart = localStorage.getItem("cart");
    if(cart!=null){
      var y = JSON.parse(cart);
      this.message = y.length;
    }
    this.cartService.getNavChangeEmitter().subscribe(x=>{
      this.message = x;
    });
  }

  logOut(){
    this.authService.logout();
    window.location.href = "login";
  }
}
