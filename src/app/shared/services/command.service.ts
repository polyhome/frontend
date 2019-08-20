import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';

@Injectable({
	providedIn: 'root',
})
export class CommandService {
	constructor(private store: Store) {}

	/**
	 * @description - Send command to the backend to be executed
	 * @param command - Command to be executed
	 */
	exec(command: any) {
		this.store.dispatch(
			new SendWebSocketMessage({ event: 'commands/exec', data: command }),
		);
	}
}
