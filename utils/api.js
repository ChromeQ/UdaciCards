import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function submitEntry ({ entry, key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: entry
	}));
}

export function fetchDecks () {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(results => JSON.parse(results));
}
