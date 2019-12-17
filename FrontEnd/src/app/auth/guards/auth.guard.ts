import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { DataService } from './../../shared/services/data.service';
import { AuthService } from "../services/auth.service";
import { map, catchError } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../core/reducers";
import { getUserAuthenticatedState } from "../../core/selectors/user.selectors";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private dataService: DataService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(user => {
        if (!user) {
          this.dataService.changeThemeModeState(true);
          this.router.navigate(["/auth/login"]);
        }
        return !!user;
      })
    );
  }
}
