import type { FindMany } from './Common'

export enum UserRole {
  ADMIN = 'admin',
  COLLABORATOR = 'collaborator',
}

export interface FindUsers extends FindMany {
  search?: string
}
