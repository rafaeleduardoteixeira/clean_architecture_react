import faker from 'faker'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFielError } from '@/validation/errors'

type SutReturn = {
  field: string
  sut: EmailValidation
}

const makeSut = (): SutReturn => {
  const field = faker.database.column()
  const sut = new EmailValidation(field)

  return {
    field,
    sut,
  }
}
describe('EmailValidation', () => {
  test('shout return error if email invalid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFielError(field))
  })

  test('shout return false if email valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
