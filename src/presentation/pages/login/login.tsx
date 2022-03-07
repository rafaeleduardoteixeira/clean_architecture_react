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
import { Authentication } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login = ({ validation, authentication }: LoginProps): JSX.Element => {
  const [stateLogin, setStateLogin] = useState({
    isLoading: false,
    messageError: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    setStateLogin({
      ...stateLogin,
      passwordError: validation.validate('password', stateLogin.password),
      emailError: validation.validate('email', stateLogin.email),
    })
    validation.validate('email', stateLogin.email)
    validation.validate('password', stateLogin.password)
  }, [stateLogin.password, stateLogin.email])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (
        stateLogin.isLoading ||
        stateLogin.emailError ||
        stateLogin.passwordError
      ) {
        return
      }
      setStateLogin({ ...stateLogin, isLoading: true })

      const account = await authentication.auth({
        email: stateLogin.email,
        password: stateLogin.password,
      })
      localStorage.setItem('accessToken', account.acessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setStateLogin({
        ...stateLogin,
        isLoading: false,
        messageError: error.message,
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={{ stateLogin, setStateLogin }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={!!stateLogin.emailError || !!stateLogin.passwordError}
          >
            Entrar
          </button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </formContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
