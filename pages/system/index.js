import Card from "@/components/Card/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput/CustomInput";
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";

export default function System() {
    const [sidebarData, setSidebarData] = useState([]);

    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["id", "title", "icon", "status"])
        axios
            .post("/api/sidebar", formData)
            .then(res => setSidebarData(res.data))
            .catch(err => console.log(err));
    }, []);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div className="grid">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                    <Card cardTitle="Modules">
                        <Table
                            theadContent={
                                <>
                                    <th scope="col" className="px-6 py-3">Module Name</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
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
                                                onClick={handleOpenModal}
                                            ><i
                                                className="fa fa-edit text-green-500"></i>
                                            </button>
                                            <button type="button" title="Delete" className="ml-4"><i
                                                className="fa fa-trash text-red-500"></i></button>
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
                        overlayBlur={true}
                        size="xl"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                            <div className="col-span-1">
                                <CustomInput/>
                            </div>
                            <div className="col-span-1">
                                <CustomInput/>
                            </div>
                            <div className="col-span-1">
                                <CustomInput/>
                            </div>
                        </div>




                    </Modal>
                </>
            )}
        </>
    )
}