import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginPresenter } from '../../models/presenter/login.presenter';
import { MENSAJES_ERROR } from '../../constants/auth.constants';
import { RespuestaLoginDomain } from '../../models/domain/respuesta-login.domain';
import { RespustaGeneralDomain } from '../../../shared/models/domain/respuesta-general';
import { SecurityAuthService } from '../../../../libs/security/security-auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'fabio.ssanchez92@gmail.com',
    password: '123456',
  };
  public loginForm: FormGroup;
  public hasError: boolean;
  public returnUrl: string;
  public isLoading$: Observable<boolean>;

  msgs1: Message[];

  private unsubscribe: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly securityAuthService:SecurityAuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    this.primengConfig.ripple = true;
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  get email() {
    return this.loginForm.get('email')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  public submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.generarParametrosLogin())
      .subscribe((res) => {
        this.procesarRespustaSerivicioLogin(res)
      });
    this.unsubscribe.push(loginSubscr);
  }

  public procesarRespustaSerivicioLogin(respuesta: RespustaGeneralDomain<RespuestaLoginDomain>){
    if (respuesta.mensaje === MENSAJES_ERROR.UNAUTHORIZED) {
      this.hasError = true;
      this.msgs1 = [{ severity: 'error', summary: 'Error:', detail: respuesta.mensaje }];
    } else {
       console.log(respuesta.response.docuemento);

      // this.guardarSesionCookies()
    }
  }


  public guardarSesionCookies(informacionUsuario: RespustaGeneralDomain<RespuestaLoginDomain[]>){
    console.log("esta es lo que llega", informacionUsuario);

    // this.securityAuthService.guardarUuid()
  }

  public generarParametrosLogin() {
    return new LoginPresenter(this.loginForm.getRawValue(), null);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
