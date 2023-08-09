import HomeLayout from "@/layouts/HomeLayout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "@/components/Table/Table";
import getUserData from "@/utils/getUserData";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {useRouter} from "next/router";
import Modal from "@/components/Modal/Modal";
import CustomInput from "@/components/CustomInput/CustomInput";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import {fn_delete} from "@/utils/functions";

export default function Projects() {
    const router = useRouter()
    const [projects, setProjects] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [buttonText, setButtonText] = useState("Kaydet");

    useEffect(() => {
        axios
            .get("/api/yunusemretopcu/projects")
            .then(res => setProjects(res.data))
            .catch(err => console.log("error: " + err))
    }, [])
    const handleOpenModal = (id, process = "") => {
        if (id !== undefined) {
            const formData = new FormData();
            formData.append("id",id);

            axios
                .post(`/api/yunusemretopcu/projects`,formData, {
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                .then(res => setModalData(res.data[0]))
                .catch(err => console.log("error: " + err))
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleDeleteModule = () => {
    }
    const handleModalSubmit = () => {
    }

    return (
        <HomeLayout>
            <div className="mx-auto md:mx-24">
                <div className="block md:flex justify-between items-center mb-10">
                    <BreadCrumb path={router.pathname}/>
                    <button
                        className="grid ml-auto mt-5 md:mt-auto text-md px-5 py-3 rounded text-white bg-green-500 hover:bg-green-400"
                        onClick={() => handleOpenModal()}>
                        Yeni Ekle
                    </button>
                </div>


                <Table
                    theadContent={(
                        <>
                            <th className="border-b-2 pb-2">#</th>
                            <th className="border-b-2 pb-2">Resim</th>
                            <th className="border-b-2 pb-2">Proje Adı</th>
                            <th className="border-b-2 pb-2">Açıklama</th>
                            <th className="text-right pr-4 border-b-2 pb-2">İşlem</th>
                        </>
                    )}
                    tbodyContent={(
                        projects.map((project, key) => (
                            <tr key={project.id}>
                                <td className="pt-3">{++key}</td>
                                <td className="pt-3"><img className="w-12 rounded-lg" src={project.image_url}
                                                          alt={`project-resim-${project.id}`}/></td>
                                <td className="pt-3">{project.title}</td>
                                <td className="pt-3">{project.description}</td>
                                <td className="text-right pt-3">
                                    <button
                                        type="button"
                                        title="Edit"
                                        className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                        onClick={() => {
                                            handleOpenModal(project.id)
                                        }}
                                    ><i
                                        className="fa fa-edit text-green-500"></i>
                                    </button>
                                    <button
                                        type="button"
                                        title="Delete"
                                        className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                        onClick={() => handleDeleteModule(project.id)}
                                    >
                                        <i className="fa fa-trash text-red-500"></i>
                                    </button>
                                </td>
                            </tr>
                        )))}
                />

            </div>

            {showModal && (
                <>
                    <Modal
                        title="Proje Ekle / Düzenle"
                        onClose={handleCloseModal}
                        handleModalSubmit={handleModalSubmit}
                        overlayBlur={true}
                        size="lg"
                        buttonText={buttonText}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Proje Adı"
                                    inputID="project_name"
                                    inputPlaceholder={modalData.title}
                                    onInputChange={(e) => setModalData((prevState) => ({
                                        ...prevState,
                                        title: e.target.value
                                    }))}
                                    isRequired="true"
                                />
                            </div>

                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Resim URL"
                                    inputID="image"
                                    inputPlaceholder={modalData.image_url}
                                    onInputChange={(e) => setModalData((prevState) => ({
                                        ...prevState,
                                        title: e.target.value
                                    }))}
                                    isRequired="true"
                                />
                            </div>

                            <div className="col-span-2">
                                <textarea
                                    className={"block rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]"}
                                    rows="4"
                                    placeholder={modalData.description}
                                ></textarea>
                            </div>


                            <div className="col-span-2 mx-auto">
                                <ToggleInput
                                    labelContent="Status"
                                    // isChecked={modulesData.status}
                                    // onChange={handleToggleChange}
                                />
                            </div>
                        </div>
                    </Modal>
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
