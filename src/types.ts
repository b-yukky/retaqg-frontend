export interface Paragraph {
  id: number
  text: string
  length: number
  summary: number
}

export interface Distractor {
  text: string
}

export interface Choice {
  text: string
  is_answer: boolean
}

export interface Model {
  id: number
  name: string
  creation_date: string
  last_updated: string
  comment: string
}

export interface Question {
  id: number
  text: string
  answer: string
  timestamp: string
  status: string
  paragraph: number
  model: Model
  distractors: Distractor[]
  choices: Choice[]
}

export interface Evaluation {
  id: number
  relevance: number
  acceptability: boolean
  difficulty: number
  question_id: number
  user: number
}
