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
  confidence: number
  relevance: number
  acceptability: boolean
  difficulty: number
  choices: number
  question_id: number
  user: number
}

export interface Group {
  id: number
  name: string
  permissions: number[]
}

export interface User {
  username: string
  password: string
  id:string
  uuid: string
  login_url: string
}

export interface EvaluationStats {
  questions_completed: number
  questions_remaining: number
}

export interface Profile {
  id: number
  english_proficiency: number
  max_questions: number
  additional_questions: number
  completed_questions: number
  last_login: string
  date_joined: string
  groups: Group[]
  user: string
}

export interface Dataset {
  id: number
  name: string
  comment: string
}

export interface ExperimentSettings {
  id: number
  name: string
  active: boolean
  max_eval_per_questions: string
  max_questions_per_subject: string
}
