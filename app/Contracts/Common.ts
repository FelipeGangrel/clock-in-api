import type { ModelObject } from '@ioc:Adonis/Lucid/Orm'
export type { AuthContract } from '@ioc:Adonis/Addons/Auth'
export type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
export type { ModelPaginatorContract as PaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export interface PaginatedResponse {
  meta: any
  data: ModelObject[]
}

export interface FindMany {
  page?: number
  limit?: number
  orderBy?: string
  direction?: 'asc' | 'desc'
}
