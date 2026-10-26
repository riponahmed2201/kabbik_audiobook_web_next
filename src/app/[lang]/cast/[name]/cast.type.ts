export interface castCrewInfo {

    id: number,
    name: string,
    en_name: string,
    description: string,
    imageUrl: string,
    deleted: number,
    isActive: number,
    created_at: Date,
    updated_at: Date,
    total_audiobooks: number

}

export interface CastCrewEpisodesInfo {

    id: number,
    name: string,
    description: string,
    author_name: string,
    premium: number,
    thumb_path: string,
    price: number,
    play_count: number,
    rating: number

}