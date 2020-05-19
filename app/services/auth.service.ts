import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  //private registerUrl:string = "/users/register";
  //private authUrl:string = "/users/authenticate";
  //private profileUrl:string = "/users/profile";

  private registerUrl:string = "http://localhost:8080/users/register";
  private authUrl:string = "http://localhost:8080/users/authenticate";
  private profileUrl:string = "http://localhost:8080/users/profile";

  constructor(private http:Http) { }

  registerUser(user):Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      this.registerUrl, 
      user, 
      {headers: headers}
    ).map(res => res.json());
  }

  authenticateUser(user):Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      this.authUrl, 
      user, 
      {headers: headers}
    ).map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(
      this.profileUrl, 
      {headers: headers}
    ).map(res => res.json());
  }

  storeUserData(token, user):void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
