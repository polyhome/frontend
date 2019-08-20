import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardModule } from './board';
import { CardModule } from './card';
import { GroupModule } from './group';
import { LoadingComponent } from './loading/loading.component';
import { MainComponent } from './shared/components/main-component';
import { MaterialModule } from './shared/modules/material/material.module';
import { StoreModule } from './shared/store';

@NgModule({
	declarations: [AppComponent, LoadingComponent, MainComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		StoreModule,
		BoardModule,
		GroupModule,
		CardModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
