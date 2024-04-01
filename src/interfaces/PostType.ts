
export type CreatorType = {
    id: string,
    name: string,
    phone_no: number,
    profilePicture: string
}

export interface PostType {
    post_description: string,
    time_posted: string,
    photos: Array<string>,
    creator: CreatorType
}

export type PostBody = {
    post_description: string,
    photos: string[],
    creator_id: string
}