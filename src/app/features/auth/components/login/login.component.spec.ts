import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink, RouterModule} from '@angular/router';
import { InputWithIconComponent } from '@shared/components/input-with-icon/input-with-icon.component';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterModule,
        InputWithIconComponent,
      ],
      providers: [
        FormBuilder,
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the loginForm with correct controls and initial values', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.contains('email')).toBeTrue();
      expect(component.loginForm.contains('password')).toBeTrue();
      expect(component.loginForm.contains('rememberMe')).toBeTrue();

      expect(component.email.value).toBe('');
      expect(component.password.value).toBe('');
      expect(component.rememberMe.value).toBeFalse();
    });

    it('should have form configured with updateOn blur', () => {
      expect(component.loginForm.updateOn).toBe('blur');
    });

    it('should have correct getter methods for form controls', () => {
      expect(component.email).toBe(component.loginForm.get('email') as FormControl);
      expect(component.password).toBe(component.loginForm.get('password') as FormControl);
      expect(component.rememberMe).toBe(component.loginForm.get('rememberMe') as FormControl);
    });
  });

  describe('Email Field Validation', () => {
    it('should mark email as invalid when empty (required)', fakeAsync(() => {
      const emailControl = component.email;
      emailControl.setValue('');
      emailControl.markAsTouched();
      tick();
      fixture.detectChanges();

      expect(emailControl.errors?.['required']).toBeTrue();
      expect(emailControl.valid).toBeFalse();
      expect(component.loginForm.valid).toBeFalse();
    }));

    it('should mark email as invalid for an invalid email format', fakeAsync(() => {
      const emailControl = component.email;
      emailControl.setValue('invalid-email');
      emailControl.markAsTouched();
      tick();
      fixture.detectChanges();

      expect(emailControl.errors?.['email']).toBeTrue();
      expect(emailControl.valid).toBeFalse();
      expect(component.loginForm.valid).toBeFalse();
    }));

    it('should mark email as invalid if length exceeds 254 characters', fakeAsync(() => {
      const emailControl = component.email;
      // Create an email string that is longer than the actual maxLength (254)
      // For example, 250 'a' characters + '@example.com' makes it 262 characters long.
      const longEmail = 'a'.repeat(250) + '@example.com';
      emailControl.setValue(longEmail);
      emailControl.markAsTouched();
      tick();
      fixture.detectChanges();

      // console.log('Testing invalid email length: ', component.email.errors);
      expect(emailControl.errors?.['maxlength']?.requiredLength).toBe(254);
      expect(emailControl.errors?.['maxlength']?.actualLength).toBe(longEmail.length);

      expect(emailControl.valid).toBeFalse();
      expect(component.loginForm.valid).toBeFalse();
    }));

    it('should mark email as valid for a valid email', fakeAsync(() => {
      const emailControl = component.email;
      emailControl.setValue('test@example.com');
      emailControl.markAsTouched();
      tick();
      fixture.detectChanges();

      expect(emailControl.errors).toBeNull();
      expect(emailControl.valid).toBeTrue();
    }));

    it('should handle various valid email formats', fakeAsync(() => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@example-site.com',
        'a@b.co'
      ];

      validEmails.forEach(email => {
        component.email.setValue(email);
        component.email.markAsTouched();
        tick();
        fixture.detectChanges();

        expect(component.email.valid).toBeTrue();
      });
    }));

    it('should handle various invalid email formats', fakeAsync(() => {
      const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'username@.com',
        'username@com',
        'username@-example.com'
      ];

      invalidEmails.forEach(email => {
        component.email.setValue(email);
        component.email.markAsTouched();
        tick();
        fixture.detectChanges();
        // console.log(`Testing invalid email: ${email}`, component.email.errors);
        expect(component.email.valid).toBeFalse();
      });
    }));
  });

  describe('Password Field Validation', () => {
    it('should mark password as invalid when empty (required)', fakeAsync(() => {
      const passwordControl = component.password;
      passwordControl.setValue('');
      passwordControl.markAsTouched();
      tick();
      fixture.detectChanges();

      expect(passwordControl.errors?.['required']).toBeTrue();
      expect(passwordControl.valid).toBeFalse();
      expect(component.loginForm.valid).toBeFalse();
    }));

    it('should mark password as valid when not empty', fakeAsync(() => {
      const passwordControl = component.password;
      passwordControl.setValue('password123');
      passwordControl.markAsTouched();
      tick();
      fixture.detectChanges();

      expect(passwordControl.errors).toBeNull();
      expect(passwordControl.valid).toBeTrue();
    }));

    it('should accept passwords of various lengths and characters', fakeAsync(() => {
      const validPasswords = [
        'a',
        '123',
        'password',
        'Pass123!@#',
        'very-long-password-with-special-characters-123456789!@#$%^&*()',
        '   spaces   '
      ];

      validPasswords.forEach(password => {
        component.password.setValue(password);
        component.password.markAsTouched();
        tick();
        fixture.detectChanges();

        expect(component.password.valid).toBeTrue();
      });
    }));
  });

  describe('Remember Me Checkbox', () => {
    it('should have default value of false', () => {
      expect(component.rememberMe.value).toBeFalse();
    });

    it('should update rememberMe control value through onCheckboxChange method', () => {
      // Test checking the checkbox
      const checkEvent = { target: { checked: true } } as unknown as Event;
      component.onCheckboxChange(checkEvent);

      expect(component.rememberMe.value).toBeTrue();
      expect(component.rememberMe.touched).toBeTrue();

      // Test unchecking the checkbox
      const uncheckEvent = { target: { checked: false } } as unknown as Event;
      component.onCheckboxChange(uncheckEvent);

      expect(component.rememberMe.value).toBeFalse();
      expect(component.rememberMe.touched).toBeTrue();
    });

    it('should handle checkbox change through FormControl binding', fakeAsync(() => {
      // Simulate setting the FormControl directly
      component.rememberMe.setValue(true);
      tick();
      fixture.detectChanges();

      expect(component.rememberMe.value).toBeTrue();

      component.rememberMe.setValue(false);
      tick();
      fixture.detectChanges();

      expect(component.rememberMe.value).toBeFalse();
    }));

    it('should log checkbox state change', () => {
      spyOn(console, 'log');
      const event = { target: { checked: true } } as unknown as Event;

      component.onCheckboxChange(event);

      expect(console.log).toHaveBeenCalledWith('Remember Me Checkbox changed:', true);
    });
  });

  describe('Form Submission (onSubmit)', () => {
    beforeEach(() => {
      spyOn(component, 'markAllFieldsAsTouched').and.callThrough();
      spyOn(console, 'log').and.callThrough();
    });

    it('should call markAllFieldsAsTouched and log errors if form is invalid on submit', () => {
      // Form is invalid by default (empty fields)
      component.onSubmit();

      expect(component.markAllFieldsAsTouched).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Form is not valid', jasmine.any(Object));
    });

    it('should log form data if form is valid on submit', fakeAsync(() => {
      // Make form valid
      component.email.setValue('test@example.com');
      component.password.setValue('password123');
      component.rememberMe.setValue(false);
      tick();
      fixture.detectChanges();

      component.onSubmit();

      expect(component.markAllFieldsAsTouched).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Submitting form', {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false
      });
    }));

    it('should handle form submission with rememberMe checked', fakeAsync(() => {
      component.email.setValue('user@test.com');
      component.password.setValue('testpass');
      component.rememberMe.setValue(true);
      tick();
      fixture.detectChanges();

      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Submitting form', {
        email: 'user@test.com',
        password: 'testpass',
        rememberMe: true
      });
    }));

    it('should not submit if email is invalid but password is valid', fakeAsync(() => {
      component.email.setValue('invalid-email');
      component.password.setValue('validpassword');
      tick();
      fixture.detectChanges();

      component.onSubmit();

      expect(component.markAllFieldsAsTouched).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Form is not valid', jasmine.any(Object));
    }));

    it('should not submit if password is empty but email is valid', fakeAsync(() => {
      component.email.setValue('valid@email.com');
      component.password.setValue('');
      tick();
      fixture.detectChanges();

      component.onSubmit();

      expect(component.markAllFieldsAsTouched).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Form is not valid', jasmine.any(Object));
    }));
  });

  describe('Form State and UI Integration', () => {
    it('should disable submit button when form is invalid', fakeAsync(() => {
      fixture.detectChanges();
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

      expect(submitButton.nativeElement.disabled).toBeTrue();
    }));

    it('should enable submit button when form is valid', fakeAsync(() => {
      // Make form valid
      component.email.setValue('test@example.com');
      component.password.setValue('password123');
      tick();
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeFalse();
    }));

    it('should toggle submit button state as form validity changes', fakeAsync(() => {
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

      // Initially invalid
      expect(submitButton.nativeElement.disabled).toBeTrue();

      // Make valid
      component.email.setValue('test@example.com');
      component.password.setValue('password123');
      tick();
      fixture.detectChanges();
      expect(submitButton.nativeElement.disabled).toBeFalse();

      // Make invalid again
      component.email.setValue('invalid');
      tick();
      fixture.detectChanges();
      expect(submitButton.nativeElement.disabled).toBeTrue();
    }));
  });

  describe('Private Methods', () => {
    it('markAllFieldsAsTouched should mark all controls as touched', () => {
      // Ensure controls are initially untouched
      expect(component.email.untouched).toBeTrue();
      expect(component.password.untouched).toBeTrue();
      expect(component.rememberMe.untouched).toBeTrue();

      (component as any).markAllFieldsAsTouched();
      fixture.detectChanges();

      expect(component.email.touched).toBeTrue();
      expect(component.password.touched).toBeTrue();
      expect(component.rememberMe.touched).toBeTrue();
    });

    it('getFormErrors should return an object with control errors', fakeAsync(() => {
      component.email.setValue('invalid');
      component.password.setValue('');
      component.email.markAsTouched();
      component.password.markAsTouched();
      tick();
      fixture.detectChanges();

      const errors = (component as any).getFormErrors();

      expect(errors['email']).toBeDefined();
      expect(errors['email']['email']).toBeTrue();
      expect(errors['password']).toBeDefined();
      expect(errors['password']['required']).toBeTrue();
      expect(errors['rememberMe']).toBeUndefined();
    }));

    it('getFormErrors should return an empty object if no errors', fakeAsync(() => {
      component.email.setValue('test@example.com');
      component.password.setValue('password123');
      tick();
      fixture.detectChanges();

      const errors = (component as any).getFormErrors();
      expect(Object.keys(errors).length).toBe(0);
    }));

    it('getFormErrors should include form-level errors if they exist', () => {
      // Add a form-level error for testing
      component.loginForm.setErrors({ 'customError': true });

      const errors = (component as any).getFormErrors();
      expect(errors.form).toBeDefined();
      expect(errors.form['customError']).toBeTrue();
    });

    it('createForm should return a FormGroup with correct structure', () => {
      const newForm = (component as any).createForm();

      expect(newForm).toBeInstanceOf(FormGroup);
      expect(newForm.contains('email')).toBeTrue();
      expect(newForm.contains('password')).toBeTrue();
      expect(newForm.contains('rememberMe')).toBeTrue();
      expect(newForm.updateOn).toBe('blur');
    });
  });

  describe('Template Integration', () => {
    it('should render the login form elements', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();

      const inputComponents = fixture.debugElement.queryAll(By.css('app-input-with-icon'));
      expect(inputComponents.length).toBe(2); // email and password

      const checkboxElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      expect(checkboxElement).toBeTruthy();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
    });

    it('should display correct labels and placeholders', () => {
      const inputComponents = fixture.debugElement.queryAll(By.css('app-input-with-icon'));

      // Check email input component attributes
      const emailComponent = inputComponents[0];
      expect(emailComponent.componentInstance.label).toBe('Email');
      expect(emailComponent.componentInstance.placeholder).toBe('john.doe@example.com');
      expect(emailComponent.componentInstance.icon).toBe('bi bi-envelope-at');
      expect(emailComponent.componentInstance.type).toBe('email');

      // Check password input component attributes
      const passwordComponent = inputComponents[1];
      expect(passwordComponent.componentInstance.label).toBe('Password');
      expect(passwordComponent.componentInstance.placeholder).toBe('********');
      expect(passwordComponent.componentInstance.icon).toBe('bi bi-key');
      expect(passwordComponent.componentInstance.type).toBe('password');
      expect(passwordComponent.componentInstance.isLoginForm).toBe('true');
    });

    it('should bind form controls to input components', () => {
      const inputComponents = fixture.debugElement.queryAll(By.css('app-input-with-icon'));

      expect(inputComponents[0].componentInstance.control).toBe(component.email);
      expect(inputComponents[1].componentInstance.control).toBe(component.password);
    });

    it('should submit form when submit button is clicked', fakeAsync(() => {
      spyOn(component, 'onSubmit');

      // Make form valid first
      component.email.setValue('test@example.com');
      component.password.setValue('password');
      tick();
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      submitButton.nativeElement.click();

      expect(component.onSubmit).toHaveBeenCalled();
    }));
  });

  describe('Edge Cases and Error Handling', () => {

    it('should handle undefined checked property in onCheckboxChange', () => {
      const event = { target: {} } as unknown as Event;

      component.onCheckboxChange(event);
      // Should set to falsy value (undefined gets converted to false)
      expect(component.rememberMe.value).toBeFalsy();
    });

    it('should maintain form state after multiple invalid submissions', () => {
      component.onSubmit(); // First invalid submission
      component.onSubmit(); // Second invalid submission

      expect(component.loginForm.valid).toBeFalse();
      expect(component.email.touched).toBeTrue();
      expect(component.password.touched).toBeTrue();
    });
  });

  describe('Accessibility and UX', () => {
    it('should mark fields as touched when form is submitted invalid', () => {
      expect(component.email.touched).toBeFalse();
      expect(component.password.touched).toBeFalse();

      component.onSubmit();

      expect(component.email.touched).toBeTrue();
      expect(component.password.touched).toBeTrue();
    });

    it('should maintain rememberMe state correctly', () => {
      // Test multiple state changes
      component.rememberMe.setValue(true);
      expect(component.rememberMe.value).toBeTrue();

      component.rememberMe.setValue(false);
      expect(component.rememberMe.value).toBeFalse();

      const event = { target: { checked: true } } as unknown as Event;
      component.onCheckboxChange(event);
      expect(component.rememberMe.value).toBeTrue();
    });
  });
});
