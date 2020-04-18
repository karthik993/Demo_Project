import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "./../../auth/api-service/auth.service";
import { ProviderService } from "./../api-service/provider.service";
import { ServiceModel } from "./../../../models/service.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-provider-service",
  templateUrl: "./provider-service.component.html",
  styleUrls: ["./provider-service.component.scss"],
})
export class ProviderServiceComponent implements OnInit {
  modalReference: any;
  modalOption: NgbModalOptions = {};
  serviceForm: FormGroup;
  isSubmitted = false;
  services: any;
  serviceId: number;
  providerId: number;
  serviceModel: ServiceModel = {} as ServiceModel;
  serviceList: ServiceModel[] = [] as ServiceModel[];
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.providerId = +this.route.snapshot.paramMap.get("id");
    this.authService.loggedIn.next({
      isLogin: true,
      providerId: this.providerId,
      title: "Service",
    });
    this.getProviderServices();
  }

  getServices(): void {
    this.spinner.show();
    this.providerService.getServices().subscribe(
      (res) => {
        this.services = res.body;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        const error = err.error;
        if (error.errorMessage) {
          this.toastr.error(error.errorMessage, "");
        } else {
          this.toastr.error("Something went wrong! Please try again", "");
        }
      }
    );
  }

  getProviderServices(): void {
    this.spinner.show();
    this.providerService.getProviderDetail(this.providerId).subscribe(
      (res) => {
        this.serviceList = res.body.services;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        const error = err.error;
        if (error.errorMessage) {
          this.toastr.error(error.errorMessage, "");
        } else {
          this.toastr.error("Something went wrong! Please try again", "");
        }
      }
    );
  }

  createServiceForm(): void {
    this.serviceForm = this.fb.group({
      serviceName: ["", Validators.required],
      treatmentType: ["", Validators.required],
      duration: ["", Validators.required],
      retailPrice: ["", Validators.required],
    });
    this.serviceForm.controls["treatmentType"].setValue("Cosmetic", {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.serviceForm.valid) {
      this.setServiceData();
      const providerService = {
        providerId: this.providerId,
        services: [this.serviceModel],
      };
      this.providerService.saveServices(providerService).subscribe(
        (res) => {
          this.serviceForm.reset();
          this.serviceList = res.body.services;
          this.modalReference.close();
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

  deleteService(service: any) {
    this.spinner.show();
    const providerService = {
      providerId: this.providerId,
      services: [service],
    };
    this.providerService.deleteServices(providerService).subscribe(
      (res) => {
        this.serviceList = res.body.services;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        const error = err.error;
        if (error.errorMessage) {
          this.toastr.error(error.errorMessage, "");
        } else {
          this.toastr.error("Something went wrong! Please try again", "");
        }
      }
    );
  }

  setServiceData(): void {
    this.serviceModel = {
      serviceId: this.serviceId,
      serviceName: this.serviceForm.get("serviceName").value,
      treatmentType: this.serviceForm.get("treatmentType").value,
      duration: this.serviceForm.get("duration").value,
      retailPrice: this.serviceForm.get("retailPrice").value,
    };
  }

  setServiceModal(service: any): void {
    this.serviceForm.setValue({
      serviceName: service.serviceName,
      treatmentType: service.treatmentType,
      duration: service.duration,
      retailPrice: service.retailPrice,
    });
  }

  onServiceChange(treatmentType: any): void {
    this.serviceForm.controls["treatmentType"].setValue(treatmentType);
  }

  openServiceModal(content: any, service?: any): void {
    this.getServices();
    this.createServiceForm();
    if (service) {
      this.serviceId = service.serviceId;
      this.setServiceModal(service);
    } else {
      this.serviceId = null;
      this.isSubmitted = false;
    }
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
