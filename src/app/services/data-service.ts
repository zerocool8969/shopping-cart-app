import { HttpClient } from "@angular/common/http";
import { Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
	constructor(
		private httpClient: HttpClient,
		@Inject(String) private url: string,
		@Inject(String) private endpoint: string
		) {}

	  public create(item): Observable<any> {
		  let c = `${this.url}/${this.endpoint}`;
		return this.httpClient.post<any>(`${this.url}/${this.endpoint}`, item);
	  }

	  public update(item, id: number): Observable<any> {
		return this.httpClient.put<any>(`${this.url}/${this.endpoint}/${id}`, item);
	  }

	  public getById(id: number): Observable<any> {
		return this.httpClient.get<any>(`${this.url}/${this.endpoint}/${id}`);
	  }

	  public getAll(): Observable<any> {
		  return this.httpClient.get(`${this.url}/${this.endpoint}`);
    }

	  deleteById(id: number) {
		return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`);
	  }
}
