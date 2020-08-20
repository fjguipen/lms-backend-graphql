import { Model } from 'objection'
import { User } from '../../_generated/types';

export class UserModel extends Model implements User {
  id: number
  name: string
  email: string
  username: string
  password: string
  rol: string[]
  
  static tableName = 'users'  
}