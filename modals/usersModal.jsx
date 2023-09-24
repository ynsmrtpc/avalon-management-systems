import ModalSubmit from "@/components/Modal/ModalSubmit";
import CustomInput from "@/components/CustomInput/CustomInput";
import {useState} from "react";

export default function UsersModal({content}) {
const [userInfo, setUserInfo] = useState([content][0][0] || "")
    const handleModalSubmit = () => {
        // submit modal
    }
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-6 col-span-12">
                    <CustomInput  labelContent="İsim Soyisim" inputValue={userInfo.name_surname}/>
                </div>

                <div className="md:col-span-6 col-span-12">
                    <CustomInput labelContent="Kullanıcı Adı" inputValue={userInfo.username}/>
                </div>
            </div>

            <ModalSubmit modalSubmi t={handleModalSubmit} text="Kaydet" />
        </>
    )
}