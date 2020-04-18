import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  successfulValidationMobile = new Subject<boolean>();
  successfulValidationEmail = new Subject<boolean>();

  getProviderDetail(providerId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.get<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/getProviderById/` +
        providerId,
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  getServices(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.get<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/getDefaultServices`,
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  getInsurances(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.get<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/getInsurances`,
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  getReviews(providerId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.get<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/getAllReviewByProvideId/` +
        providerId,
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  updateProviderDetails(providerInfo: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/updateProviderProfile`,
      JSON.stringify(providerInfo),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  saveServices(providerServices: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/updateProviderService`,
      JSON.stringify(providerServices),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  deleteServices(providerServices: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/deleteProviderService`,
      JSON.stringify(providerServices),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }

  saveInsurances(providerInsurances: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/provider-service/provider-service/updateProviderInsurance`,
      JSON.stringify(providerInsurances),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response",
      }
    );
  }
}
