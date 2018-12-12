import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable,of, from } from 'rxjs'; 
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class MeshService {

	public test(): Observable<any>  {
		return this.http.get('http://localhost:3005/api/test')
	}

  constructor(private http: HttpClient) { }
}
