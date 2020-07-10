import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService{

    authenticate(user:any){
        localStorage.setItem("usercredentials", JSON.stringify(user));
    }

    logout(){
        localStorage.removeItem("usercredentials");
    }

    currentUser(){
        return localStorage.getItem("usercredentials");
    }

    currentUserToken(){
        var user = this.currentUser();
        if(user == null){
            return null;
        }
        var current = JSON.parse(user);
        if(current == null){
            return null;
        }
        return current.token;
    }

    isLoggedIn(){
        var user = this.currentUser();
        if(user == null){
            return false;
        }
        var current = JSON.parse(user);
        if(current == null){
            return false;
        }
        return true;
    }

    isAdmin(){
        var user = this.currentUser();
        if(user == null){
            return false;
        }
        var current = JSON.parse(user);
        if(current == null || current.userType != 1){
            return false;
        }

        return true;
    }

    getCurrentUserName(){
        var user = this.currentUser();
        if(user == null){
            return;
        }
        var current = JSON.parse(user);
        return current == null ? "" : current.userName;
    }

    getCurrentUserId(){
        var user = this.currentUser();
        if(user == null){
            return;
        }
        var current = JSON.parse(user);
        return current == null ? "" : current.id;
    }
}