/// <reference types="jest" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { LoggerService } from '../../core/services/logger.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent (Jest)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceMock: any;
  let loggerMock: any;

  beforeEach(async () => {

    authServiceMock = {
      login: jest.fn(),
      saveAuthData: jest.fn()
    };

    loggerMock = {
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule // ✅ IMPORTANT FIX
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: LoggerService, useValue: loggerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                userType: 'employee',
                returnUrl: '/dashboard'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should be invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should login successfully and navigate', () => {
    const mockResponse = { token: '123' };

    authServiceMock.login.mockReturnValue(of(mockResponse));

    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: '123456'
    });

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(authServiceMock.saveAuthData).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle login error', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => ({ message: 'Invalid credentials' }))
    );

    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: '123456'
    });

    component.onSubmit();

    expect(component.error).toBe('Invalid credentials');
    expect(loggerMock.error).toHaveBeenCalled();
  });

  it('should show error if form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(component.error).toBe('Please fill in all fields correctly');
  });

});
