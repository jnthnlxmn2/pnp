import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { GeneralReportRoutingModule } from './general-report-routing.module';
import { GeneralReportComponent } from './general-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { SearchPipe } from '../../pipe/search.pipe';

@NgModule({
    imports: [CommonModule, PageHeaderModule, NgxPaginationModule, GeneralReportRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [GeneralReportComponent, SearchPipe]
})

export class GeneralReportModule { }
