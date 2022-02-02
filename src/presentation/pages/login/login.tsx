import React, { useState } from 'react'
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components'
import Styles from './login-styles.scss'
import formContext from '@/presentation/components/context/form/form-context'

const Login: React.FC = () => {
  const [stateLogin, setStateLogin] = useState({
    isLoading: false,
  })

  const [stateErrorLogin, setStateErrorLogin] = useState({
    errorMessage: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={{ stateErrorLogin, stateLogin }}>
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
