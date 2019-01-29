import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { WcpsRoutingModule } from './wcps-routing.module';
import { WcpsComponent } from './wcps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { SearchPipe } from '../../pipe/search.pipe';

@NgModule({
    imports: [CommonModule, PageHeaderModule, NgxPaginationModule, WcpsRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [WcpsComponent, SearchPipe]
})

export class WcpsModule { }
