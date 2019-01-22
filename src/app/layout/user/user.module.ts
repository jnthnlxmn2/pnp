import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule, PageHeaderModule, UserRoutingModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [UserComponent]
})

export class UserModule { }
