import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isActive: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleView(isSignUp: boolean) {
    this.isActive = isSignUp;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      
      
      const usuarioMock = {
        nombre: email.split('@')[0], 
        email: email,
        foto: 'https://api.dicebear.com/7.x/bottts/svg?seed=Felix' // Avatar por defecto
      };

      
      localStorage.setItem('sesion_activa', JSON.stringify(usuarioMock));
      
      
      this.router.navigate(['/dashboard']);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, email } = this.registerForm.value;
      
      const usuarioMock = {
        nombre: nombre,
        email: email,
        foto: 'https://api.dicebear.com/7.x/bottts/svg?seed=Felix'
      };

      
      localStorage.setItem('sesion_activa', JSON.stringify(usuarioMock));
      
      
      this.router.navigate(['/dashboard']);
    }
  }
}