import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    StackNavigator,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import { BackHandler } from 'react-native'
import RedditList from '../components/RedditList'
import RedditViewPost from '../components/RedditViewPost'

// Screens
class MainScreen extends React.Component {
    static navigationOptions = ({ nav }) => ({
        title: 'Reddit',
    })
    render() {
        return <RedditList />
    }
}
class ViewPostScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    render() {
        const item = this.props.navigation.state.params
        return <RedditViewPost item={item} />
    }
}
const AppRouteConfigs = {
    Main: { screen: MainScreen },
    ViewPost: { screen: ViewPostScreen },
}
export const AppNavigator = StackNavigator(AppRouteConfigs)

// Root navigation component
class Nav extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props
        if (nav.index === 0) {
            return false
        }
        dispatch(NavigationActions.back())
        return true
    }

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
            />
        )
    }
}

const AppWithNavigationState = connect(state => ({ nav: state.nav }))(Nav)
export default AppWithNavigationState
