"use client"

import Link from 'next/link'
// import { signIn, signOut, useSession } from "next-auth/react"

// function AuthButton(){
//     const { data: session } = useSession()

//     if (session) {
//         return (
//            <>
//            {session.user?.name}
//            <button onClick={() => signOut()} className="btn">
//                Sign out
//            </button>
//            </>
//         )
//     }
//      return (
//     <>

//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )

// }

// export default function Nav() {
//     return (
//         <nav>
//             <AuthButton />
//         </nav>
//     )
// }

import React from 'react'

const Nav = () => {
  return (
    <div>
      
      <nav className="flex justify-end p-4 ">
        <Link
          href="/login"
          className="px-4 py-2 rounded-md text-[#4640DE] font-semibold hover:underline"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="ml-2 px-4 py-2 rounded-md bg-[#4640DE] text-white font-semibold hover:bg-[#332ebc]"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  )
}

export default Nav
