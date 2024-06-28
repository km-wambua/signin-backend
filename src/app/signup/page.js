"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter();

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
        const response = await fetch("/api/adduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})

        })

        if(!response.ok) {
            throw new Error("Sign up failed")
        }
        const responseAuth = response.headers.get("Authorization")

        const userDetails = await fetch("/api/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: responseAuth
            }
        })
        if(!userDetails.ok) {
            throw new Error("Sign up failed")
        }
        const userData = await userDetails.json()

        console.log(userData)
        
        localStorage.setItem(`userData`, JSON.stringify(userData.user))
        router.push(`/user/${userData.user.name}`)

        } catch(error) {
            console.log(error)
        }
    
    }

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <label>Email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Sign up</button>
            </form>
           
        </div>
    )

    
}

export default Page;