import { addMessages, init, getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import en from './en.json';
import ru from './ru.json';
import uk from './uk.json';

addMessages('en', en);
addMessages('ru', ru);
addMessages('uk', uk);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});

const LS_KEY_LANG = 'lang';

export const initI18N = async () => {
	const lang = localStorage.getItem(LS_KEY_LANG);
	locale.set(lang || window.navigator.language);
	await waitLocale();
};

export enum LANG {
	EN = 'en',
	RU = 'ru',
	UK = 'uk'
}

export type AVAILABLE_LANG = keyof typeof LANG;

export const setLocale = async (lang: AVAILABLE_LANG) => {
	localStorage.setItem(LS_KEY_LANG, lang.toLowerCase());
	locale.set(lang.toLowerCase());
	await waitLocale();
};
