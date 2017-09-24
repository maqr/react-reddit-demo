import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
    thumbnail: {
        width: 70,
        height: 70,
        marginRight: 20,
        marginLeft: 10,
    },
    item: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    title: {
        marginRight: 120,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 10,
    },
})

export class RedditListItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }
    setNativeProps = nativeProps => {
        this._root.setNativeProps(nativeProps)
    }
    render() {
        const { item } = this.props
        let thumb = { uri: item.thumbnail }
        switch (item.thumbnail) {
            case 'self':
                thumb = require('./thumb-self.png')
                break
            case 'default':
                thumb = require('./thumb-default.png')
                break
        }
        return (
            <View
                style={style.item}
                ref={component => (this._root = component)}
                {...this.props}>
                <Image
                    resizeMode="contain"
                    style={style.thumbnail}
                    source={thumb}
                />
                <View>
                    <Text style={style.title}>{item.title}</Text>
                    <Text style={style.subtitle}>
                        {item.score} on /r/{item.subreddit} by {item.author}
                    </Text>
                </View>
            </View>
        )
    }
}

export default RedditListItem
