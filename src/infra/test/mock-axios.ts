import axios, { AxiosResponse } from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement,
  statusCode: faker.random.number(),
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
