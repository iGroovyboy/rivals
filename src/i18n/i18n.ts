import { addMessages, init, getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';
import ru from './ru.json';
import uk from './uk.json';
import zh from './zh.json';

addMessages('en', en);
addMessages('es', es);
addMessages('ru', ru);
addMessages('hi', hi);
addMessages('uk', uk);
addMessages('zh', zh);

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
	ES = 'es',
	RU = 'ru',
	HI = 'hi',
	UK = 'uk',
	ZH = 'zh'
}

export type AVAILABLE_LANG = keyof typeof LANG;

export const setLocale = async (lang: AVAILABLE_LANG) => {
	localStorage.setItem(LS_KEY_LANG, lang.toLowerCase());
	locale.set(lang.toLowerCase());
	await waitLocale();
};
