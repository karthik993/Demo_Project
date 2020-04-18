import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Login Component
const login = {
  path: "",
  loadChildren: "./modules/auth/auth.module#AuthModule"
};

// Provider Module
const provider = {
  path: "provider",
  loadChildren: "./modules/provider/provider.module#ProviderModule"
};

const routes: Routes = [
  login,
  provider,
  // Redirecting Invalid URL Request
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
