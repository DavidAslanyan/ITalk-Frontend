import { DifficultyLevel } from "../enums/difficulty-level.enum"

export type RegisterUserFormType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  rPassword: string,
  difficultyLevel: DifficultyLevel
}

export type LoginUserFormType = {
  email: string,
  password: string,
}

