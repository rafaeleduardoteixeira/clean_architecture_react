import React, { useContext } from 'react'
import formContext from '@/presentation/components/context/form/form-context'
import Styles from './input-styles.scss'
1
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { stateErrorLogin } = useContext(formContext)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${props.name}-status`}
        title={stateErrorLogin[props.name]}
        className={Styles.status}
      >
        🔴
      </span>
    </div>
  )
}

export default Input
