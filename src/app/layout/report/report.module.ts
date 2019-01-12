import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule,PageHeaderModule, ReportRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [ReportComponent]
})

export class ReportModule { }
