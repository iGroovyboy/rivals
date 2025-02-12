import { describe, expect, it } from 'vitest';
import {
	deepCloneObject,
	filterHeroesByClass,
	getCounterpicksByHeroId,
	getHeroByName,
	lightenColor,
	parseUrl
} from '$lib/helpers';
import { type APIHeroData, CLASS } from '$lib';

describe('deepCloneObject', () => {
	it('should deep clone an object', () => {
		const obj = { a: 1, b: { c: 2 } };
		const clone = deepCloneObject(obj);
		expect(clone).toEqual(obj);
		expect(clone).not.toBe(obj);
	});
});

const mockHeroes: APIHeroData[] = [
	{ id: 1, name: 'Hero1', class: CLASS.DUELIST },
	{ id: 2, name: 'Hero2', class: CLASS.STRATEGIST }
];

describe('filterHeroesByClass', () => {
	it('should filter heroes by class', () => {
		const filtered = filterHeroesByClass(mockHeroes, CLASS.DUELIST);
		expect(filtered).toEqual([{ id: 1, name: 'Hero1', class: CLASS.DUELIST }]);
	});

	it('should return all data if class is not filterable', () => {
		const filtered = filterHeroesByClass(mockHeroes, 'unknown');
		expect(filtered).toEqual(mockHeroes);
	});
});

describe('getHeroByName', () => {
	it('should find hero by name', () => {
		expect(getHeroByName(mockHeroes, 'Hero1')).toEqual(mockHeroes[0]);
	});

	it('should return undefined for unknown hero', () => {
		expect(getHeroByName(mockHeroes, 'Unknown')).toBeUndefined();
	});
});

const mockCounterpicks = [{ hero_id: 1, counter_hero_id: 2 }];

describe('getCounterpicksByHeroId', () => {
	it('should return counterpick heroes', () => {
		expect(getCounterpicksByHeroId(1, mockHeroes, mockCounterpicks)).toEqual([mockHeroes[1]]);
	});

	it('should return empty array if no counterpicks', () => {
		expect(getCounterpicksByHeroId(99, mockHeroes, mockCounterpicks)).toEqual([]);
	});
});

describe('parseUrl', () => {
	it('should parse a URL correctly', () => {
		const url = 'https://example.com/path1/path2?key=value';
		expect(parseUrl(url)).toEqual({
			host: 'example.com',
			paths: ['path1', 'path2'],
			params: { key: 'value' }
		});
	});
});

describe('lightenColor', () => {
	it('should lighten a hex color ebebeb!', () => {
		expect(lightenColor('#cdcdcd', 60)).toBe('#ebebeb');
		expect(lightenColor('#000000', 100)).toBe('#ffffff');
		expect(lightenColor('#ff0000', 50)).toBe('#ff7f7f');
	});

	it('should return default color if no color is provided', () => {
		expect(lightenColor()).toBe('#ebebeb');
	});
});
