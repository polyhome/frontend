import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatProgressSpinnerModule,
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	imports: [
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	exports: [
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
})
export class MaterialModule {}
