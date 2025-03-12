import {AppStateType} from "../redux/store";
import {Dispatch} from "redux";

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

// export type GetStateType = () => AppStateType
// export type DispatchType = Dispatch<ActionType>