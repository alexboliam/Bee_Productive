import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "./../../shared/services/data.service";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from "@fullcalendar/list";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  @ViewChild("calendar", {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarOptions: any;
  calendarEvents: EventInput[];
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  isDarkMode: boolean;
  header: any;
  height: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentThemeModeState.subscribe(
      themeState => (this.isDarkMode = themeState)
    );
    this.calendarInitialization();
  }

  calendarInitialization() {
    // this.header = {
    //   left: "prev,next today",
    //   center: "title",
    //   right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    // };

    this.calendarEvents = [
      {
        title: "Mazal B-Day",
        date: "2019-08-17"
      },
      {
        title: "Long Event",
        date: "2016-01-07"
      },
      {
        title: "Repeating Event",
        date: "2016-01-09T16:00:00"
      },
      {
        title: "Repeating Event",
        date: "2016-01-16T16:00:00"
      },
      {
        title: "Conference",
        date: "2016-01-11"
      },
      {
        title: 'Business Lunch',
        start: '2019-08-03T13:00:00',
        constraint: 'businessHours'
      },
      {
        title: 'Meeting',
        start: '2019-08-13T11:00:00',
        constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
      },
      {
        title: 'Conference',
        start: '2019-08-18',
        end: '2019-08-20'
      },
      {
        title: 'Party',
        start: '2019-08-29T20:00:00'
      },

      // areas where "Meeting" must be dropped
      {
        groupId: 'availableForMeeting',
        start: '2019-08-11T10:00:00',
        end: '2019-08-11T16:00:00',
        rendering: 'background'
      },
      {
        groupId: 'availableForMeeting',
        start: '2019-08-13T10:00:00',
        end: '2019-08-13T16:00:00',
        rendering: 'background'
      },

      // red areas where no events can be dropped
      {
        start: '2019-08-24',
        end: '2019-08-28',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
      },
      {
        start: '2019-08-06',
        end: '2019-08-08',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
      }
    ];

    this.calendarOptions = {
      plugins: [ bootstrapPlugin, dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin],
      header: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth, listWeek, listDay"
      },
      height: 500,
      themeSystem: 'bootstrap',
      editable: true,
      eventLimit: true,
      businessHours: true,
      defaultView: "dayGridMonth",
      events: 'https://fullcalendar.io/demo-events.json?overload-day'
    };
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate("2019-07-01"); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay
      });
    }
  }
}
