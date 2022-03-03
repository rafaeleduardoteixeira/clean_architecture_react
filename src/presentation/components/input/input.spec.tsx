import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Input } from '@/presentation/components/index'
import Context from '@/presentation/components/context/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider
      value={{
        stateLogin: {},
      }}
    >
      <Input type="email" name="email" placeholder="Digite seu e-mail" />
    </Context.Provider>
  )
}
describe('Input component', () => {
  test('Should begin with readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('email') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const sut = makeSut()
    const input = sut.getByTestId('email') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
