let rerenderEntireTree = () => {
}

let state = {
    profilePage: {
        posts: [
            {
                id: 0,
                message: 'I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!',
                likes: '1488'
            },
            {id: 1, message: 'My brother Dipper is sooooo annoying', likes: '2'},
            {
                id: 2, message: 'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la\n' +
                    'la la la la la la la la la la la la la la la la', likes: '0'
            },
            {id: 3, message: 'Hello everyone it`s my first post here haha', likes: '7'},
        ],
        newPostText: '',
    },

    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Dipper Pines',},
            {id: 2, name: 'Stan Pines',},
            {id: 3, name: 'Wendy Corduroy',},
            {id: 4, name: 'Ford Pines',},
            {id: 5, name: 'Pacifica Northwest',},
            {id: 6, name: 'Mermando',},
            {id: 7, name: 'Soos Ramirez',},
        ],

        messages: [
            {id: 1, message: 'Hi!',},
            {id: 2, message: 'How are you?',},
            {id: 3, message: 'I`m pretty good',},
        ],
    },
}

export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText=''

    rerenderEntireTree(state)
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText

    rerenderEntireTree(state)
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer
}

export default state