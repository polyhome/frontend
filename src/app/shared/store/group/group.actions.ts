import { Group } from '../../../group/models/group.model';

export class AddGroups {
	static readonly type = '[Groups] Add Groups';
	constructor(public docs: Group[]) {}
}

export class AddGroup {
	static readonly type = '[Groups] Add Group';
	constructor(public doc: Group) {}
}

export class SetCurrentGroups {
	static readonly type = '[Groups] Set Current Group';
	constructor(public groups: string[]) {}
}

export class UpdateGroups {
	static readonly type = '[Groups] Update Groups';
	constructor(public docs: Group[]) {}
}
