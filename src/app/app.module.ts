import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CovarianceProjectComponent } from './covariance-project/covariance-project.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SoftgelPillsComponent } from './software-engineering/softgel-pills/softgel-pills.component';
import { SoftwareEngineeringComponent } from './software-engineering/software-engineering.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    HomeComponent,
    CovarianceProjectComponent,
    HeaderComponent,
    FooterComponent,
    SoftgelPillsComponent,
    SoftwareEngineeringComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
