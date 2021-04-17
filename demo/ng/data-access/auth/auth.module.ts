import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthApiService } from './api';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AuthQuery } from './auth.query';
import { AuthService } from './auth.service';
import { AuthStorage } from './auth.storage';
import { AuthStore } from './auth.store';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthStore,
    AuthQuery,
    AuthService,
    AuthStorage,
    AuthApiService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class DataAccessAuthModule {
  constructor(private authService: AuthService) {
    this.authService.autoAuthUser();
  }
}
