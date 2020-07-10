import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RegisterDto} from '../models/registerDto';
import { PostService } from '../services/post.service'
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private _postService;
  submitted = false;
  dataArray: any = [];
  productArray: any = [];

  productForm = new FormGroup({
    fullName: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
  });
  

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
    this._postService = new PostService(httpClient, config.apiEndpoint, "users/register")
  }

  ngOnInit(): void {
  }

  register(form: any){
    console.log(form);
    
    this.submitted = true;
    if(form.invalid){
      return;
    }

    var dto: RegisterDto = {
      id:0,
      email: form.controls["email"].value,
      password: form.controls["password"].value,
      token:'',
      name:form.controls["fullName"].value
    };

    this._postService.create(dto).subscribe((res : any) =>{
      console.log(res.message);
      alert(res.message);
      window.location.href = "login";
    });
  }

  get f(){
    return this.productForm.controls;    
  }
}