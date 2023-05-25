import type { ModelObject } from '@ioc:Adonis/Lucid/Orm'
export type { AuthContract } from '@ioc:Adonis/Addons/Auth'
export type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
export type { ModelPaginatorContract as PaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface PaginatedResponse {
  meta: PaginationMeta
  data: ModelObject[]
}

export interface FindMany {
  page?: number
  limit?: number
  orderBy?: string
  direction?: 'asc' | 'desc'
}
