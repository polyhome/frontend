import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Group } from '../../../group';
import { GroupStateModel } from './group-state.model';
import { AddGroup, AddGroups, UpdateGroups } from './group.actions';

@State<GroupStateModel>({
	name: 'groups',
	defaults: {
		groups: [],
	},
})
export class GroupsState {
	@Action(AddGroups)
	addGroups(
		{ getState, patchState }: StateContext<GroupStateModel>,
		{ docs }: AddGroups,
	) {
		patchState({
			groups: [...getState().groups, ...docs],
		});
	}

	@Action(AddGroup)
	addGroup(
		{ getState, patchState }: StateContext<GroupStateModel>,
		{ doc }: AddGroup,
	) {
		patchState({
			groups: [...getState().groups, doc],
		});
	}

	@Action(UpdateGroups)
	updateGroups(
		{ setState }: StateContext<GroupStateModel>,
		{ docs }: UpdateGroups,
	) {
		docs.forEach(group => {
			setState(
				patch({
					groups: updateItem<Group>(g => g._id === group._id, group),
				}),
			);
		});
	}
}
