import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { IncidentService } from 'src/app/services/incident.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import swal from 'sweetalert2';
import * as Moment from 'moment'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [routerTransition()]
})
export class ReportComponent implements OnInit {
  defaultTime = { hour: 13, minute: 30 };
  meridianTime = { hour: 13, minute: 30 };
  meridian = true;
  incident_type: any = [];
  date: any;
  report: any = {};

  SecondsTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  seconds = true;

  customTime: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  toggleSeconds() {
    this.seconds = !this.seconds;
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  constructor(public incidentService: IncidentService, public reportService: ReportService, private spinner: NgxSpinnerService, public router: Router) { }
  ngOnInit() {
    this.spinner.show();
    this.incidentService.getIncidentType().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.incident_type = data.data;
        console.log(this.incident_type);
      }
    }, err => {
    })
  }

  submit() {

    this.report.date_reported = Moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    this.report.date_incident = Moment(new Date(this.date.year, this.date.month - 1, this.date.day, 0, 0, 0, 0)).format('YYYY-MM-DD hh:mm:ss')
    console.log(this.report, "data");
    this.spinner.show();
    this.reportService.submitReport(this.report).then(response => {
      let data: any = response;
      if (data.data) {
        this.report = {};
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
        this.spinner.hide();
      } else {
        this.spinner.hide();
        swal({
          type: 'warning',
          title: 'Error!',
          text: 'close',
        });

      }
    })
  }



}
