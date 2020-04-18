import { AuthService } from "./../../auth/api-service/auth.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-appointment-slot",
  templateUrl: "./appointment-slot.component.html",
  styleUrls: ["./appointment-slot.component.scss"],
})
export class AppointmentSlotComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  myDateValue: Date;
  providerId: number;

  calendarVisible = true;
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin,
    momentPlugin,
  ];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [{ title: "Event Now", start: new Date() }];

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.providerId = +this.route.snapshot.paramMap.get("id");
    this.authService.loggedIn.next({
      isLogin: true,
      providerId: this.providerId,
      title: "Appointment",
    });
    this.myDateValue = new Date();
  }
}
