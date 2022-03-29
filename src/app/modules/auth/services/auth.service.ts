import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';

import { Router } from '@angular/router';
import { LoginPresenter } from '../models/presenter/login.presenter';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { MENSAJES_ERROR } from '../constants/auth.constants';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;


  constructor(
    private readonly router: Router,
    private readonly authHttpService: AuthHTTPService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  // public methods
  public login(login: LoginPresenter): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(login).pipe(
      map((auth) => {
        return auth
      }),
      catchError((err) => {
        if(err.status === 401){
            return of(MENSAJES_ERROR.UNAUTHORIZED)
        }
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  logout() {

  }


  // need create new user then login
  // registration(user: UserModel): Observable<any> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.createUser(user).pipe(
  //     map(() => {
  //       this.isLoadingSubject.next(false);
  //     }),
  //     switchMap(() => this.login(user.email, user.password)),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  // forgotPassword(email: string): Observable<boolean> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService
  //     .forgotPassword(email)
  //     .pipe(finalize(() => this.isLoadingSubject.next(false)));
  // }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
