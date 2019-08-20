import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { MainComponent } from '../shared/components/main-component';
import { CommandService } from '../shared/services/command.service';
import { ElementService } from '../shared/services/element.service';
import { ElementSelectors } from '../shared/store';
import { CardSelectors } from './../shared/store/card/card.selectors';
import { Card } from './models/card.model';
import { CardService } from './services/card.service';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent extends MainComponent implements OnInit {
	/**
	 * @description - Contains the current tag
	 */
	tag: any;

	/**
	 * @description - Gets Id of Card from parent component
	 */
	@Input() cardId: string;

	/**
	 * @description - Contains information about Card
	 */
	card: Card;

	/**
	 * @description - Determines whether Element and Card has been initialised
	 */
	initialised = false;

	/**
	 *
	 * @param renderer - Used to render the Card on screen
	 * @param ref - Reference to the CardComponent itself
	 * @param store - Reference to the NGXS Store
	 * @param elementSvc - Used to fetch CustomElement
	 * @param commandSvc - Used to execute command
	 * @param cardSvc - Used to fetch Card
	 */
	constructor(
		private renderer: Renderer2,
		private ref: ElementRef,
		private store: Store,
		private elementSvc: ElementService,
		private commandSvc: CommandService,
		private cardSvc: CardService,
	) {
		super();
	}

	ngOnInit() {
		this.cardSvc.fetchOne(this.cardId);
		this.store
			.select(CardSelectors.card(this.cardId))
			.pipe(takeUntil(this.end))
			.subscribe(card => {
				if (!card) return;
				this.card = card;
				this.elementSvc.fetchOne(card.tag);
				this.initCard();
				this.initElements();
				this.initialised = true;
			});
	}

	/**
	 * Subscribes to elements in Store, ensuring that updates are reflected
	 * in the UI
	 */
	initElements() {
		if (this.initialised) return;
		this.store
			.select(ElementSelectors.element(this.card.tag))
			.pipe(takeUntil(this.end))
			.subscribe(element => {
				if (!element) return;
				this.elementSvc.loadElementScript(element, this.ref, this.renderer);
			});
	}

	/**
	 * Creates CustomElement tag and renders it
	 */
	initCard() {
		if (this.tag) this.renderer.removeChild(this.ref.nativeElement, this.tag);
		const tag = this.renderer.createElement(this.card.tag);
		tag.card = this.card;
		tag.exec = this.createExec();
		this.renderer.appendChild(this.ref.nativeElement, tag);
		this.tag = tag;
	}

	/**
	 * Creates function, enabling CustomElements to send commands to the backend
	 */
	createExec() {
		return command => {
			this.commandSvc.exec(command);
		};
	}
}
