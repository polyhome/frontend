import { Board } from '../../../board/models/board.model';

export class AddBoards {
	static readonly type = '[Boards] Add Boards';
	constructor(public docs: Board[]) {}
}

export class UpdateCurrentBoard {
	static readonly type = '[Boards] Update Current Board';
	constructor(public board: string) {}
}

export class UpdateBoards {
	static readonly type = '[Boards] Update Boards';
	constructor(public docs: Board[]) {}
}
