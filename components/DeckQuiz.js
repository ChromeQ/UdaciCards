import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, black, white, red, green } from '../utils/colours';

class DeckDetails extends Component {

	state = {
		counter: 1,
		flipped: false,
		correct: 0,
		incorrect: 0
	}

	static navigationOptions = ({ navigation }) => {
		const { key } = navigation.state.params;

		return {
			title: `Quiz: ${key}`
		};
	}

	flipCard = () => {
		this.setState({ flipped: !this.state.flipped });
	}

	markCorrect = () => {
		this.setState(state => ({
			counter: state.counter + 1,
			flipped: false,
			correct: state.correct + 1
		}));
	}

	markIncorrect = () => {
		this.setState(state => ({
			counter: state.counter + 1,
			flipped: false,
			incorrect: state.incorrect + 1
		}));
	}

	render() {
		const { deck } = this.props;
		const { counter, flipped } = this.state;
		const card = deck.questions[counter - 1];

		if (counter > deck.questions.length) {
			return (
				<View><Text>Summary screen</Text></View>
			);
		}

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.deckCount}>Question {counter} of {deck.questions.length}</Text>
				</View>

				<View>
					{flipped
						? (<View style={styles.card}>
							<Text style={styles.cardText}>{card.question}</Text>
						</View>)
						: (<View style={[styles.card, { backgroundColor: black }]}>
							<Text style={[styles.cardText, { color: white }]}>{card.answer}</Text>
						</View>)
					}

					<TouchableOpacity onPress={this.flipCard}>
						<Text style={styles.flipText}>Flip</Text>
					</TouchableOpacity>
				</View>

				<View>
					<TouchableOpacity style={[styles.button, { backgroundColor: green }]} onPress={this.markCorrect}>
						<Text style={styles.buttonText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, { backgroundColor: red }]} onPress={this.markIncorrect}>
						<Text style={styles.buttonText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between'
	},
	deckCount: {
		color: gray,
		fontSize: 16
	},
	card: {
		padding: 20,
		borderWidth: 1,
		borderColor: gray,
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
		marginBottom: 20
	},
	cardText: {
		fontSize: 24
	},
	flipCard: {
		flex: 1
	},
	flipText: {
		color: gray,
		fontSize: 18,
		textAlign: 'center'
	},
	button: {
		flex: 1,
		padding: 30,
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 20,
		borderRadius: 2
	},
	buttonText: {
		color: white,
		fontSize: 20
	}
});

function mapStateToProps(state, ownProps) {
	const { key } = ownProps.navigation.state.params;

	return {
		deck: state[key]
	};
}

export default connect(mapStateToProps)(DeckDetails);
