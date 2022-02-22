import faker from 'faker'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())
describe('RequiredFieldValidation', () => {
  test('shout return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('shout return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
