import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';

@Injectable()
export class BoardService {
	constructor(private store: Store) {}

	fetchAll() {
		this.store.dispatch(
			new SendWebSocketMessage({
				event: 'boards/fetch-all',
			}),
		);
	}
}
