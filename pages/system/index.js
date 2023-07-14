import Card from "@/components/Card/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput/CustomInput";
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";
import ToggleInput from "@/components/ToggleInput/ToggleInput";

export default function System() {
    const [sidebarData, setSidebarData] = useState([]);
    const [modulesData, setModulesData] = useState([{title: "", icon: "", link: "", queue: ""}]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["id", "title", "icon", "status"])
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

    const handleOpenModal = (id) => {
        if (id !== undefined) {
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

    const handleModalSubmit = async () => {
        const formData = new URLSearchParams();
        formData.append("moduleData", JSON.stringify(modulesData));
        formData.append("process", modulesData.id === undefined ? "insert" : "update")
        await axios
            .post("/api/modules", formData)
            .then(res => {
                !res.data.error ? handleCloseModal() : ""
            })
            .catch(err => console.log(err))
    }

    const handleDeleteModule = async (id) => {
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
    return (
        <>
            <div className="grid">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                    <Card cardTitle={
                        <div className="flex justify-between">
                            <span>Modüller</span>
                            <button className="text-sm px-4 rounded text-white border bg-green-500 hover:bg-green-400"
                                    onClick={() => handleOpenModal()}>Yeni Ekle
                            </button>
                        </div>
                    }>
                        <Table
                            theadContent={
                                <>
                                    <th scope="col" className="px-6 py-3">Modül Adı</th>
                                    <th scope="col" className="px-6 py-3">Durum</th>
                                    <th scope="col" className="px-6 py-3">İşlem</th>
                                </>
                            }
                            tbodyContent={
                                sidebarData.map(item => (
                                    <tr key={item.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <i className={item.icon + " mr-3"}></i>
                                            {item.title}
                                        </th>
                                        <td className="px-6 py-4 flex justify-between w-1/2">
                                            {item.status === 1 ? (
                                                <span className="text-green-400">Active</span>
                                            ) : (
                                                <span className="text-red-400">Passive</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                title="Edit"
                                                onClick={() => {
                                                    handleOpenModal(item.id)
                                                }}
                                            ><i
                                                className="fa fa-edit text-green-500"></i>
                                            </button>
                                            <button
                                                type="button"
                                                title="Delete"
                                                className="ml-4"
                                                onClick={() => handleDeleteModule(item.id)}
                                            >
                                                <i className="fa fa-trash text-red-500"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        />
                    </Card>
                </div>
            </div>
            {showModal && (
                <>
                    <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"/>
                    <Modal
                        title="Modül Düzenle"
                        onClose={handleCloseModal}
                        handleModalSubmit={handleModalSubmit}
                        overlayBlur={true}
                        size="lg"
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
                                    isChecked={modulesData.status}/>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}