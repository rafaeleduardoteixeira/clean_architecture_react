import faker from 'faker'
import { InvalidFielError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import { InvalidMinLength } from '@/validation/errors/min-length-error'

type SutReturn = {
  field: string
  sut: MinLengthValidation
}

const makeSut = (): SutReturn => {
  const field = faker.database.column()
  const sut = new MinLengthValidation(field, 5)

  return {
    sut,
    field,
  }
}
describe('MinLengthValidation', () => {
  test('shout return error if field invalid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidMinLength(field, 5))
  })

  test('shout return false if email valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toBeFalsy()
  })
})
