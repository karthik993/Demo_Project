import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ProviderService } from "./../../provider/api-service/provider.service";
import { AuthService } from "./../api-service/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModalOptions, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  modalReference: any;
  registerData: any;
  modalOption: NgbModalOptions = {};
  isSubmitted = false;
  isNumberConfirmed = false;
  isEmailConfirmed = false;
  data: string;
  verificationProp: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private providerService: ProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.loggedIn.next({
      isLogin: false,
      providerId: null,
    });
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      mobile: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern("[0-9]*"),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", Validators.required],
    });
    this.onChange();
    this.verifyData();
  }

  onChange(): void {
    this.registerForm.get("mobile").valueChanges.subscribe((val) => {
      this.isNumberConfirmed = false;
    });
    this.registerForm.get("email").valueChanges.subscribe((val) => {
      this.isEmailConfirmed = false;
    });
  }

  verifyData(): void {
    this.providerService.successfulValidationMobile.subscribe((res) => {
      this.isNumberConfirmed = res;
      this.toastr.success("Mobile Number Verified Successfully", "");
      this.modalReference.close();
    });
    this.providerService.successfulValidationEmail.subscribe((res) => {
      this.isEmailConfirmed = res;
      this.toastr.success("Email Address Verified Successfully", "");
      this.modalReference.close();
    });
  }

  onSubmit(content: any): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      if (this.isNumberConfirmed && this.isEmailConfirmed) {
        this.setDataValues();
        this.authService.registerUser(this.registerData).subscribe(
          (res) => {
            this.openSuccessModal(content);
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
      } else {
        if (!this.isNumberConfirmed) {
          this.toastr.info("Please Verify Mobile Number", "");
        } else {
          this.toastr.info("Please Verify Email Address", "");
        }
      }
    }
  }

  openSuccessModal(content: any): void {
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalReference = this.modalService.open(content, this.modalOption);
    this.modalReference.result.then(
      (result) => {
        //    this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  setDataValues(): void {
    this.registerData = {
      provider: {
        providerName:
          this.registerForm.get("firstName").value +
          " " +
          this.registerForm.get("lastName").value,
        email: this.registerForm.get("email").value,
        phoneNumber: "+61" + this.registerForm.get("mobile").value,
        status: "NO",
      },
      users: {
        loginName: this.registerForm.get("email").value,
        loginPassword: this.registerForm.get("password").value,
      },
    };
  }

  routeToLogin(): void {
    this.modalReference.close();
    this.router.navigate(["/"]);
  }

  openConfirmModal(content: any, property: string): void {
    if (this.registerForm.get(property).valid) {
      this.data = this.registerForm.get(property).value;
      this.verificationProp = property;
      this.modalOption.backdrop = "static";
      this.modalOption.keyboard = false;
      this.modalReference = this.modalService.open(content, this.modalOption);
      this.modalReference.result.then(
        (result) => {
          //    this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }
}
