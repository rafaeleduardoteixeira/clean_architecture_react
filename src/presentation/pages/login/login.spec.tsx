import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import faker from 'faker'
import { Validation } from '@/presentation/protocols/validation'
import Login from './login'

type SubTypes = {
  sut: RenderResult
  email: string
  password: string
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SubTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  const email = faker.internet.email()
  const password = faker.internet.password()

  return { sut, email, password, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should initial state ', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInputStatus = sut.getByTestId('email-status')
    expect(emailInputStatus.title).toBe('Campo obrigatório')
    expect(emailInputStatus.textContent).toBe('🔴')

    const passwordInputStatus = sut.getByTestId('password-status')
    expect(passwordInputStatus.title).toBe('Campo obrigatório')
    expect(passwordInputStatus.textContent).toBe('🔴')
  })

  test('Should call validation with correct email ', () => {
    const { sut, email, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.input).toEqual({ email: email })
  })

  test('Should call validation with correct password  ', () => {
    const { sut, password, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.input).toEqual({ password: password })
  })
})
