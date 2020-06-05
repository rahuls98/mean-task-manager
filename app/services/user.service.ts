import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  prefix:string = "http://localhost:8080/users"; //local

  private updateSasURL:string = "/updateSAS";
  private updateActiveOnURL:string = "/updateActiveOn";
  private getLabelsURL:string = "/getLabels/"
  private addLabelURL:string = "/addLabel";
  private delLabelURL:string = "/delLabel/";

  constructor(private http: Http,) { }

  //LISTENERS and FILTERS
  private _sagRefresh = new Subject<any>();
  sagRefreshListen(): Observable<any> { return this._sagRefresh.asObservable(); }
  sagRefreshFilter(filterBy: string) { this._sagRefresh.next(filterBy) };

  private _labelRefresh = new Subject<any>();
  labelRefreshListen(): Observable<any> { return this._labelRefresh.asObservable(); }
  labelRefreshFilter(filterBy: string) { this._labelRefresh.next(filterBy) };

  //API CALLS
  updateSAS(body):Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + this.updateSasURL, 
      body, 
      {'headers': headers}
    ).map((res)=>res.json());
  }

  updateActiveOn(body):Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + this.updateActiveOnURL, 
      body, 
      {'headers': headers}
    ).map((res)=>res.json());
  }

  getLabels(username: string):Observable<any> {
    return this.http.get(
      this.prefix + this.getLabelsURL + username
    ).map(res => res.json());  
  }  

  addLabel(username:string, labelInfo:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({username: username, labelInfo:labelInfo});
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + this.addLabelURL, 
      body, 
      {'headers':headers}
    ).map(res => res.json());
  }

  delLabel(username:string, labels:Object[]):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({username: username, labels:labels});
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + this.delLabelURL, 
      body, 
      {'headers':headers}
    ).map(res => res.json());
  }
}
