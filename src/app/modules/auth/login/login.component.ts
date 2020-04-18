import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../api-service/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.loggedIn.next({
      isLogin: false,
      providerId: null,
    });
    this.loginForm = this.formBuilder.group({
      loginName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  register(): void {
    this.router.navigate(["register"]);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.validateLogin(this.loginForm.value).subscribe(
        (res) => {
          //   const user = res.body;
          this.router.navigate([
            "/provider/provider-service/" + res.body.userId,
          ]);
          this.authService.loggedIn.next({
            isLogin: true,
            providerId: res.body.userId,
            title: "Service",
          });
        },
        (err) => {
          const error = err.error;
          if (error.errorMessage) {
            this.toastr.error(error.errorMessage, "");
          } else {
            this.toastr.error("Something went wrong! Please try again", "");
          }
        }
      );
    }
  }
}
