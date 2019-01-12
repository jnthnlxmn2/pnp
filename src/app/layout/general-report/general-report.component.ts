import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import swal from 'sweetalert2';
import * as Moment from 'moment'

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
  animations: [routerTransition()]
})
export class GeneralReportComponent implements OnInit {
  reports: any = [];
  constructor(public incidentService: IncidentService, public reportService: ReportService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.reportService.getReport().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.reports = data.data;
        console.log(this.reports);
      }
    }, err => {
    })
  }
  showDate(date){
    return Moment(date).format('LLL');
  }

}