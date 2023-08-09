import HomeLayout from "@/layouts/HomeLayout";
import {useRouter} from "next/router";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import React from "react";

export default function About() {
    const router = useRouter()
    return (
        <HomeLayout>
            <div className="block md:flex justify-between items-center mb-10">
                <BreadCrumb path={router.pathname}/>
                <button
                    className="grid ml-auto mt-5 md:mt-auto text-md px-5 py-3 rounded text-white bg-green-500 hover:bg-green-400"
                    onClick={() => handleOpenModal()}>
                    Yeni Ekle
                </button>
            </div>

            about
        </HomeLayout>
    )
}