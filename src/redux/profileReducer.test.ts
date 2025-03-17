import profileReducer, {actions} from './profileReducer'
import {PostType, ProfileType} from '../types/types'

let initialState = {
    posts: [
        {id: 0, message: 'test0', likes: 0},
        {id: 1, message: 'test1', likes: 1},
        {id: 2, message: 'test2', likes: 2},
        {id: 3, message: 'test3', likes: 3},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    contactsError: null as Array<string> | null,
}

test('posts length should be incremented after adding', () => {
    let action = actions.addPostActionCreator('test4')
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(5)
})

test('new post text check', () => {
    let action = actions.addPostActionCreator('test4')
    let newState = profileReducer(initialState, action)

    expect(newState.posts[0].message).toBe('test4')
})

test('posts length should be decremented after deleting', () => {
    let action = actions.deletePostActionCreator(1)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(3)
})

test('posts length should not be changed after deleting id id is incorrect', () => {
    let action = actions.deletePostActionCreator(100)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
})