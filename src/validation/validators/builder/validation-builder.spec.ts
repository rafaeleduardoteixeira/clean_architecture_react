import faker from 'faker'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFielValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('Should return MinLength', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)])
  })

  test('Should return list of validations', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName)
      .required()
      .min(5)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, 5),
    ])
  })
})
