import React from 'react'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import App from '../App'
import redditJSON from './reddit.json'
import actions from '../actions'

global.fetch = require('jest-fetch-mock')

const mockStore = configureMockStore([thunk])

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON()
    expect(rendered).toBeTruthy()
})

describe('actions', () => {
    it('fetches and parses reddit json', () => {
        fetch.mockResponse(JSON.stringify(redditJSON), {
            status: 200,
        })
        const store = mockStore()
        return store.dispatch(actions.refresh()).then(() => {
            var r = store.getActions()
            expect(r[0].type).toEqual('REDDIT_REFRESHING')
            expect(r[1].type).toEqual('REDDIT_LOADED')
            expect(r[1].posts[0]).toEqual({
                id: '7236m6',
                title: 'Love knows no fences.',
                author: 'NightTrainDan',
                thumbnail:
                    'https://b.thumbs.redditmedia.com/QePyK2TcSHnsgfEtqUwKJ2fpqta1r4gWGA7QYttI7pk.jpg',
                score: 8253,
                subreddit: 'AnimalsBeingBros',
                url: 'https://i.redd.it/vrnpiypufrnz.jpg',
            })
        })
    })
    it('creates an error action on failure', () => {
        fetch.mockReject()
        const store = mockStore()
        return store.dispatch(actions.refresh()).then(() => {
            var r = store.getActions()
            expect(r[0].type).toEqual('REDDIT_REFRESHING')
            expect(r[1].type).toEqual('REDDIT_ERROR')
        })
    })
})
