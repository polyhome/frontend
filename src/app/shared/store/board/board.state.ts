import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Board } from './../../../board';
import { BoardStateModel } from './board-state.model';
import { AddBoards, UpdateBoards, UpdateCurrentBoard } from './board.actions';

@State<BoardStateModel>({
	name: 'boards',
	defaults: {
		boards: [],
		curBoard: '',
	},
})
export class BoardsState {
	@Action(AddBoards)
	addBoards(
		{ getState, patchState }: StateContext<BoardStateModel>,
		{ docs: boards }: AddBoards,
	) {
		patchState({
			boards: [...getState().boards, ...boards].sort(
				(a, b) => a.position - b.position,
			),
		});
	}

	@Action(UpdateCurrentBoard)
	updateCurrentBoard(
		{ patchState }: StateContext<BoardStateModel>,
		{ board }: UpdateCurrentBoard,
	) {
		patchState({ curBoard: board });
	}

	@Action(UpdateBoards)
	updateBoards(
		{ setState }: StateContext<BoardStateModel>,
		{ docs }: UpdateBoards,
	) {
		docs.forEach(board => {
			setState(
				patch({
					boards: updateItem<Board>(b => b._id === board._id, board),
				}),
			);
		});
	}
}
