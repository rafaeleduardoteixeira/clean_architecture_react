import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  const url = `${process.env.API_URL}login`
  return new RemoteAuthentication(url, makeAxiosHttpClient())
}
