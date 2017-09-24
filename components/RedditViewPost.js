import React from 'react'
import PropTypes from 'prop-types'
import { View, WebView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { RedditListItem } from './RedditListItem'

const style = StyleSheet.create({
    flex: {
        flex: 1,
    },
})

class RedditViewPost extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }
    render() {
        const { item } = this.props
        return (
            <View style={style.flex}>
                <RedditListItem item={item} />
                <WebView
                    source={{ uri: item.url }}
                    startInLoadingState={false}
                />
            </View>
        )
    }
}
export default connect(state => ({
    nav: state.nav,
}))(RedditViewPost)
