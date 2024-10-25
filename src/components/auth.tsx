"use client"

import { MenuItem, /* Select, */ TextField } from '@mui/material'
import { FormEvent, useState } from 'react'

type signupType = {
    signup?: boolean,
    func: (userName: string, email: string, password: string) => void
}

export default function Auth({ signup, func }: signupType) {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const nameInput = e.currentTarget.userName.value;
    //     const emailInput = e.currentTarget.email.value;
    //     const passwordInput = e.currentTarget.password.value;
    //     /* const userType = e.currentTarget.user.value; */
    //     console.log(nameInput, emailInput, passwordInput);
    //     e.currentTarget.reset()
    // }
    return (

        // <form onSubmit={handleSubmit} className='mt-10'>
        <>
            {signup &&
                <TextField type='text' label="Name" variant="outlined" value={userName} onChange={e => setUserName(e.target.value)} />
            }
            <TextField type='email' label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField type="password" id="outlined-password-input" label="Password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={() => { func(userName, email, password) }}>{signup ? "signup" : "login"}</button>
        </>
    )
}
/* <Select
        name='user'
        placeholder="Signup as?"
        defaultValue=""
        required
    >
        <MenuItem disabled selected value="Signup as?">
            Signup as?
        </MenuItem>
        <MenuItem value={"company"}>Company</MenuItem>
        <MenuItem value={"job seeker"}>job seeker</MenuItem>
    </Select> */
