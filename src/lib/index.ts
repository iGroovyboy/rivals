export const CLASS = {
	ALL: 'all',
	VANGUARD: 'vanguard',
	DUELIST: 'duelist',
	STRATEGIST: 'strategist'
};

export const filterableClasses = [CLASS.VANGUARD, CLASS.DUELIST, CLASS.STRATEGIST];

export type Classname = CLASS.VANGUARD | CLASS.DUELIST | CLASS.STRATEGIST;

export type Counterpicks = Record<Classname, APIHeroData[]>;

export interface HeroData {
	counterpicks: string[];
	icon: string;
	name: string;
	role: string;
	data?: unknown;
}

export interface APIHeroData {
	id: number;
	name: string;
	class: string;
	counterpicks?: unknown;
}

export interface APICounterpickData {
	id: number;
	hero_id: number;
	counter_hero_id: number;
	created_at?: string;
}
