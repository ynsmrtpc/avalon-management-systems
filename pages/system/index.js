import Card from "@/components/Card/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput/CustomInput";
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import {fn_delete} from "@/utils/functions";
import Nestable from 'react-nestable';

export default function System() {
    const [sidebarData, setSidebarData] = useState([]);
    const [modulesData, setModulesData] = useState([{id: "", title: "", icon: "", link: "", status: 1, queue: ""}]);
    const [showModal, setShowModal] = useState(false);
    const [buttonText, setButtonText] = useState("Kaydet");

    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["id", "title", "icon", "status", "parent_id"])
        formData.append("process", "get")
        axios
            .post("/api/modules", formData)
            .then(res => setSidebarData(res.data))
            .catch(err => console.log(err));
    }, []);
    const getModules = () => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["id", "title", "icon", "status"])
        formData.append("process", "get")
        axios
            .post("/api/modules", formData)
            .then(res => setSidebarData(res.data))
            .catch(err => console.log(err));
    }
    const handleOpenModal = (id, process = "") => {
        if (process === "submodule") {
            setModulesData((prevState) => ({
                ...prevState,
                id: id
            }))
        }
        if (id !== undefined && process !== "submodule") {
            const formData = new URLSearchParams();
            formData.append("attributes", ["id", "title", "icon", "status", "link", "queue"])
            formData.append("process", "get");
            formData.append("id", id);
            axios
                .post("/api/modules", formData)
                .then(res => setModulesData(res.data))
                .catch(err => console.log(err))
        }
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setModulesData([]);
    };
    const handleSubmit = async (process) => {
        const formData = new URLSearchParams();
        formData.append("moduleData", JSON.stringify(modulesData));
        formData.append("process", process)
        setButtonText(
            <>
                <div role="status" className="flex">
                    <svg aria-hidden="true"
                         className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading</span>
                    Bekleyiniz...
                </div>
            </>
        );
        await axios
            .post("/api/modules", formData)
            .then(res => {
                if (res.data.error === 0) {
                    handleCloseModal();
                    getModules();
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setButtonText("Kaydet");
            })
    }
    const handleModalSubmit = async () => {
        if (modulesData.id) {
            await handleSubmit("submodule")
        } else {
            await handleSubmit(modulesData.id === undefined ? "insert" : "update")
        }
    }
    const handleDeleteModule = async (id) => {
        const result = await fn_delete();
        if (result) {
            const formData = new URLSearchParams();
            formData.append("id", id);
            formData.append("process", "delete")
            await axios
                .post("/api/modules", formData)
                .then(res => {
                    !res.data.error ? getModules() : ""
                })
                .catch(err => console.log(err))
        }
    }
    const handleToggleChange = (newStatus) => {
        setModulesData((prevState) => ({
            ...prevState,
            status: newStatus ? 1 : 0
        }))
    };

    const handleUpdate = (newData) => {
        setSidebarData(newData);
    };

    // Parent_id'si 0 olanları parent eleman, diğerlerini child eleman olarak ayır
    const parentItems = sidebarData.filter(item => item.parent_id === 0);
    const childItems = sidebarData.filter(item => item.parent_id !== 0);
    return (
        <>
            <div className="grid">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Card
                        cardTitle={
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-xxl">Modüller</span>
                                <button className="text-sm px-4 rounded text-white bg-green-500 hover:bg-green-400"
                                        onClick={() => handleOpenModal()}>
                                    Yeni Ekle
                                </button>
                            </div>
                        }
                    >
                        <div className="p-2">
                            {parentItems.map((parentItem, index) => (
                                <details key={parentItem.id}
                                         className={`${index > 0 ? 'mt-4 border-t border-gray-300 pt-4' : ''}`}>
                                    <summary className="flex items-center relative mb-2 cursor-pointer select-none">
                                        <i className={`${parentItem.icon} mr-2`}></i>
                                        <span className="text-md font-medium">{parentItem.title}</span>
                                        <div className="absolute right-0">
                                            <button
                                                type="button"
                                                title="Add Submodule"
                                                className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                                onClick={() => {
                                                    handleOpenModal(parentItem.id, "submodule")
                                                }}
                                            ><i
                                                className="fa fa-angles-down text-indigo-500"></i>
                                            </button>
                                            <button
                                                type="button"
                                                title="Edit"
                                                className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                                onClick={() => {
                                                    handleOpenModal(parentItem.id)
                                                }}
                                            ><i
                                                className="fa fa-edit text-green-500"></i>
                                            </button>
                                            <button
                                                type="button"
                                                title="Delete"
                                                className="ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                                onClick={() => handleDeleteModule(parentItem.id)}
                                            >
                                                <i className="fa fa-trash text-red-500"></i>
                                            </button>
                                        </div>

                                    </summary>
                                    {childItems
                                        .filter(childItem => childItem.parent_id === parentItem.id)
                                        .map(childItem => (
                                            <div key={childItem.id} className="p-3 rounded relative mb-0 pb-0 ml-4">
                                                <div className="flex items-center  cursor-default select-none">
                                                    <i className={`${childItem.icon} mr-2`}></i>
                                                    <span>{childItem.title}</span>
                                                </div>

                                                <div className="absolute right-0 top-0">

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
                                                </div>
                                            </div>
                                        ))}

                                </details>
                            ))}

                        </div>

                    </Card>
                </div>
            </div>

            {showModal && (
                <>
                    <Modal
                        title="Modül Ekle / Düzenle"
                        onClose={handleCloseModal}
                        handleModalSubmit={handleModalSubmit}
                        overlayBlur={true}
                        size="lg"
                        buttonText={buttonText}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Title"
                                    inputID="title"
                                    inputPlaceholder={modulesData.title}
                                    onInputChange={(e) => setModulesData((prevState) => ({
                                        ...prevState,
                                        title: e.target.value
                                    }))}
                                    isRequired="true"
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Icon"
                                    inputID="icon"
                                    inputPlaceholder={modulesData.icon}
                                    onInputChange={(e) => setModulesData((prevState) => ({
                                        ...prevState,
                                        icon: e.target.value
                                    }))}
                                    isRequired="true"
                                />

                            </div>
                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Link"
                                    inputID="link"
                                    inputPlaceholder={modulesData.link}
                                    onInputChange={(e) => setModulesData((prevState) => ({
                                        ...prevState,
                                        link: e.target.value
                                    }))}
                                    isRequired="true"
                                />

                            </div>
                            <div className="col-span-1">
                                <CustomInput
                                    labelContent="Queue"
                                    inputID="queue"
                                    type="number"
                                    inputPlaceholder={modulesData.queue}
                                    onInputChange={(e) => setModulesData((prevState) => ({
                                        ...prevState,
                                        queue: e.target.value
                                    }))}

                                />
                            </div>
                            <div className="col-span-2 mx-auto">
                                <ToggleInput
                                    labelContent="Status"
                                    isChecked={modulesData.status}
                                    onChange={handleToggleChange}
                                />
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}