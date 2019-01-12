import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix', canActivate: [AuthGuard] },
            { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'report', canActivate: [AuthGuard], loadChildren: './report/report.module#ReportModule' },
            { path: 'charts', canActivate: [AuthGuard], loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', canActivate: [AuthGuard], loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', canActivate: [AuthGuard], loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', canActivate: [AuthGuard], loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', canActivate: [AuthGuard], loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', canActivate: [AuthGuard], loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', canActivate: [AuthGuard], loadChildren: './blank-page/blank-page.module#BlankPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
