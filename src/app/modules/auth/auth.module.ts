import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';

// PrimeNg
import {MessagesModule} from 'primeng/messages';
import { MessageService } from 'primeng/api';
import {MessageModule} from 'primeng/message';
import { SecurityAuthService } from '../../libs/security/security-auth.service';
import { CryptoService } from '../../libs/security/crypto.service';
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule
  ],
  providers:[
    MessageService,
    SecurityAuthService,
    CryptoService
  ]
})
export class AuthModule {}
