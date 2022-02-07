import React, { useContext } from 'react'
import formContext from '@/presentation/components/context/form/form-context'
import Styles from './input-styles.scss'
1
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { stateLogin, setStateLogin } = useContext(formContext)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setStateLogin({
      ...stateLogin,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        readOnly
        onFocus={enableInput}
        data-testid={props.name}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={
          stateLogin[`${props.name}Error`]
            ? stateLogin[`${props.name}Error`]
            : ''
        }
        className={Styles.status}
      >
        {stateLogin[`${props.name}Error`] ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
