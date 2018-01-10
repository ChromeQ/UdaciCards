import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gray } from '../utils/colours';

class DeckDetails extends Component {

	static navigationOptions = ({ navigation }) => {
		const { key } = navigation.state.params;

		return {
			title: `UdaciCards: ${key}`
		};
	}

	handleAddCardPress = () => {
		const { navigation } = this.props;

		navigation.navigate('addCard', { key: navigation.state.params.key });
	}

	handleStartQuizPress = () => {
		const { navigation } = this.props;

		navigation.navigate('deckQuiz', { key: navigation.state.params.key });
	}

	render() {
		const { deck: { title, questions: { length }}} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.deck}>
					<Text style={styles.deckTitle}>{title}</Text>
					<Text style={styles.deckCount}>{length} cards</Text>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={this.handleAddCardPress} style={[styles.button, { borderRightWidth: 1, borderColor: gray }]}>
						<Text style={styles.buttonText}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text onPress={this.handleStartQuizPress} style={[styles.buttonText, { fontWeight: 'bold' }]}>Start Quiz</Text>
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

function mapStateToProps(state, ownProps) {
	const { key } = ownProps.navigation.state.params;

	return {
		deck: state[key]
	};
}

export default connect(mapStateToProps)(DeckDetails);
