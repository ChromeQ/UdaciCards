import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers';
import { gray, black, white, red, orange, green, purple } from '../utils/colours';

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
		this.setState(prevState => {
			return {
				counter: prevState.counter + 1,
				flipped: false,
				correct: prevState.correct + 1
			};
		});

		this.quizCompleteCheck();
	}

	markIncorrect = () => {
		this.setState(prevState => {
			return {
				counter: prevState.counter + 1,
				flipped: false,
				incorrect: prevState.incorrect + 1
			};
		});

		this.quizCompleteCheck();
	}

	quizCompleteCheck = () => {
		const { deck } = this.props;
		const { counter } = this.state;

		// If user has answered the last question then the quiz is complete, reset the notification for the next day
		if (counter === deck.questions.length) {
			clearLocalNotifications()
				.then(setLocalNotification);
		}
	}

	restartQuiz = () => {
		this.setState({
			counter: 1,
			flipped: false,
			correct: 0,
			incorrect: 0
		});
	}

	goBack = () => {
		this.props.navigation.goBack();
	}

	render() {
		const { deck } = this.props;
		const { counter, flipped, correct } = this.state;
		const card = deck.questions[counter - 1];

		if (counter > deck.questions.length) {
			const percentage = Math.round((correct / deck.questions.length) * 100);
			const color = percentage < 33 ? red : (percentage < 66 ? orange : green);

			return (
				<View style={styles.container}>
					<Text style={styles.summaryText}>You correctly answered
						<Text style={styles.summaryCount}> {correct} </Text>
						out of
						<Text style={styles.summaryCount}> {deck.questions.length}</Text>
					</Text>

					<View style={styles.summaryScore}>
						<Text style={[styles.summaryScoreText, { color }]}>{percentage}%</Text>
					</View>

					<View>
						<TouchableOpacity style={[styles.button, { backgroundColor: purple }]} onPress={this.restartQuiz}>
							<Text style={styles.buttonText}>Restart Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={this.goBack}>
							<Text style={[styles.buttonText, { color: black }]}>Back</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.deckCount}>Question {counter} of {deck.questions.length}</Text>
				</View>

				<View>
					{!flipped
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
		borderRadius: 2,
		borderColor: gray,
		borderWidth: 1
	},
	buttonText: {
		color: white,
		fontSize: 20
	},
	summaryText: {
		fontSize: 18,
		textAlign: 'center'
	},
	summaryCount: {
		fontSize: 30
	},
	summaryScore: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	summaryScoreText: {
		fontSize: 120
	}
});

function mapStateToProps(state, ownProps) {
	const { key } = ownProps.navigation.state.params;

	return {
		deck: state[key]
	};
}

export default connect(mapStateToProps)(DeckDetails);
