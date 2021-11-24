export interface Comment {
  id?: string
  date?: string
  text: string
  parent_id?: string
  username?: string
  chapter_id?: string
  children?: Comment[]
  parent?: {
    username?: string
    text?: string
  }
}
