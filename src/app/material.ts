import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatCheckboxModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatStepperModule, MatSelectModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCheckboxModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatStepperModule,
        MatSelectModule,
        MatTableModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCheckboxModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatStepperModule,
        MatSelectModule,
        MatTableModule
    ]
})

export class MaterialModule { }