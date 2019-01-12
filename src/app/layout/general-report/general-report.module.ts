import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GeneralReportRoutingModule } from './general-report-routing.module';
import { GeneralReportComponent } from './general-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule,PageHeaderModule, GeneralReportRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [GeneralReportComponent]
})

export class GeneralReportModule { }
