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
import Loading from "@/components/Loading/Loading";

export default function Projects() {
    const router = useRouter()
    const [projects, setProjects] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [buttonText, setButtonText] = useState("Kaydet");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects();
    }, [])
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
    const handleOpenModal = (id) => {
        if (id !== undefined) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("process", "get");

            axios
                .post(`/api/portfolio/projects`, formData, {
                    headers: {
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
        setModalData([]);
    };
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
                    getProjects();
                })
        }
    }
    const handleModalSubmit = () => {
        const formData = new FormData();

        formData.append("process", modalData.id !== undefined ? "update" : "insert");
        formData.append("data", JSON.stringify(modalData));

        axios.post("/api/portfolio/projects", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => {
                getProjects();
                setButtonText("Kaydet");
                handleCloseModal();
            })
    }
    const handleToggleChange = (newStatus) => {
        setModalData((prevState) => ({
            ...prevState,
            status: newStatus ? 1 : 0
        }))
    };

    return (
        <HomeLayout>

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
                                onClick={() => handleOpenModal()}>
                                Yeni Ekle
                            </button>
                        </div>

                        <Table
                            theadContent={(
                                <>
                                    <th className="border-b-2 p-4 text-left">#</th>
                                    <th className="border-b-2 p-4 text-center">Resim</th>
                                    <th className="border-b-2 p-4 text-center">Proje Adı</th>
                                    <th className="border-b-2 p-4 sm:table-cell hidden">Açıklama</th>
                                    <th className="border-b-2 p-4 text-center">Durum</th>
                                    <th className="text-right md:pr-8 border-b-2">İşlem</th>
                                </>
                            )}
                            tbodyContent={(
                                projects.map((project, key) => (
                                    <tr key={project.id} className="hover:bg-card_bg_dark">
                                        <td className="p-4 text-left">{++key}</td>
                                        <td className="p-4 text-center">
                                            <img className="w-12 rounded-lg" src={project.image_url}
                                                 alt={`project-resim-${project.id}`}/>
                                        </td>
                                        <td className="p-4 text-center">{project.title}</td>
                                        <td className="p-4 hidden sm:block max-w-4xl ">{project.description}</td>
                                        <td className="p-4 text-center"><i
                                            className={`text-xl fa-solid ${project.status ? `fa-heart text-green-500` : `fa-heart-crack text-red-500`}`}></i>
                                        </td>
                                        <td className="text-right pt-3 pr-4">
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
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                <i className="fa fa-trash text-red-500"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                        />


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
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            <CustomInput
                                                labelContent="Resim URL"
                                                inputID="image"
                                                inputPlaceholder={modalData.image_url}
                                                onInputChange={(e) => setModalData((prevState) => ({
                                                    ...prevState,
                                                    image_url: e.target.value
                                                }))}
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            <CustomInput
                                                labelContent="Link"
                                                inputID="link"
                                                inputPlaceholder={modalData.link}
                                                onInputChange={(e) => setModalData((prevState) => ({
                                                    ...prevState,
                                                    link: e.target.value
                                                }))}
                                            />
                                        </div>

                                        <div className="col-span-1 mx-auto">
                                            <ToggleInput
                                                labelContent="Status"
                                                isChecked={modalData.status}
                                                onChange={handleToggleChange}
                                            />
                                        </div>

                                        <div className="col-span-2">
                                <textarea
                                    className={"block rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]"}
                                    rows="4"
                                    placeholder={modalData.description}
                                    onChange={(e) => setModalData((prevState) => ({
                                        ...prevState,
                                        description: e.target.value
                                    }))}
                                ></textarea>
                                        </div>


                                    </div>
                                </Modal>
                            </>
                        )}
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
