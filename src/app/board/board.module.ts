import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupModule } from '../group';
import { StoreModule } from '../shared/store';
import { BoardComponent } from './board.component';
import { BoardService } from './services/board.service';

@NgModule({
	providers: [BoardService],
	declarations: [BoardComponent],
	imports: [GroupModule, CommonModule, StoreModule],
})
export class BoardModule {}
