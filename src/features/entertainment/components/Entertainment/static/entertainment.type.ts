
export type GameCategory = {
    id: number
    name: string
  }
  
  export type GameImages = {
    cover?: string
    brick?: string
    thumb?: string
    wall?: string
    square?: string
    screenshots?: string[]
  }
  
  export type Game = {
    code: string
    url: string
    name: string
    description?: string
    screen_orientation?: string
    has_integrated_ads?: boolean
    category?: GameCategory
    images: GameImages
  }
  
  export type Props = {
    games: Game[]
  }

  export type GameSectionProps = {
    title: string
    games: Game[];
    code?:string;
    target?: string;
    gameTarget?: string;
    seeAllHref?: string
    showRanking?: boolean
  }
  