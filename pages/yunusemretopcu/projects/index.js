import HomeLayout from "@/layouts/HomeLayout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "@/components/Table/Table";
import getUserData from "@/utils/getUserData";

export default function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get("/api/yunusemretopcu/projects")
            .then(res => setProjects(res.data))
            .catch(err => console.log("error: " + err))
    }, [])


    return (
        <HomeLayout>

            <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xxl">PROJECTS</span>
                <button className="text-md px-4 rounded text-white bg-green-500 hover:bg-green-400"
                        onClick={() => handleOpenModal()}>
                    Yeni Ekle
                </button>
            </div>

            {projects.map((project, key) => (
                <Table key={project.id}
                       theadContent={(
                           <>
                               <th className="border-b-2 pb-2">#</th>
                               <th className="border-b-2 pb-2">Proje Adı</th>
                               <th className="border-b-2 pb-2">Proje Linki</th>
                               <th className="border-b-2 pb-2">Açıklama</th>
                               <th className="text-right pr-4 border-b-2 pb-2">İşlem</th>
                           </>
                       )}
                       tbodyContent={(
                           <>
                               <td className="pt-3">{++key}</td>
                               <td className="pt-3">{project.title}</td>
                               <td className="pt-3">{project.link}</td>
                               <td className="pt-3">{project.description}</td>
                               <td className="text-right pt-3">
                                   <button
                                       type="button"
                                       title="Edit"
                                       className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                       onClick={() => {
                                           handleOpenModal(childItem.id)
                                       }}
                                   ><i
                                       className="fa fa-edit text-green-500"></i>
                                   </button>
                                   <button
                                       type="button"
                                       title="Delete"
                                       className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                       onClick={() => handleDeleteModule(childItem.id)}
                                   >
                                       <i className="fa fa-trash text-red-500"></i>
                                   </button>
                               </td>
                           </>
                       )}
                />
            ))}
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
