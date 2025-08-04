//Ova komponenta omogućava da svi dijelovi aplikacije imaju 
//pristup informacijama o prijavljenom korisniku
"use client"
import {SessionProvider} from 'next-auth/react'
const Provider = ({session, children}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider