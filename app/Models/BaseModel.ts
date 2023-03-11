import { BaseModel as LucidBaseModel } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

export default class BaseModel extends LucidBaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
}
