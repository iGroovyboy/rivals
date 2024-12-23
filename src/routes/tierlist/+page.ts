import type { PageLoad } from './$types';
import type { APIHeroData } from '$lib';
import { supabase } from '$lib/auth.svelte';
import { deepCloneObject } from '$lib/helpers';

export const load: PageLoad = async () => {
	let { data: heroes }: { data: APIHeroData[] } = await supabase.from('heroes').select('*');
	if (!heroes) {
		console.error('No heroes found.');
	}

	return {
		heroes,
		tierlist: getEmptyTierlist(heroes),
		default: getDefaultTierlist(heroes)
	};
};

const getDefaultTierlist = () => {
	return [
		{
			id: 'S',
			text: 'S',
			color: 'rgb(255, 127, 127)',
			items: [
				{ id: 3, name: 'Doctor Strange', class: 'vanguard' },
				{ id: 8, name: 'Venom', class: 'vanguard' },
				{ id: 12, name: 'Hela', class: 'duelist' },
				{ id: 18, name: 'Psylocke', class: 'duelist' },
				{ id: 31, name: 'Luna Snow', class: 'strategist' },
				{ id: 32, name: 'Mantis', class: 'strategist' }
			]
		},
		{
			id: 'A',
			text: 'A',
			color: 'rgb(255, 191, 127)',
			items: [
				{ id: 5, name: 'Magneto', class: 'vanguard' },
				{ id: 1, name: 'Bruce Banner', class: 'vanguard' },
				{ id: 24, name: 'The Punisher', class: 'duelist' },
				{ id: 15, name: 'Magik', class: 'duelist' },
				{ id: 28, name: 'Cloak & Dagger', class: 'strategist' },
				{ id: 27, name: 'Adam Warlock', class: 'strategist' },
				{ id: 29, name: 'Jeff the Land Shark', class: 'strategist' }
			]
		},
		{
			id: 'B',
			text: 'B',
			color: 'rgb(255, 223, 127)',
			items: [
				{ id: 4, name: 'Groot', class: 'vanguard' },
				{ id: 22, name: 'Star-Lord', class: 'duelist' },
				{ id: 9, name: 'Black Panther', class: 'duelist' },
				{ id: 16, name: 'Moon Knight', class: 'duelist' },
				{ id: 33, name: 'Rocket Raccoon', class: 'strategist' },
				{ id: 30, name: 'Loki', class: 'strategist' }
			]
		},
		{
			id: 'C',
			text: 'C',
			color: 'rgb(255, 255, 127)',
			items: [
				{ id: 2, name: 'Captain America', class: 'vanguard' },
				{ id: 7, name: 'Thor', class: 'vanguard' },
				{ id: 6, name: 'Peni Parker', class: 'vanguard' },
				{ id: 25, name: 'Winter Soldier', class: 'duelist' },
				{ id: 17, name: 'Namor', class: 'duelist' },
				{ id: 20, name: 'Spider-Man', class: 'duelist' }
			]
		},
		{
			id: 'D',
			text: 'D',
			color: 'rgb(191, 255, 127)',
			items: [
				{ id: 19, name: 'Scarlet Witch', class: 'duelist' },
				{ id: 10, name: 'Black Widow', class: 'duelist' },
				{ id: 11, name: 'Hawkeye', class: 'duelist' },
				{ id: 21, name: 'Squirrel Girl', class: 'duelist' }
			]
		},
		{
			id: 'E',
			text: 'E',
			color: 'rgb(127, 255, 127)',
			items: [
				{ id: 14, name: 'Iron Man', class: 'duelist' },
				{ id: 23, name: 'Storm', class: 'duelist' },
				{ id: 13, name: 'Iron Fist', class: 'duelist' },
				{ id: 26, name: 'Wolverine', class: 'duelist' }
			]
		},
		{
			id: 'F',
			text: 'F',
			color: 'rgb(127, 255, 255)',
			items: []
		},
		{
			id: 'HEROES_LIST',
			text: 'HEROES',
			color: 'rgb(255, 255, 255)',
			items: []
		}
	];
};

const getEmptyTierlist = (heroes) => {
	return [
		{
			id: 'S',
			text: 'S',
			color: 'rgb(255, 127, 127)',
			items: []
		},
		{
			id: 'A',
			text: 'A',
			color: 'rgb(255, 191, 127)',
			items: []
		},
		{
			id: 'B',
			text: 'B',
			color: 'rgb(255, 223, 127)',
			items: []
		},
		{
			id: 'C',
			text: 'C',
			color: 'rgb(255, 255, 127)',
			items: []
		},
		{
			id: 'D',
			text: 'D',
			color: 'rgb(191, 255, 127)',
			items: []
		},
		{
			id: 'E',
			text: 'E',
			color: 'rgb(127, 255, 127)',
			items: []
		},
		{
			id: 'F',
			text: 'F',
			color: 'rgb(127, 255, 255)',
			items: []
		},
		{
			id: 'HEROES_LIST',
			text: 'HEROES',
			color: 'rgb(255, 255, 255)',
			items: deepCloneObject(heroes) || []
		}
	];
};
