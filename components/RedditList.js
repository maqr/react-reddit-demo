import React from 'react'
import { TouchableHighlight, View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions from '../actions'
import RedditListItem from '../components/RedditListItem'

const colors = {
    separator: '#ccc',
    underlay: '#369',
}

const style = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    separator: {
        backgroundColor: colors.separator,
        height: 1,
    },
})

class RedditList extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,
        posts: PropTypes.array,
    }
    _refresh = () => {
        this.props.dispatch(actions.refresh())
    }
    componentDidMount() {
        if (this.posts === undefined) {
            this._refresh()
        }
    }
    _keyExtractor = (item, index) => item.id
    _onPressItem = item => {
        this.props.dispatch(actions.viewPost(item))
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableHighlight
                underlayColor={colors.underlay}
                onPress={() => this._onPressItem(item)}>
                <RedditListItem item={item} />
            </TouchableHighlight>
        )
    }
    _renderSeparator = () => {
        return <View style={style.separator} />
    }
    render() {
        return (
            <FlatList
                ItemSeparatorComponent={this._renderSeparator}
                data={this.props.posts}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshing={this.props.refreshing}
                onRefresh={this._refresh}
                style={style.container}
            />
        )
    }
}

export default connect(state => ({
    posts: state.reddit.posts,
    refreshing: false,
    error: state.error,
}))(RedditList)
