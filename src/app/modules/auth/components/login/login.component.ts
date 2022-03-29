import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Message,MessageService, PrimeNGConfig} from 'primeng/api';
import { LoginPresenter } from '../../models/presenter/login.presenter';
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
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.isLoading$ = this.authService.isLoading$;

  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
      this.msgs1 = [
        {severity:'error', summary:'Error', detail:'Datos de conexión incorrectos.'}
    ];

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

  get email(){
    return this.loginForm.get('email')?.value
  }

  get password(){
    return this.loginForm.get('password')?.value
  }

  submit() {
    this.hasError = false;
    let datosLogin = new LoginPresenter(this.loginForm.getRawValue(), null);




  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
