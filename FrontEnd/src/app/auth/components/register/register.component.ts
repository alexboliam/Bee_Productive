import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { passwordValidator } from '../../services/validator';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  error: string;
  form = this.fb.group({
    username: ['', [Validators.minLength(4), Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
      ]
    ],
    passwordConfirmation: ["", [passwordValidator, Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form.controls.password.valueChanges
    .subscribe(pass => this.form.controls.passwordConfirmation.updateValueAndValidity());
  }

  ngOnInit() {}

  async registerUser(event: FormGroup) {
    if (this.form.valid) {
      const { email, password, username } = this.form.value;
      try {
        await this.authService.createUser(email, password, username);
        this.router.navigate(["/"]);
      } catch (err) {
        this.error = err.message;
      }
    }
  }

  get passwordInvalid() {
    const control = this.form.get("password");
    return control.hasError("required") && control.touched;
  }

  get emailFormat() {
    const control = this.form.get("email");
    return control.hasError("email") && control.touched;
  }
}
