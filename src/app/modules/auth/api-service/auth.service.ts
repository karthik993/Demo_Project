import { UserModel } from "./../../../models/user.model";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpResponse, HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginModel } from "src/app/models/login.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  validateLogin(loginDetail: LoginModel): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/login-service/login-service/validate`,
      JSON.stringify(loginDetail),
      {
        headers,
        observe: "response"
      }
    );
  }

  validateOtp(property: string, value: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    });
    return this.http.get<any>(
      `http://3.24.130.145:8787/registration-service/registration-service/` +
        property +
        `/` +
        value,
      {
        headers,
        observe: "response"
      }
    );
  }

  registerUser(registerInfo: UserModel): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    });
    return this.http.post<any>(
      `http://3.24.130.145:8787/registration-service/registration-service/loginRegister`,
      JSON.stringify(registerInfo),
      {
        headers,
        observe: "response"
      }
    );
  }
}
