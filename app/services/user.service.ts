import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private updateSasURL:string = "http://localhost:8080/users/updateSAS";
  private updateActiveOnURL:string = "http://localhost:8080/users/updateActiveOn";
  private getLabelsURL:string = "http://localhost:8080/users/getLabels/"
  private addLabelURL:string = "http://localhost:8080/users/addLabel";
  private delLabelURL:string = "http://localhost:8080/users/delLabel/";

  constructor(private http: Http,) { }

  private _sagRefresh = new Subject<any>();
  sagRefreshListen(): Observable<any> { return this._sagRefresh.asObservable(); }
  sagRefreshFilter(filterBy: string) { this._sagRefresh.next(filterBy) };

  private _labelRefresh = new Subject<any>();
  labelRefreshListen(): Observable<any> { return this._labelRefresh.asObservable(); }
  labelRefreshFilter(filterBy: string) { this._labelRefresh.next(filterBy) };

  updateSAS(body):Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.updateSasURL, body, {'headers': headers}).map((res)=>res.json());
  }

  updateActiveOn(body):Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.updateActiveOnURL, body, {'headers': headers}).map((res)=>res.json());
  }

  getLabels(username: string):Observable<any> {
    return this.http.get(this.getLabelsURL + username).map(res => res.json());  
  }  

  addLabel(username:string, labelInfo:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({username: username, labelInfo:labelInfo});
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.addLabelURL, body, {'headers':headers}).map(res => res.json());
  }

  delLabel(username:string, labels:Object[]):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({username: username, labels:labels});
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.delLabelURL, body, {'headers':headers}).map(res => res.json());
  }
}
