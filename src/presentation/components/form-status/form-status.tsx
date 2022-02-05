import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/components/context/form/form-context'

const FormStatus: React.FC = () => {
  const { stateLogin } = useContext(formContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {stateLogin.isLoading && <Spinner className={Styles.spinner} />}
      {stateLogin.messageError && (
        <span className={Styles.error}>{stateLogin.messageError}</span>
      )}
    </div>
  )
}

export default FormStatus
