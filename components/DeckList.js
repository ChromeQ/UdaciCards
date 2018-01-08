import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class DeckList extends Component {

	componentDidMount() {
		fetchDecks().then(decks => {
			if (decks) {
				this.props.dispatch(receiveDecks(decks));
			}
		});
	}

	render() {
		const { decks } = this.props;

		return (
			<View>
				{Object.keys(decks).map(key => {
					const deck = decks[key];

					return <Text key={key}>{deck.title}</Text>;
				})}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		decks: state
	};
}

export default connect(mapStateToProps)(DeckList);
