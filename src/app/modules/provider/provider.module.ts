import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ProviderRoutingModule } from "./provider-routing.module";
import { CompleteProfileComponent } from "./complete-profile/complete-profile.component";
import { ProviderServiceComponent } from "./provider-service/provider-service.component";
import { AppointmentSlotComponent } from "./appointment-slot/appointment-slot.component";
import { BsDatepickerModule } from "ngx-bootstrap";
import { ConfirmationComponent } from "./complete-profile/confirmation/confirmation.component";

@NgModule({
  declarations: [
    CompleteProfileComponent,
    ProviderServiceComponent,
    AppointmentSlotComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [ConfirmationComponent],
})
export class ProviderModule {}
