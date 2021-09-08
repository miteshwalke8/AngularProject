import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of, from } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  userlist: User[] = [];
  private url = 'http://localhost:3000';

  constructor(public http: HttpClient) { }



  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  public getToken = () => {
    return localStorage.getItem('authToken')
  }

  /* signup function api call */
  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

  /* login function api call */
  public loginFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.

  /* logout function api call */
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

  addUser(user: User) {
    this.userlist.push(user);
  }

  deleteUser(id: number) {
    const user = this.userlist.findIndex(c => c.ID === id);
    this.userlist.splice(user, 1);
  }

  editUser(user: User) {
    const index = this.userlist.findIndex(c => c.ID === user.ID);
    this.userlist[index] = user;
  }
  getAllUsers() {
    return this.userlist;
  }
}
