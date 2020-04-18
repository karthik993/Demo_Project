import { AppointmentSlotComponent } from "./appointment-slot/appointment-slot.component";
import { ProviderServiceComponent } from "./provider-service/provider-service.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompleteProfileComponent } from "./complete-profile/complete-profile.component";

const routes: Routes = [
  { path: "complete-profile/:id", component: CompleteProfileComponent },
  { path: "provider-service/:id", component: ProviderServiceComponent },
  { path: "appointment-slot/:id", component: AppointmentSlotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {}
