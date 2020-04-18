import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppointmentSlotComponent } from "./appointment-slot.component";

describe("AppointmentSlotComponent", () => {
  let component: AppointmentSlotComponent;
  let fixture: ComponentFixture<AppointmentSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentSlotComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
