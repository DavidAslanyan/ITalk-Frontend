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

export type UpdateUserFormType = {
  firstName: string,
  lastName: string,
  oldPassword: string,
  newPassword : string,
  email: string,
  avatarUrl: string,
  frameUrl: string,
  backgroundUrl: string
}
