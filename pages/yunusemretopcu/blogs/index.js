import HomeLayout from "@/layouts/HomeLayout";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import React from "react";
import {useRouter} from "next/router";

export default function Blogs() {
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

            blogs
        </HomeLayout>
    )
}