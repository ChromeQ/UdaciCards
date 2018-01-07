import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, purple, white } from '../utils/colours';

export default class AddDeck extends Component {

	onSubmit = () => {

	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.header}>Give your new deck a title</Text>
				<View style={styles.textWrapper}>
					<TextInput value="" autoFocus={true} underlineColorAndroid="transparent" placeholder="Title" />
				</View>
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
		borderColor: gray,
		borderRadius: 2,
		marginBottom: 32
	},
	textInput: {
		height: 40
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
})
