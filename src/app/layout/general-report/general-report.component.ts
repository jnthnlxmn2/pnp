import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import swal from 'sweetalert2';
import * as Moment from 'moment'
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`],
  animations: [routerTransition()]
})
export class GeneralReportComponent implements OnInit {
  hoveredDate: NgbDate;
  readytogo: any = [];
  fromDate: NgbDate;
  toDate: NgbDate;
  datefilter: any = false;
  reports: any = [];
  status_incident: any = [];
  incident_type: any = [];
  eighteen_victim: any = '';
  eighteen_report: any = '';
  eighteen_below_victim: any = false;
  eighteen_above_victim: any = false;
  eighteen_below_report: any = false;
  eighteen_above_report: any = false;
  provinces: any = [];
  wdsps: any = false;
  place_of_incident: any = '';
  report: any = {};
  gender: any = '';
  closeResult: string;
  constructor(public excelService: ExcelService, private modalService: NgbModal, public incidentService: IncidentService,
    public reportService: ReportService, private spinner: NgxSpinnerService,
    public router: Router, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit() {
    let params = {};
    this.spinner.show();
    this.reportService.getReport(params).then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data) {
        this.reports = data;
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
    this.incidentService.getProvince().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.provinces = data.data;
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

  exportAsXLSX(): void {
    this.reports.forEach(report => {
      let object: any = {};
      object.BLOTTER_ENTRY_NUMBER = report.bltr_entry_num;
      object.TYPE_OF_INCIDENT = report.incident_type.name;
      object.DATE_REPORTED = report.date_reported;
      object.SURNAME = report.itm_a_family_name;
      object.FIRST_NAME = report.itm_a_first_name;
      object.GENDER = report.itm_a_gender;
      object.AGE = report.itm_a_age;
      object.PROVINCE = report.itm_a_province;
      this.readytogo.push(object);
    });
    this.excelService.exportAsExcelFile(this.readytogo, 'report');
  }

  wdspssearch() {
    let params = {};

    if (this.datefilter) {

      params = {
        'gender': this.gender ? this.gender : '',
        '18below_victim': this.eighteen_below_victim,
        '18above_victim': this.eighteen_above_victim,
        '18below_report': this.eighteen_below_report,
        '18above_report': this.eighteen_above_report,
        'place_of_incident': this.place_of_incident ? this.place_of_incident : '',
        'from': Moment(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 1, 0, 0, 0)).format('YYYY-MM-DD hh:mm:ss'),
        'to': Moment(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1, 1, 0, 0, 0)).format('YYYY-MM-DD hh:mm:ss'),
      };

    }
    else {

      params = {
        'gender': this.gender ? this.gender : '',
        '18below_victim': this.eighteen_below_victim,
        '18above_victim': this.eighteen_above_victim,
        '18below_report': this.eighteen_below_report,
        '18above_report': this.eighteen_above_report,
        'place_of_incident': this.place_of_incident ? this.place_of_incident : ''
      };
    }
    this.reportService.getReport(params).then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data) {
        this.reports = data;
        console.log(this.reports);
      }
    }, err => {
    })
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.fromDate, "From");
    console.log(this.toDate, "to");
    this.search();

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  search() {
    if (this.eighteen_victim == '') {
      this.eighteen_below_victim = false;
      this.eighteen_above_victim = false;
    }
    if (this.eighteen_victim == 'eighteen_below_victim') {
      this.eighteen_below_victim = 'true';
      this.eighteen_above_victim = false;
    }
    if (this.eighteen_victim == 'eighteen_above_victim') {
      this.eighteen_below_victim = false;
      this.eighteen_above_victim = 'true';
    }
    if (this.eighteen_report == '') {
      this.eighteen_below_report = false;
      this.eighteen_above_report = false;
    }
    if (this.eighteen_report == 'eighteen_below_report') {
      this.eighteen_below_report = 'true';
      this.eighteen_above_report = false;
    }
    if (this.eighteen_report == 'eighteen_above_report') {
      this.eighteen_below_report = false;
      this.eighteen_above_report = 'true';
    }
    let params = {};
    if (this.datefilter) {

      params = {
        'gender': this.gender ? this.gender : '',
        '18below_victim': this.eighteen_below_victim,
        '18above_victim': this.eighteen_above_victim,
        '18below_report': this.eighteen_below_report,
        '18above_report': this.eighteen_above_report,
        'place_of_incident': this.place_of_incident ? this.place_of_incident : '',
        'from': Moment(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 1, 0, 0, 0)).format('YYYY-MM-DD hh:mm:ss'),
        'to': Moment(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1, 1, 0, 0, 0)).format('YYYY-MM-DD hh:mm:ss'),
      };

    }
    else {

      params = {
        'gender': this.gender ? this.gender : '',
        '18below_victim': this.eighteen_below_victim,
        '18above_victim': this.eighteen_above_victim,
        '18below_report': this.eighteen_below_report,
        '18above_report': this.eighteen_above_report,
        'place_of_incident': this.place_of_incident ? this.place_of_incident : ''
      };
    }


    this.reportService.getReport(params).then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data) {
        this.reports = data;
        console.log(this.reports);
      }
    }, err => {
    })
  }


  showDate(date) {
    return Moment(date).format('LLL');
  }

  showX(data) {
    if (data === 1) {
      return 'X';
    }
  }

  viewData(data) {
    console.log(data);
  }

  updateStatus(i, id) {
    console.log(i, "INDEX");
    let params: any = {};
    if (this.status_incident[i] == 'brgy') {
      params = {
        'action_brgy': 1
      }
    }
    if (this.status_incident[i] == 'prosecutor') {
      params = {
        'action_prosecutor': 1
      }
    }
    if (this.status_incident[i] == 'court') {
      params = {
        'action_court': 1
      }
    }
    if (this.status_incident[i] == 'investigation') {
      params = {
        'action_investigation': 1
      }
    }
    if (this.status_incident[i] == '') {
      return 0;
    }
    console.log(params, "test");
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        this.incidentService.updateStatus(id, params).then(response => {
          let data: any = response;
          if (data.data) {
            swal({
              type: 'success',
              title: 'Updated!',
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
    })
  }

}