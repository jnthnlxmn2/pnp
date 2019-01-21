import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IncidentService } from 'src/app/services/incident.service';
import { ReportService } from 'src/app/services/report.service';
import * as Moment from 'moment'
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    reports: any = [];
    brgy: any = 0;
    prosecutor: any = 0;
    court: any = 0;
    investigator: any = 0;
    // Pie
    public pieChartLabels: string[] = [
        '18 Above',
        'Minor',
    ];
    public pieChartLabels2: string[] = [
        'Male',
        'Female',
    ];
    public doughnutChartLabels: string[] = [
        'Barangay',
        'Prosecutor',
        'Court',
        'Investigator'
    ];
    overage: any = 0;
    underage: any = 0;
    public pieChartData: number[] = [this.overage, this.underage];
    public doughnutChartData: number[] = [0, 0, 0, 0];
    male: any = 0;
    female: any = 0;
    public pieChartData2: number[] = [0, 0];
    public pieChartType: any = 'pie';
    doughnutChartType = 'doughnut';
    data: any = {};
    provinces: any = [];
    polarAreaChartType: any = 'polarArea';

    public polarAreaChartLabels: string[] = [
        'Zambales', 'Tarlac', 'Pampanga', 'Nueva Ecija', 'Bulacan', 'Bataan', 'Aurora'
    ];
    Zambales: any = 0;
    Tarlac: any = 0;
    Pampanga: any = 0;
    NuevaEcija: any = 0;
    Bulacan: any = 0;
    Bataan: any = 0;
    Aurora: any = 0;
    public polarAreaChartData: number[] = [this.Zambales, this.Tarlac, this.Pampanga, this.NuevaEcija, this.Bulacan, this.Bataan, this.Aurora];
    public polarAreaLegend: boolean;
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */

    constructor(public incidentService: IncidentService,
        public reportService: ReportService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );


    }

    ngOnInit() {

        this.incidentService.getProvince().then(response => {
            let data: any = response;
            if (data.data) {
                this.provinces = data.data;
            }
        }, err => {
        })


        let year: any = Moment().format('YYYY');
        let from = Moment().format(year + '-' + 1 + '-' + 1 + ' ' + 0 + ':' + 0 + ':' + 0);
        let to = Moment().format(year + '-' + 12 + '-' + 31 + ' ' + 0 + ':' + 0 + ':' + 0);

        console.log(from, "From");

        console.log(to, "to");
        let params = { 'from': from, 'to': to };
        this.reportService.getReport(params).then(response => {
            let data: any = response;
            if (data) {
                this.reports = data;
                this.reports.forEach(report => {
                    console.log(report.itm_c_age)
                    if (report.itm_c_age) {
                        if (report.itm_c_age >= 18) {
                            this.overage = this.overage + 1;
                        } else {
                            if (report.itm_c_age <= 18) {
                                this.underage = this.underage + 1;
                            }
                        }
                    } else {
                        if (report.itm_a_age >= 18) {
                            this.overage = this.overage + 1;
                        } else {
                            if (report.itm_a_age <= 18) {
                                this.underage = this.underage + 1;
                            }
                        }
                    }


                    if (report.itm_c_gender) {
                        if (report.itm_c_gender == 'Male') {
                            this.male = this.male + 1;
                        } else {
                            if (report.itm_c_gender == 'Female') {
                                this.female = this.female + 1;
                            }
                        }
                    } else {
                        if (report.itm_a_gender == 'Male') {
                            this.male = this.male + 1;
                        } else {
                            if (report.itm_a_gender == 'Female') {
                                this.female = this.female + 1;
                            }
                        }
                    }


                    if (report.action_brgy) {
                        this.brgy = this.brgy + 1;
                    }
                    if (report.action_prosecutor) {
                        this.prosecutor = this.prosecutor + 1;
                    }
                    if (report.action_court) {
                        this.court = this.court + 1;
                    }
                    if (report.action_investigation) {
                        this.investigator = this.investigator + 1;
                    }



                    if (report.incident_place.name == 'Zambales') {
                        this.Zambales = this.Zambales + 1;
                    }
                    if (report.incident_place.name == 'Tarlac') {
                        this.Tarlac = this.Tarlac + 1;
                    }

                    if (report.incident_place.name == 'Pampanga') {
                        this.Pampanga = this.Pampanga + 1;
                    }

                    if (report.incident_place.name == 'Nueva Ecija') {
                        this.NuevaEcija = this.NuevaEcija + 1;
                    }

                    if (report.incident_place.name == 'Bulacan') {
                        this.Bulacan = this.Bulacan + 1;
                    }

                    if (report.incident_place.name == 'Bataan') {
                        this.Bataan = this.Bataan + 1;
                    }

                    if (report.incident_place.name == 'Aurora') {
                        this.Aurora = this.Aurora + 1;
                    }



                });
                this.polarAreaChartData = [this.Zambales, this.Tarlac, this.Pampanga, this.NuevaEcija, this.Bulacan, this.Bataan, this.Aurora]
                this.doughnutChartData = [this.brgy, this.prosecutor, this.court, this.investigator];
                this.pieChartData = [this.overage, this.underage];
                this.pieChartData2 = [this.male, this.female];
                console.log(this.underage);
            }
        }, err => {
        })
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }


}
