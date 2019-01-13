import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import swal from 'sweetalert2';
import * as Moment from 'moment'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
  animations: [routerTransition()]
})
export class GeneralReportComponent implements OnInit {
  reports: any = [];
  incident_type: any = [];
  report: any = {};
  closeResult: string;
  constructor(private modalService: NgbModal, public incidentService: IncidentService, public reportService: ReportService, private spinner: NgxSpinnerService, public router: Router) { }

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
    this.incidentService.getIncidentType().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.incident_type = data.data;
      }
    }, err => {
    })
  }

  open(content, report) {
    console.log(report, "data");
    this.report = report;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  showDate(date) {
    return Moment(date).format('LLL');
  }

  viewData(data) {
    console.log(data);
  }

}