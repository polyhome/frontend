import { Selector } from '@ngxs/store';
import { BoardStateModel } from './board-state.model';
import { BoardsState } from './board.state';

export class BoardSelectors {
	/**
	 * @emits - All Boards in Store
	 */
	@Selector([BoardsState])
	static boards({ boards }: BoardStateModel) {
		return boards;
	}

	/**
	 * @emits - Current Board
	 */
	@Selector([BoardsState])
	static curBoard({ boards, curBoard }: BoardStateModel) {
		return boards.find(b => b._id === curBoard);
	}
}
