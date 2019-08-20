import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { MainComponent } from '../shared/components/main-component';
import { GroupSelectors } from '../shared/store';
import { Group } from './models/group.model';
import { GroupService } from './services/group.service';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends MainComponent implements OnInit {
	/**
	 * @description - Contains information about this Group
	 */
	group: Group;

	/**
	 * @emits - When this particular group has been changed in the Store
	 */
	@Output() groupChanged = new EventEmitter<Group>();

	/**
	 * @description - Id of Group to fetch
	 */
	@Input() groupId: string;

	constructor(private store: Store, private groupSvc: GroupService) {
		super();
	}

	ngOnInit() {
		this.groupSvc.fetchOne(this.groupId);
		this.store
			.select(GroupSelectors.group(this.groupId))
			.pipe(takeUntil(this.end))
			.subscribe(group => {
				if (!group) return;
				this.groupChanged.emit(group);
				this.group = group;
			});
	}
}
