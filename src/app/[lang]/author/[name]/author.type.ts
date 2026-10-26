interface AuthorInfo {

    id: number,
    name: string,
    description: string,
    imageUrl: string,
    isActive: number,
    created_at: Date,
    updated_at: Date,
    deleted: number,
    en_name: string,
    total_audiobooks: number,

}

export default AuthorInfo;

export interface AuthorEpisodesInfo {

    id: number,
    name: string,
    description: string,
    author_name: string,
    premium: number,
    thumb_path: string,
    price: number,
    play_count: number,
    rating: number,

}