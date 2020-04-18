import { AuthService } from "./modules/auth/api-service/auth.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "demo-project";
  show = false;
  isLogin = false;
  providerId: number;
  headerTitle = "HOME";

  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLogin = res.isLogin;
          this.providerId = this.isLogin ? res.providerId : null;
          if (res.title) {
            this.headerTitle = res.title;
            this.ref.detectChanges();
          }
        }
      },
    });
  }

  toggle(): void {
    this.show = !this.show;
  }
}
