import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from './crypto.service';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityAuthService {

  public  urlBase : string;

  constructor(
    private crypto: CryptoService,
    private cookiesService: CookieService,
    private http : HttpClient,
    @Inject('env') private env : string | any
  ) {
    this.urlBase   = `${this.env.apiUrl}`
  }

  public guardarUuid(uuid: string){
    this.cookiesService.set('UUID-TOKEN',  this.crypto.encryptAES(uuid), 1, '/', this.env.appDominio );
  }

   public obtenerUuid() : string{
    return this.crypto.decryptAES(this.cookiesService.get('UUID-TOKEN'));
  }

  public guardarToken(tokken: string): void {
      this.cookiesService.set('JWT-TOKKEN',  tokken, 1, '/', this.env.appDominio );
  }

  public obtenerToken() : string{
    return this.cookiesService.get('JWT-TOKKEN');
  }

  public guardarUsuario(username : string){
    this.cookiesService.set('USUARIO',  this.crypto.encryptAES(username), 1, '/', this.env.appDominio)
  }

  public obtenerUsuario() :string {
    return this.crypto.decryptAES(this.cookiesService.get('USUARIO'));
  }

  public gurdarNombre(name:string){
     this.cookiesService.set('NOMBRE',  this.crypto.encryptAES(name), 1, '/', this.env.appDominio)
  }

  public obtenerNombre(){
    return this.crypto.decryptAES(this.cookiesService.get('NOMBRE'));
  }


  public guardarApellido(lastName:string){
     this.cookiesService.set('APELLIDO',  this.crypto.encryptAES(lastName), 1, '/', this.env.appDominio)
  }

  public obtenerApellido(){
    return this.crypto.decryptAES(this.cookiesService.get('APELLIDO'));
  }

  public guardarRol(rol:string){
     this.cookiesService.set('ROL',  this.crypto.encryptAES(rol), 1, '/', this.env.appDominio)
  }

  public obtenerRol(){
    return this.crypto.decryptAES(this.cookiesService.get('ROL'));
  }

  // public refreshToken() : Observable<AuthDomain>{
  //   const autenticationRequest: AuthModelPresenter =  new AuthModelPresenter;
  //   autenticationRequest.tokenActul = this.getToken();
  //   autenticationRequest.username   =  this.getUsuario();
  //   return this.http.post<AuthDomain>(`${this.urlBase}refresh-token`, autenticationRequest );
  // }

  public getMenuApplication(){
    console.log(this.obtenerRol());
  }

  // public validateTokens(uuid:string, jwt:string): Observable<ResponsePresenter<any>>{
  //   //  const validate =  new validateTokens()
  //   //  validate.uuid = uuid;
  //   //  validate.jwt  = jwt;
  //   // return this.http.post<ResponsePresenter<any>>(`${this.urlBase}auth/validate-tokens/`, validate)
  // }

  public clearCookies(){
    this.cookiesService.delete('JWT-TOKKEN');
  }

  public isAuthenticated(){
    const token = this.obtenerToken();
    if(token != null && token.length > 0){
      return true;
    } else {
      return false;
    }
  }
}
