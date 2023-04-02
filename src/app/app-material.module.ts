import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSidenavModule,
    ]
})
export class AppMaterialModule {}