import { createSelector, Selector } from '@ngxs/store';
import { GroupStateModel } from './group-state.model';
import { GroupsState } from './group.state';

export class GroupSelectors {
	/**
	 * @emits - All Groups in Store
	 */
	@Selector([GroupsState])
	static groups({ groups }: GroupStateModel) {
		return groups;
	}

	/**
	 * @emits - Specified Group
	 * @param id - Id of group to subscribe to
	 */
	static group(id: string) {
		return createSelector(
			[GroupsState],
			({ groups }: GroupStateModel) => {
				return groups.find(g => g._id === id);
			},
		);
	}
}
