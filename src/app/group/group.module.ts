import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card';
import { StoreModule } from '../shared/store';
import { GroupComponent } from './group.component';
import { GroupService } from './services/group.service';

@NgModule({
	imports: [StoreModule, CardModule, CommonModule],
	providers: [GroupService],
	declarations: [GroupComponent],
	exports: [GroupComponent],
})
export class GroupModule {}
