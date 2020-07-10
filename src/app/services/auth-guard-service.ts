import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './authentication-service'

@Injectable()
export class AuthGuardForUser implements CanActivate {
    constructor( private router: Router, private authService: AuthService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if(this.authService.isLoggedIn() == false){
            this.router.navigate(['/shop']);
        }
        const currentUser = !this.authService.isAdmin();
        if (currentUser == false) {
            this.router.navigate(['/shop']);
            return false;
        }
        return true;
    }
}