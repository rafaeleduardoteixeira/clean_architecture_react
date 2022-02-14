import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccount } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccount()
  params: AuthenticationParams
  callsCount = 0
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return Promise.resolve(this.account)
  }
}
