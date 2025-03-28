export type PhotosType = {
    small: string | null,
    large: string | null,
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

export type PostType = {
    id: number,
    message: string,
    likes: number,
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    aboutMe: string,
    contacts: ContactsType,
    photos: PhotosType,
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean,
}

export type DialogType = {
    id: number,
    name: string,
    avatar: any,
}

export type MessageType = {
    id: number,
    message: string,
}

export type ChatMessageType = {
    userId: number,
    userName: string,
    message: string,
    photo: string,
}

export type ChatStatusType = 'pending' | 'ready' | 'error'