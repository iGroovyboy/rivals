export const CLASS = {
	ALL: 'all',
	VANGUARD: 'vanguard',
	DUELIST: 'duelist',
	STRATEGIST: 'strategist'
};

export const filterableClasses = [CLASS.VANGUARD, CLASS.DUELIST, CLASS.STRATEGIST];

export type Classname = CLASS.VANGUARD | CLASS.DUELIST | CLASS.STRATEGIST;

export type Counterpicks = Record<Classname, HeroData[]>;

export interface HeroData {
	counterpicks: string[];
	icon: string;
	name: string;
	role: string;
	data?: unknown;
}

export interface APIHeroData {
	name: string;
	class: string;
}
