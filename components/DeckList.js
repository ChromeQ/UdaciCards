import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { gray, white, purple } from '../utils/colours';

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

	handleAddDeckPress = () => {
		this.props.navigation.navigate('addDeck');
	}

	render() {
		const { decks } = this.props;
		const decksCount = Object.keys(decks).length;

		return (
			<View style={styles.container}>
				{decksCount === 0
					? (
						<View>
							<Text style={styles.emptyText}>There are currently no decks to review. Create a new deck and add some question cards now 😄</Text>
							<TouchableOpacity onPress={this.handleAddDeckPress} style={styles.button}>
								<Text style={styles.buttonText}>Add Deck</Text>
							</TouchableOpacity>
						</View>
					)
					: (
						Object.keys(decks).map(key => {
							const deck = decks[key];

							return (
								<TouchableOpacity onPress={() => this.handleDeckPress(key)} key={key} style={styles.deck}>
									<Text style={styles.deckTitle}>{deck.title}</Text>
									<Text style={styles.deckCount}>{deck.questions.length} cards</Text>
								</TouchableOpacity>
							);
						})
					)
				}
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
	},
	emptyText: {
		fontSize: 18,
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 40
	},
	button: {
		flex: 1,
		padding: 30,
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 20,
		borderRadius: 2,
		backgroundColor: purple,
		borderWidth: 1
	},
	buttonText: {
		color: white,
		fontSize: 20
	},
});

function mapStateToProps(state) {
	return {
		decks: state
	};
}

export default connect(mapStateToProps)(DeckList);
