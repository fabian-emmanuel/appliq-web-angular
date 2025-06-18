import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputWithIcon} from './input-with-icon';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('InputWithIcon', () => {
  let component: InputWithIcon;
  let fixture: ComponentFixture<InputWithIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputWithIcon],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            }
          }
        }
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(InputWithIcon);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('Testing component: ', component);

    expect(component).toBeTruthy();
  });

  it('should render the input element', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    console.log('Input Element: ', inputEl);
    expect(inputEl).toBeTruthy();
    expect(inputEl.getAttribute('placeholder')).toBe('Enter your password');
  });

  // it('should toggle password visibility', () => {
  //   expect(component.currentInputType).toBe('password');
  //   component.togglePasswordVisibility();
  //   expect(component.currentInputType).toBe('text');
  //   component.togglePasswordVisibility();
  //   expect(component.currentInputType).toBe('password');
  // });
  //
  // it('should display password strength bar if strength > 0', () => {
  //   component.passwordStrength = 60;
  //   fixture.detectChanges();
  //   const bar = fixture.debugElement.query(By.css('.rounded'));
  //   expect(bar).toBeTruthy();
  //   expect(bar.styles['width.%']).toBe('60');
  // });

  // it('should show validation messages when invalid', () => {
  //   component.control.setErrors({ required: true });
  //   component.isInvalid = true;
  //   fixture.detectChanges();
  //
  //   const errorText = fixture.debugElement.query(By.css('.text-danger'));
  //   expect(errorText.nativeElement.textContent).toContain('Password is required');
  // });

  // it('should show password requirements if field is valid but not login', () => {
  //   component.isInvalid = false;
  //   component.currentPassword = 'Test123!';
  //   component.passwordRequirements = [
  //     { text: 'At least one uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  //     { text: 'At least one number', test: (pwd: string) => /[0-9]/.test(pwd) },
  //   ];
  //   fixture.detectChanges();
  //
  //   const requirements = fixture.debugElement.queryAll(By.css('.d-flex.align-items-center.mb-1'));
  //   expect(requirements.length).toBe(2);
  //   expect(requirements[0].nativeElement.textContent).toContain('At least one uppercase letter');
  // });

  // it('should emit value on input change', () => {
  //   const input = fixture.debugElement.query(By.css('input')).nativeElement;
  //   spyOn(component, 'onInputChange').and.callThrough();
  //
  //   input.value = 'new-password';
  //   input.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //
  //   expect(component.onInputChange).toHaveBeenCalled();
  //   expect(component.control.value).toBe('new-password');
  // });
  //
  // it('should display "Forgot Password?" link when in login form', () => {
  //   component.isLoginForm = 'true';
  //   fixture.detectChanges();
  //   const link = fixture.debugElement.query(By.css('a.text-grey'));
  //   expect(link).toBeTruthy();
  //   expect(link.nativeElement.textContent).toContain('Forgot Password?');
  // });
});
