import { DataService } from './data-service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class PostService extends DataService {
    constructor(
      httpClient: HttpClient,
      @Inject(String) url: string,
      @Inject(String) endpoint: string
      ) {
        super(httpClient, url, endpoint);
      }
}
