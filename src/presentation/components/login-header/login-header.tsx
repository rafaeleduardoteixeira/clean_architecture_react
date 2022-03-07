import React, { memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/presentation/components/logo/logo'
1

const LoginHeader = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquete para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
