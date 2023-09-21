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
import Avatar from "@/components/Avatar/Avatar";
import StatusControl from "@/components/StatusControl";
import ActionButtons from "@/components/ActionButtons";

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
            setModalData(projects.filter(project => project.id === id)[0]);
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
                    setProjects(projects.filter(project => project.id !== id))
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
                                        <td> <StatusControl status={project.status} /> </td>
                                        <td className="w-24">
                                            <ActionButtons
                                                deleteHandle={() => handleDelete(project.id)}
                                                editHandle={() => handleOpenModal(project.id)}
                                            />
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
                                                inputValue={modalData.title}
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
                                                inputValue={modalData.image_url}
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
                                                inputValue={modalData.link}
                                                onInputChange={(e) => setModalData((prevState) => ({
                                                    ...prevState,
                                                    link: e.target.value
                                                }))}
                                            />
                                        </div>

                                        <div className="col-span-1 mx-auto">
                                            <CustomInput
                                                labelContent="Status"
                                                inputValue={modalData.status}
                                                onInputChange={handleToggleChange}
                                                type="radio"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <CustomInput
                                                className={"block rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]"}
                                                rows="5"
                                                onInputChange={(e) => setModalData((prevState) => ({
                                                    ...prevState,
                                                    description: e.target.value
                                                }))}
                                                inputValue={modalData.description}
                                                type="textarea"
                                            />
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
