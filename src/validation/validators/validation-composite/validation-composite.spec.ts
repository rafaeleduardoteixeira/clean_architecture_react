import faker from 'faker'
import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTyoes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTyoes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ]
  const sut = new ValidationComposite(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy,
  }
}

describe('ValidationComposite', () => {
  test('shout return error if any validation fail', () => {
    const errorMessage = faker.random.words()
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    fieldValidationSpy[0].error = new Error(errorMessage)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('shout return success', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
