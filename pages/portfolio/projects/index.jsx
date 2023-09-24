import HomeLayout from "@/layouts/HomeLayout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "@/components/Table/Table";
import getUserData from "@/utils/getUserData";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {useRouter} from "next/router";
import {fn_delete} from "@/utils/functions";
import Loading from "@/components/Loading/Loading";
import Avatar from "@/components/Avatar/Avatar";
import StatusControl from "@/components/StatusControl";
import ActionButtons from "@/components/ActionButtons";
import Modal from "@/modals";
import {createModal, useModals} from "@/utils/modal";

export default function Projects() {
    const modals = useModals();
    const router = useRouter()
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects();
    }, [])

    useEffect(() => {
        modals.length === 0 ? getProjects() : null;
    }, [modals]);

    const getProjects = () => {
        const formData = new FormData();
        formData.append("process", "get");
        axios
            .post(`/api/portfolio/projects`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                setProjects(res.data)
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

            axios.post("/api/portfolio/projects", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
                .finally(() => {
                    setProjects(projects.filter(project => project.id !== id))
                })
        }
    }

    return (
        <HomeLayout>

            {modals.length > 0 && <Modal/>}

            {loading ? (
                    <>
                        <Loading/>
                    </>
                ) :
                (
                    <>
                        <div className="block md:flex justify-between items-center mb-10">
                            <BreadCrumb path={router.pathname}/>
                            <button
                                className="grid ml-auto mt-5 md:mt-auto text-md px-5 py-3 rounded text-white bg-green-500 hover:bg-green-400"
                                onClick={() => createModal("projectsModal")}>
                                Yeni Ekle
                            </button>
                        </div>

                        <Table
                            theadContent={(
                                <>
                                    <th className="border-b-2 p-4 text-left">#</th>
                                    <th className="border-b-2 p-4 text-center">Resim</th>
                                    <th className="border-b-2 p-4 text-left">Proje Adı</th>
                                    <th className="border-b-2 p-4 text-left sm:table-cell hidden">Açıklama</th>
                                    <th className="border-b-2 p-4 text-center">Durum</th>
                                    <th className="text-right md:pr-8 border-b-2">İşlem</th>
                                </>
                            )}
                            tbodyContent={(
                                projects.map((project, key) => (
                                    <tr key={project.id} className="hover:bg-base-200">
                                        <td>{++key}</td>
                                        <td>
                                            <Avatar imageURL={project.image_url} size="xs" rounded="md"
                                                    altContent={`project-resim-${project.id}`}/>
                                        </td>
                                        <td className="p-4 text-left">{project.title}</td>
                                        <td className="p-4 hidden sm:block max-w-4xl ">{project.description}</td>
                                        <td><StatusControl status={project.status}/></td>
                                        <td className="w-24">
                                            <ActionButtons
                                                deleteHandle={() => handleDelete(project.id)}
                                                editHandle={() => createModal("projectsModal", projects.filter(p => p.id === project.id)[0])}
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
