import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralReportComponent } from './general-report.component';

const routes: Routes = [
    {
        path: '',
        component: GeneralReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneralReportRoutingModule {}
