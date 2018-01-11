import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { submitEntry } from '../utils/api';
import { addDeck } from '../actions';
import { gray, purple, white, red } from '../utils/colours';

class AddDeck extends Component {

	state = {
		title: '',
		error: ''
	}

	handleTextChange = (text) => {
		this.setState({
			title: text,
			error: text ? '' : this.state.error
		});
	}

	onSubmit = () => {
		const { title } = this.state;

		if (!title) {
			return this.setState({ error: 'You must provide a title.' });
		}

		const { dispatch, navigation } = this.props;
		const deck = {
			title,
			questions: []
		};

		dispatch(addDeck(deck));

		submitEntry({
			key: title,
			entry: deck
		});

		navigation.navigate('deckDetails', { key: title });
	}

	render() {
		const { title, error } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.header}>Give your new deck a title</Text>
				<View style={[styles.textWrapper, { borderColor: error ? red : gray }]}>
					<TextInput
						value={title}
						onChangeText={this.handleTextChange}
						autoFocus={true}
						underlineColorAndroid="transparent"
						placeholder="Title"
					/>
				</View>
				{error
					? <Text style={styles.error}>{error}</Text>
					: null
				}
				<TouchableOpacity onPress={this.onSubmit} style={styles.submitButton}>
					<Text style={styles.buttonText}>Save</Text>
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
	header: {
		fontSize: 32,
		marginBottom: 32
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

export default connect()(AddDeck);
