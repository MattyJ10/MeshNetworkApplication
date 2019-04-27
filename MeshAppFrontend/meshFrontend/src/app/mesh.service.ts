import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable,of, from } from 'rxjs'; 
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class MeshService {

	public getPacketData(): Observable<any>  {
		return this.http.get('http://172.27.0.15:3030/getFile')
	}

	public getLinks(): Observable<any> {
		return this.http.get('http://172.27.0.15:3030/getArp')
	}

	public getIPs(): Observable<any> {
		return this.http.get('http://172.27.0.15:3030/getIpList')
	}

  constructor(private http: HttpClient) { }
}
