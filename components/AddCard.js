import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { submitEntry } from '../utils/api';
import { addCard } from '../actions';
import { gray, purple, white, red } from '../utils/colours';

class AddCard extends Component {

	state = {
		question: '',
		answer: '',
		error: ''
	}

	static navigationOptions = ({ navigation }) => {
		const { key } = navigation.state.params;

		return {
			title: `Add Card: ${key}`
		};
	}

	handleTextChange = (text, input) => {
		this.setState({
			[input]: text,
			error: text ? '' : this.state.error
		});
	}

	onSubmit = () => {
		const { question, answer } = this.state;

		if (!question || !answer) {
			return this.setState({ error: 'You must provide both a question and an answer.' });
		}

		const { dispatch, navigation, deck } = this.props;
		const { key } = navigation.state.params;
		const card = {
			question,
			answer
		};

		dispatch(addCard(card, key));

		deck.questions.push(card);
		submitEntry({
			key,
			entry: deck
		});

		navigation.goBack();
	}

	render() {
		const { question, answer, error } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.label}>Question:</Text>
				<View style={[styles.textWrapper, { borderColor: error ? red : gray }]}>
					<TextInput
						value={question}
						onChangeText={(text) => this.handleTextChange(text, 'question')}
						autoFocus={true}
						underlineColorAndroid="transparent"
					/>
				</View>
				<Text style={styles.label}>Answer:</Text>
				<View style={[styles.textWrapper, { borderColor: error ? red : gray }]}>
					<TextInput
						value={answer}
						onChangeText={(text) => this.handleTextChange(text, 'answer')}
						autoFocus={false}
						underlineColorAndroid="transparent"
					/>
				</View>
				{error
					? <Text style={styles.error}>{error}</Text>
					: null
				}
				<TouchableOpacity onPress={this.onSubmit} style={styles.submitButton}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	label: {
		fontSize: 16,
		color: gray,
		alignSelf: 'flex-start',
		marginLeft: '10%',
		paddingBottom: 5
	},
	textWrapper: {
		width: '80%',
		padding: 10,
		borderWidth: 1,
		borderRadius: 2,
		marginBottom: 32
	},
	textInput: {
		height: 40
	},
	error: {
		color: red,
		marginTop: -24,
		marginBottom: 32
	},
	submitButton: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30
	},
	buttonText: {
		fontSize: 20,
		color: white
	}
});

function mapStateToProps(state, ownProps) {
	const { key } = ownProps.navigation.state.params;

	return {
		deck: state[key]
	};
}

export default connect(mapStateToProps)(AddCard);
