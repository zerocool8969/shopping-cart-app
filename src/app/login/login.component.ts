import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserDto} from '../models/userDto';
import { AuthService } from '../services/authentication-service';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _postService;

  submitted = false;
  dataArray: any = [];
  productArray: any = [];

  productForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
  });
 

  constructor(private httpClient: HttpClient, private authService : AuthService, @Inject(APP_CONFIG) private config: IAppConfig) {
    this._postService = new PostService(httpClient, config.apiEndpoint, "users/authenticate")
  }

  ngOnInit(): void {
  }

  login(form: any){
    console.log(form);
    
    this.submitted = true;
    if(form.invalid){
      return;
    }

    var dto: UserDto = {
      id:'',
      email: form.controls["email"].value,
      password: form.controls["password"].value,
      token:'',
      name:''
    };

    this._postService.create(dto).subscribe(res =>{
      this.authService.authenticate(res);
      window.location.href = "shop"
    });
  }

  get f(){
    return this.productForm.controls;    
  }
}
