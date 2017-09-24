const parseRedditResponse = async response => {
    if (!response.ok) {
        throw Error('Could not connect to reddit')
    }
    try {
        const json = await response.json()
        return json.data.children.map(i => {
            const d = i.data
            return {
                id: d.id,
                title: d.title,
                author: d.author,
                thumbnail: d.thumbnail,
                score: d.score,
                subreddit: d.subreddit,
                url: d.url,
            }
        })
    } catch (e) {
        throw Error(e)
    }
}

const refresh = () => {
    return dispatch => {
        dispatch({
            type: 'REDDIT_REFRESHING',
        })
        return fetch('https://www.reddit.com/.json')
            .then(parseRedditResponse)
            .then(d => {
                dispatch({
                    type: 'REDDIT_LOADED',
                    posts: d,
                })
            })
            .catch(() => {
                dispatch({
                    type: 'REDDIT_ERROR',
                })
            })
    }
}

const viewPost = item => {
    return dispatch => {
        dispatch({
            type: 'VIEW_POST',
            item,
        })
    }
}

export default {
    refresh,
    viewPost,
}
