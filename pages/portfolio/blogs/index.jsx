import HomeLayout from "@/layouts/HomeLayout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "@/components/Table/Table";
import getUserData from "@/utils/getUserData";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {useRouter} from "next/router";
import { createModal, useModals } from "@/utils/modal";
import Modal from "@/modals";
import {fn_delete} from "@/utils/functions";
import Loading from "@/components/Loading/Loading";
import Avatar from "@/components/Avatar/Avatar";
import ActionButtons from "@/components/ActionButtons";
import StatusControl from "@/components/StatusControl";

export default function Blogs() {
    const modals = useModals();
    const router = useRouter()
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogs();
    }, [])

    useEffect(() => {
        modals.length === 0 ? getBlogs() : null
    }, [modals]);

    const getBlogs = () => {
        const formData = new FormData();
        formData.append("process", "get");
        axios
            .post(`/api/portfolio/blogs`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => console.log("error: " + err))
    }
    const handleDelete = async (id) => {
        const result = await fn_delete();
        if (result) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("process", "delete");

            axios.post("/api/portfolio/blogs", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
                .finally(() => {
                    setBlogs(blogs.filter(blog => blog.id !== id))
                })
        }
    }

    return (
        <HomeLayout>
            {modals.length > 0 && <Modal />}

            {loading ? (
                <>
                    <Loading/>
                </>
            ) : (
                <>

                    <div className="block md:flex justify-between items-center mb-10">
                        <BreadCrumb path={router.pathname}/>
                        <button
                            className="grid ml-auto mt-5 md:mt-auto text-md px-5 py-3 rounded text-white bg-green-500 hover:bg-green-400"
                            onClick={() => createModal("blogsModal")}>
                            Yeni Ekle
                        </button>
                    </div>

                    <Table
                        theadContent={(
                            <>
                                <th className="border-b-2">#</th>
                                <th className="border-b-2">Resim</th>
                                <th className="border-b-2">Başlık</th>
                                <th className="border-b-2">Okuma Süresi</th>
                                <th className="border-b-2">Yazar</th>
                                <th className="border-b-2">Durum</th>
                                <th className="border-b-2">İşlem</th>
                            </>
                        )}
                        tbodyContent={(
                            blogs.map((blog, key) => (
                                <tr key={key} className="hover:bg-base-200">
                                    <td>{++key}</td>
                                    <td>
                                        {blog.image_url !== 'null' ? (
                                            <>
                                                <Avatar imageURL={blog.image_url}
                                                        altContent={`project-resim-${blog.id}`} size="xs" rounded="md"/>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </td>
                                    <td className="">{blog.title}</td>
                                    <td>{blog.read_time}</td>
                                    <td>{blog.user.name_surname}</td>
                                    <td> <StatusControl status={blog.status} /> </td>
                                    <td className="w-24">
                                        <ActionButtons
                                            deleteHandle={() => handleDelete(blog.id)}
                                            editHandle={() => createModal("blogsModal", blogs.filter(b => b.id === blog.id)[0])}
                                        />
                                    </td>
                                </tr>
                            )))}
                    />
                </>
            )}
        </HomeLayout>
    )
}

export async function getServerSideProps(context) {
    const userData = await getUserData(context.req);
    if (!userData) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: {userData},
    };
}
