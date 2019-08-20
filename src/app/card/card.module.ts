import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from './../shared/store/store.module';
import { CardComponent } from './card.component';
import { CardService } from './services/card.service';

@NgModule({
	providers: [CardService],
	imports: [StoreModule, CommonModule],
	declarations: [CardComponent],
	exports: [CardComponent],
})
export class CardModule {}
