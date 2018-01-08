import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gray } from '../utils/colours';

export default class DeckDetails extends Component {

	static navigationOptions = ({ navigation }) => {
		const { deck } = navigation.state.params;

		return {
			title: `UdaciCards: ${deck.title}`
		};
	}

	render() {
		const { deck } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<View style={styles.deck}>
					<Text style={styles.deckTitle}>{deck.title}</Text>
					<Text style={styles.deckCount}>{deck.questions.length} cards</Text>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.button, { borderRightWidth: 1, borderColor: gray }]}>
						<Text style={styles.buttonText}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
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
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2
	},
	deckTitle: {
		fontSize: 24,
		marginBottom: 24
	},
	deckCount: {
		color: gray,
		fontSize: 16
	},
	buttonContainer: {
		borderColor: gray,
		borderWidth: 1,
		flexDirection: 'row',
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
		borderTopWidth: 0
	},
	button: {
		flex: 1,
		padding: 20,
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	buttonText: {
		fontSize: 16
	}
});
