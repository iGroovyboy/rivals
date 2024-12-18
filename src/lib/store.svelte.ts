import { LS_KEYS } from '$lib/index';

const store = $state({
	favorites: []
});

export const useStore = {
	get favorites() {
		return store.favorites || [];
	},

	set favorites(name: string) {
		if (store.favorites.includes(name)) {
			store.favorites = store.favorites.filter((i) => i !== name);
		} else {
			store.favorites.push(name);
		}

		localStorage.setItem(LS_KEYS.FAVORITES, JSON.stringify(store.favorites));
	}
};

export const restoreStore = () => {
	const favString = localStorage.getItem(LS_KEYS.FAVORITES);
	if (!favString) {
		return;
	}

	try {
		store.favorites = JSON.parse(favString);
	} catch (e) {
		console.error(e);
	}
};
