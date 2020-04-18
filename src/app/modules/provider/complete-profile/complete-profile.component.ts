import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./../../auth/api-service/auth.service";
import { ProviderService } from "./../api-service/provider.service";
import { UserModel } from "./../../../models/user.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-complete-profile",
  templateUrl: "./complete-profile.component.html",
  styleUrls: ["./complete-profile.component.scss"],
})
export class CompleteProfileComponent implements OnInit {
  completeProfileForm: FormGroup;
  passwordForm: FormGroup;
  addressForm: FormGroup;
  data: string;
  userInfo: UserModel = {} as UserModel;
  providerInfo: any;
  verificationProp: string;
  modalReference: any;
  modalOption: NgbModalOptions = {};
  isNumberConfirmed = false;
  isEmailConfirmed = false;
  isSubmitted = false;
  providerId: number;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.providerId = +this.route.snapshot.paramMap.get("id");
    this.setProfileForm();
    this.getProviderInfo();
    this.verifyData();
    this.onChange();
  }

  setProfileForm(): void {
    this.completeProfileForm = this.fb.group({
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
    });
    this.passwordForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
    this.addressForm = this.fb.group({
      address: ["", Validators.required],
      state: ["", Validators.required],
      pincode: ["", Validators.required],
      country: ["Australia", Validators.required],
    });
  }

  getProviderInfo(): void {
    this.spinner.show();
    this.providerService.getProviderDetail(this.providerId).subscribe(
      (res) => {
        this.setProviderInfo(res.body);
        this.spinner.hide();
      },
      (err) => {
        const error = err.error;
        this.spinner.hide();
        if (error.errorMessage) {
          this.toastr.error(error.errorMessage, "");
        } else {
          this.toastr.error("Something went wrong! Please try again", "");
        }
      }
    );
  }

  setProviderInfo(provider: any): void {
    const name = provider.providerName.split(" ");
    this.completeProfileForm.setValue({
      firstName: name[0],
      lastName: name[1],
      mobile: provider.phoneNumber.substring(3),
      email: provider.email,
    });
    if (provider.address) {
      this.addressForm.patchValue({
        address: provider.address.address,
        state: provider.address.state,
        pincode: provider.address.pincode,
      });
    }
    if (provider && provider.phoneNumber) {
      this.isNumberConfirmed = true;
    }
    if (provider && provider.email) {
      this.isEmailConfirmed = true;
    }
  }

  onChange(): void {
    this.authService.loggedIn.next({
      isLogin: true,
      providerId: this.providerId,
      title: "Complete-Profile",
    });
    this.completeProfileForm.get("mobile").valueChanges.subscribe((val) => {
      this.isNumberConfirmed = false;
    });
    this.completeProfileForm.get("email").valueChanges.subscribe((val) => {
      this.isEmailConfirmed = false;
    });
  }

  verifyData(): void {
    this.providerService.successfulValidationMobile.subscribe((res) => {
      this.toastr.success("Mobile Number Verified Successfully", "");
      this.isNumberConfirmed = res;
      this.modalReference.close();
    });
    this.providerService.successfulValidationEmail.subscribe((res) => {
      this.toastr.success("Email Address Verified Successfully", "");
      this.isEmailConfirmed = res;
      this.modalReference.close();
    });
  }

  onSave(): void {
    this.isSubmitted = true;
    if (
      this.completeProfileForm.valid &&
      this.passwordForm.valid &&
      this.addressForm.valid
    ) {
      if (this.isNumberConfirmed && this.isEmailConfirmed) {
        if (this.confirmPassword()) {
          this.setUser();
          this.providerService
            .updateProviderDetails(this.providerInfo)
            .subscribe(
              (data) => {
                this.router.navigate([
                  "/provider/provider-service/" + this.providerId,
                ]);
                this.toastr.success("Profile Update Successfully", "");
              },
              (err) => {
                const error = err.error;
                if (error.errorMessage) {
                  this.toastr.error(error.errorMessage, "");
                } else {
                  this.toastr.error(
                    "Something went wrong! Please try again",
                    ""
                  );
                }
              }
            );
        }
      }
    }
  }

  confirmPassword(): boolean {
    if (
      this.passwordForm.get("newPassword").value ===
      this.passwordForm.get("confirmPassword").value
    ) {
      return true;
    }
    return false;
  }

  setUser(): void {
    this.providerInfo = {
      providerName:
        this.completeProfileForm.get("firstName").value +
        this.completeProfileForm.get("lastName").value,
      email: this.completeProfileForm.get("email").value,
      phoneNumber: "+61" + this.completeProfileForm.get("mobile").value,
      status: "NO",
      currentPassword: this.passwordForm.get("currentPassword").value,
      newPassword: this.passwordForm.get("newPassword").value,
      providerId: this.providerId,
      address: {
        address: this.addressForm.get("address").value,
        state: this.addressForm.get("state").value,
        country: this.addressForm.get("country").value,
        pincode: this.addressForm.get("pincode").value,
      },
    };
  }

  openConfirmModal(content: any, property: string): void {
    if (this.completeProfileForm.get(property).valid) {
      this.data = this.completeProfileForm.get(property).value;
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
