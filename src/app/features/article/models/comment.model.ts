export interface Comment {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: {
        username: string,
        bio: string | null,
        image: string,
        following: boolean
    }
}