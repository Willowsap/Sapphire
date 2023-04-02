import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { HomeComponent } from './home/home.component';
import { CovarianceProjectComponent } from './covariance-project/covariance-project.component';
import { SoftwareEngineeringComponent } from './software-engineering/software-engineering.component';
import { SoftgelPillsComponent } from './software-engineering/softgel-pills/softgel-pills.component';

const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'attendance', component: AttendanceComponent},
    {path: 'cov', component: CovarianceProjectComponent},
    {path: '3667', redirectTo: '3667/pills', pathMatch: 'full'}, // TODO: Create SE Page
    {path: '3667/pills', component: SoftgelPillsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}