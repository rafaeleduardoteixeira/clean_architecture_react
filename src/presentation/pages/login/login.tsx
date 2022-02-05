import React, { useState, useEffect } from 'react'
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './login-styles.scss'
import formContext from '@/presentation/components/context/form/form-context'

type LoginProps = {
  validation?: Validation
}

const Login: React.FC<LoginProps> = ({ validation }: LoginProps) => {
  const [stateLogin, setStateLogin] = useState({
    isLoading: false,
    messagemError: '',
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
  })

  useEffect(() => {
    validation.validate({ email: stateLogin.email })
  }, [stateLogin.email])

  useEffect(() => {
    validation.validate({ password: stateLogin.password })
  }, [stateLogin.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={{ stateLogin, setStateLogin }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            className={Styles.submit}
            type="submit"
            data-testid="submitButton"
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </formContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
