import faker from 'faker'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react'
import 'jest-localstorage-mock'
import Login from './login'

import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'
import { UnexpectedError } from '@/domain/usecases/errors'

type SubTypes = {
  sut: RenderResult
  email: string
  password: string
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory()
const makeSut = (): SubTypes => {
  const validationSpy = new ValidationSpy()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <BrowserRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </BrowserRouter>
  )
  const email = faker.internet.email()
  const password = faker.internet.password()

  return { sut, email, password, validationSpy, authenticationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => localStorage.clear())

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

  test('Should enable submit button if form is valid ', () => {
    const { sut, password, email, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit ', () => {
    const { sut, password, email, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values ', () => {
    const { sut, password, email, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    })
  })

  test('Should call authentication only once ', () => {
    const { sut, password, email, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    fireEvent.click(submitButton)
    fireEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form invalid ', () => {
    const { sut, password, email, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if call authentication fail', async () => {
    const { sut, password, email, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = null

    const error = new UnexpectedError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    fireEvent.click(submitButton)

    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)

    const messageError = sut.getByTestId('error-message')

    expect(messageError.textContent).toBe(error.message)
  })

  test('Should add acessToken on localstorage if success', async () => {
    const { sut, password, email, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButton = sut.getByTestId('submitButton') as HTMLButtonElement
    fireEvent.click(submitButton)

    fireEvent.submit(await waitFor(() => sut.getByTestId('form')))

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.acessToken
    )

    expect(window.history.length).toBe(1)
    expect(window.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { sut, validationSpy, authenticationSpy } = makeSut()
    validationSpy.errorMessage = null

    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    expect(window.history.length).toBe(2)
    expect(window.location.pathname).toBe('/signup')
  })
})
