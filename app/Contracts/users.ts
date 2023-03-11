import { FindMany } from './common'

export enum UserRole {
  ADMIN = 'admin',
  COLLABORATOR = 'collaborator',
}

export interface FindUsers extends FindMany {
  search?: string
}
