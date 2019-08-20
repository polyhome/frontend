import { NgModule } from '@angular/core';
import {
	NgxsRouterPluginModule,
	RouterStateSerializer,
} from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { environment } from '../../../environments/environment';
import { BoardsState } from './board/board.state';
import { CardsState } from './card/card.state';
import { ElementsState } from './element/element.state';
import { GroupsState } from './group/group.state';
import { CustomRouterStateSerializer } from './router/router-state.serializer';

@NgModule({
	imports: [
		NgxsModule.forRoot([BoardsState, CardsState, GroupsState, ElementsState], {
			developmentMode: !environment.production,
		}),
		NgxsRouterPluginModule.forRoot(),
		NgxsWebsocketPluginModule.forRoot({
			url: 'ws://' + environment.apiUrl,
		}),
	],
	providers: [
		{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
	],
})
export class StoreModule {}
