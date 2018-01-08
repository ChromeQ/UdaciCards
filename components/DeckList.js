import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { gray } from '../utils/colours';

class DeckList extends Component {

	componentDidMount() {
		fetchDecks().then(decks => {
			if (decks) {
				this.props.dispatch(receiveDecks(decks));
			}
		});
	}

	handleDeckPress = (key) => {
		this.props.navigation.navigate('deckDetails', { key });
	}

	render() {
		const { decks } = this.props;

		return (
			<View style={styles.container}>
				{Object.keys(decks).map(key => {
					const deck = decks[key];

					return (
						<TouchableOpacity onPress={() => this.handleDeckPress(key)} key={key} style={styles.deck}>
							<Text style={styles.deckTitle}>{deck.title}</Text>
							<Text style={styles.deckCount}>{deck.questions.length} cards</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	deck: {
		padding: 20,
		paddingBottom: 10,
		borderWidth: 1,
		borderColor: gray,
		marginBottom: 20,
		borderRadius: 2
	},
	deckTitle: {
		fontSize: 24,
		marginBottom: 24
	},
	deckCount: {
		color: gray,
		fontSize: 16
	}
});

function mapStateToProps(state) {
	return {
		decks: state
	};
}

export default connect(mapStateToProps)(DeckList);
