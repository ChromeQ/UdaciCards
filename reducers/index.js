import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks (state = {}, action) {
	const { deck, question, key } = action;

	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_DECK:
			return {
				...state,
				[deck.title]: { ...deck }
			};
		case ADD_CARD:
			return {
				...state,
				[key]: {
					...state[key],
					questions: state[key].questions.concat(question)
				}
			};
		default:
			return state;
	}
}

export default decks;
