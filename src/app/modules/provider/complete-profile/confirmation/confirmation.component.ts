import { Component, OnInit, ViewChildren, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProviderService } from "../../api-service/provider.service";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent implements OnInit {
  @Input() verificationProp: string;
  @Input() data: string;
  formInput = ["input1", "input2", "input3", "input4", "input5", "input6"];
  @ViewChildren("formRow") rows: any;
  otpForm: FormGroup;
  enteredOtp = "";
  isInvalidOtp = false;
  constructor(private providerService: ProviderService) {
    this.otpForm = this.createOtpFormGroup(this.formInput);
  }

  ngOnInit() {}

  createOtpFormGroup(elements) {
    const group: any = {};
    elements.forEach((key) => {
      group[key] = new FormControl("", Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    // this.isInvalidOtp = false;
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
    if (this.otpForm.valid) {
      Object.keys(this.otpForm.controls).forEach((key) => {
        this.enteredOtp = this.enteredOtp + this.otpForm.controls[key].value;
      });
      this.confirmOtp();
    }
  }

  confirmOtp(): void {
    // this.authService
    //   .validateOtp(this.data.verificationProp, this.value)
    //   .subscribe(
    //     res => {
    //       this.checkSuccessfulOtp(res.body);
    //     },
    //     err => { }
    //   );
    this.checkSuccessfulOtp(123456);
  }

  checkSuccessfulOtp(otp: number): void {
    if (this.verificationProp === "mobile") {
      if (otp === +this.enteredOtp) {
        this.providerService.successfulValidationMobile.next(true);
      } else {
        this.isInvalidOtp = true;
        this.otpForm.reset();
        this.enteredOtp = "";
        this.rows._results[0].nativeElement.focus();
      }
    } else {
      if (otp === +this.enteredOtp) {
        this.providerService.successfulValidationEmail.next(true);
      } else {
        this.isInvalidOtp = true;
        this.enteredOtp = "";
        this.otpForm.reset();
        this.rows._results[0].nativeElement.focus();
      }
    }
  }
}
