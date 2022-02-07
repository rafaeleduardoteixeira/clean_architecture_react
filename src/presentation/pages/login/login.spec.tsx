import faker from 'faker'
import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'

type SubTypes = {
  sut: RenderResult
  email: string
  password: string
  validationSpy: ValidationSpy
}

const makeSut = (): SubTypes => {
  const validationSpy = new ValidationSpy()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage

  const sut = render(<Login validation={validationSpy} />)
  const email = faker.internet.email()
  const password = faker.internet.password()

  return { sut, email, password, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should initial state ', () => {
    const { sut, validationSpy } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInputStatus = sut.getByTestId('email-status')
    expect(emailInputStatus.title).toBe(validationSpy.errorMessage)
    expect(emailInputStatus.textContent).toBe('🔴')

    const passwordInputStatus = sut.getByTestId('password-status')
    expect(passwordInputStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordInputStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails  ', () => {
    const { sut, email, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails  ', () => {
    const { sut, password, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid state if Validation succeeds ', () => {
    const { sut, password, email, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordStatus = sut.getByTestId('password-status')
    const emailStatus = sut.getByTestId('email-status')

    expect(passwordStatus.title).toBe('')
    expect(passwordStatus.textContent).toBe('🟢')

    expect(emailStatus.title).toBe('')
    expect(emailStatus.textContent).toBe('🟢')
  })
})
