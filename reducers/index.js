import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators'

const reddit = (state = { refreshing: false }, action) => {
    switch (action.type) {
        case 'REDDIT_REFRESHING':
            return { ...state, refreshing: true }
        case 'REDDIT_LOADED':
            return { ...state, refreshing: false, posts: action.posts }
        case 'REDDIT_ERROR':
            return {
                ...state,
                refreshing: false,
                posts: undefined,
            }
        default:
            return state
    }
}

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Main')
)
const nav = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'VIEW_POST':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: 'ViewPost',
                    params: action.item,
                }),
                state
            )
            break
        default:
            nextState = AppNavigator.router.getStateForAction(action, state)
    }
    return nextState || state
}

export default combineReducers({ reddit, nav })
