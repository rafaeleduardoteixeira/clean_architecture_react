import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/components/context/form/form-context'

const FormStatus: React.FC = () => {
  const { stateLogin, stateErrorLogin } = useContext(formContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {stateLogin.isLoading && <Spinner className={Styles.spinner} />}
      {stateErrorLogin.errorMessage && (
        <span className={Styles.error}>{stateErrorLogin.errorMessage}</span>
      )}
    </div>
  )
}

export default FormStatus
