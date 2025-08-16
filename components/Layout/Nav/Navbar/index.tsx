'use client'
import { FC } from 'react'
import Container from '~/components/Layout/Container'

const Navbar: FC = () => {
  return (
    <header
      className='fixed left-0 top-0 z-50 hidden w-full px-4 transition-transform lg:block'
    >
      <Container></Container>
    </header>
  )
}

export default Navbar
