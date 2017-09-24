import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { AsyncStorage, View, StyleSheet, StatusBar } from 'react-native'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import AppWithNavigationState from './navigators'

import reducers from './reducers'

// Redux
const enhancer = composeWithDevTools(applyMiddleware(thunk), autoRehydrate())
const store = createStore(reducers, undefined, enhancer)
persistStore(store, { storage: AsyncStorage })

// Android compatibility
const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
})

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={style.wrapper}>
                    <AppWithNavigationState />
                </View>
            </Provider>
        )
    }
}
