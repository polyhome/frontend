import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';
import { Element, ElementSelectors } from '../store';

@Injectable({
	providedIn: 'root',
})
export class ElementService {
	constructor(private store: Store) {}

	/**
	 * @description - Sends command to backend, to send the specified Element over
	 * the WebSocket channel
	 * @param id - Id of Element to fetch
	 */
	fetchOne(id: string) {
		if (this.store.selectSnapshot(ElementSelectors.element(id))) return;
		this.store.dispatch(
			new SendWebSocketMessage({
				event: 'elements/fetch-one',
				data: id,
			}),
		);
	}

	/**
	 * @description - Loads the script associated with the Element
	 * @param element - Element to be loaded
	 * @param ref - Reference to a component
	 * @param renderer - Renderer to render the Element
	 */
	loadElementScript(element: Element, ref: ElementRef, renderer: Renderer2) {
		return new Promise((resolve, reject) => {
			const script = renderer.createElement('script');
			script.type = element.srcType;
			script.src = element.url + 'index.js';
			script.onLoad = () => {
				resolve(true);
			};

			script.onerror = () => {
				reject(false);
			};

			renderer.appendChild(ref.nativeElement, script);
		});
	}
}
