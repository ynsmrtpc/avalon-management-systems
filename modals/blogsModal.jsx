import CustomInput from "@/components/CustomInput/CustomInput";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {destroyModal} from "@/utils/modal";
import ModalSubmit from "@/components/Modal/ModalSubmit";

export default function BlogsModal({content}) {
    const [authors, setAuthors] = useState([]);
    const [modalData, setModalData] = useState([content][0]);

    useEffect(() => {
        getAuthors();
    }, []);
    const handleModalSubmit = () => {
        const formData = new FormData();

        formData.append("process", modalData.id !== undefined ? "update" : "insert");
        formData.append("data", JSON.stringify(modalData));

        axios.post("/api/portfolio/blogs", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(destroyModal)
    }
    const handleToggleChange = (newStatus) => {
        setModalData((prevState) => ({
            ...prevState,
            status: newStatus ? 1 : 0
        }))
    };
    const getAuthors = async () => {
        const formData = new FormData();
        formData.append("process", "get_authors");

        const authors_result = await axios.post("/api/portfolio/blogs", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        setAuthors(authors_result.data);
    }

    return (
        <>
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
                        inputValue={modalData.url}
                        onInputChange={(e) => setModalData((prevState) => ({
                            ...prevState,
                            url: e.target.value
                        }))}
                    />
                </div>

                <div className="col-span-1">
                    <CustomInput
                        labelContent="Okuma Süresi"
                        inputID="read_time"
                        inputValue={modalData.read_time}
                        onInputChange={(e) => setModalData((prevState) => ({
                            ...prevState,
                            read_time: e.target.value
                        }))}
                    />
                </div>

                <div className="col-span-1">
                    <CustomInput type="select" inputValue={(
                        <>
                            <option value="-1">Seçiniz</option>
                            {authors.map(author => (
                                <>
                                    <option selected={modalData.user_id === author.id}
                                            value={author.id}>{author.name_surname}</option>
                                </>
                            ))}
                        </>
                    )}
                                 labelContent="Yazar Seçin"
                                 inputID="authors"
                                 onInputChange={(e) => setModalData((prevState) => ({
                                     ...prevState,
                                     user_id: e.target.value
                                 }))}
                    />
                </div>

                <div className="col-span-1 mx-auto">
                    <CustomInput labelContent="Status" inputValue={modalData.status}
                                 onInputChange={handleToggleChange} type="radio"/>
                </div>

                <div className="col-span-2">
                    <CustomInput
                        className={"block rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]"}
                        rows="7"
                        onInputChange={(e) => setModalData((prevState) => ({
                            ...prevState,
                            spot: e.target.value
                        }))}
                        inputValue={modalData.spot}
                        type="textarea"
                    />
                </div>
            </div>
            <ModalSubmit text="Kaydet" modalSubmit={handleModalSubmit}/>
        </>
    )
}