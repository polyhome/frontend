import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';
import { GroupSelectors } from '../../shared/store';

@Injectable()
export class GroupService {
	constructor(private store: Store) {}

	/**
	 * @description - Issues command to backend to fetch groups
	 *
	 * @param groups - Groups to fetch
	 */
	fetchMany(groups: string[]): void {
		const curGroups = this.store
			.selectSnapshot(GroupSelectors.groups)
			.map(g => g._id);
		groups = groups.filter(g => !curGroups.includes(g));
		if (groups.length === 0) return;
		this.store.dispatch(
			new SendWebSocketMessage({ event: 'groups/fetch-many', data: groups }),
		);
	}

	/**
	 * @description - Sends command to backend, to send the selected group
	 * over the WebSocket channel
	 * @param id - Id of the group to fetch
	 */
	fetchOne(id: string): void {
		const exists = !!this.store.selectSnapshot(GroupSelectors.group(id));
		if (!exists)
			this.store.dispatch(
				new SendWebSocketMessage({ event: 'groups/fetch-one', data: id }),
			);
	}
}
