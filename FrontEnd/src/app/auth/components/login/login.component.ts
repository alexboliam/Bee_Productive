import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "./../../../core/reducers";
import { AuthService } from "../../services/auth.service";
import * as UserActions from "../../../core/actions/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LogInComponent implements OnInit {
  error: string;
  form = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: [
      "",
      [
        Validators.required,
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async loginUser(event: FormGroup) {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      try {
        await this.authService.loginUser(email, password);
        this.router.navigate(["/"]);
      } catch (err) {
        this.error = err.message;
      }
    }
  }

  onloginWithFacebook() {
    this.authService
      .loginWithFacebook()
      .then(res => {
        this.authService.createUserSettingsFromSocialMedia(res as any);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  onloginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(res => {
        console.log(JSON.stringify(res));
        this.authService.createUserSettingsFromSocialMedia(res as any);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  onloginWithGitHub() {
    this.authService
      .loginWithGitHub()
      .then(res => {
        console.log(JSON.stringify(res));
        this.authService.createUserSettingsFromSocialMedia(res as any);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  onloginWithTwitter() {
    this.authService
      .loginWithTwitter()
      .then(res => {
        console.log(JSON.stringify(res));
        this.authService.createUserSettingsFromSocialMedia(res as any);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.error = err.message;
      });
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
