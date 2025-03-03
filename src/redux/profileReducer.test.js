import profileReducer, {addPostActionCreator, deletePostActionCreator} from './profileReducer'

let initialState = {
    posts: [
        // {id: 4, message: 'test4', likes: '0'},
        {id: 0, message: 'test0', likes: '0'},
        {id: 1, message: 'test1', likes: '1'},
        {id: 2, message: 'test2', likes: '2'},
        {id: 3, message: 'test3', likes: '3'},
    ],
}

test('posts length should be incremented after adding', () => {
    let action = addPostActionCreator('test4')
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(5)
})

test('new post text check', () => {
    let action = addPostActionCreator('test4')
    let newState = profileReducer(initialState, action)

    expect(newState.posts[0].message).toBe('test4')
})

test('posts length should be decremented after deleting', () => {
    let action = deletePostActionCreator(1)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(3)
})

test('posts length should not be changed after deleting id id is incorrect', () => {
    let action = deletePostActionCreator(100)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
})