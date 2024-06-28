"use client"
import { notFound } from "next/navigation";

const Page = ({params}) => {

    const userData = JSON.parse(localStorage.getItem("userData"))

    if(userData.name === params.slug) {
        return(
            <div>
                <p>User: {userData.name}</p>
                <p>Email: {userData.email}</p>
            </div>
        )
    }

    notFound();
}

export default Page;