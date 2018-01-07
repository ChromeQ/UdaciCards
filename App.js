import React, { Component } from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import reducer from './reducers';
import { purple, white } from './utils/colours';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

const Tabs = TabNavigator({
    addDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='plus-outline' size={30} color={tintColor} />
        }
    },
    deckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-outline' size={30} color={tintColor} />
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple
        }
    }
});

const MainNavigator = StackNavigator({
    decks: {
        screen: Tabs
    },
    // createDecks: {
    //     screen: EntryDetail,
    //     navigationOptions: {
    //         headerTintColor: white,
    //         headerStyle: {
    //             backgroundColor: purple
    //         }
    //     }
    // }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
                        <StatusBar translucent backgroundColor={purple} barStyle='light-content' />
                    </View>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}