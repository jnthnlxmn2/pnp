import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WcpsComponent } from './wcps.component';

const routes: Routes = [
    {
        path: '',
        component: WcpsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WcpsRoutingModule {}
