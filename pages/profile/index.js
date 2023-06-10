import CustomInput from "@/components/CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";

export default function Profile() {
    const [profileData, setProfileData] = useState({});
    const numberOfProfile = [];

    useEffect(() => {
        axios
            .post("/api/profile")
            .then(res => setProfileData(JSON.parse(res.data)[0]))
            .catch(err => console.log(err))
    }, [])

    Object.keys(profileData).forEach(item => {
        if(item !== "id" && item !== "login_token" && item !== "profile_photo"){
            numberOfProfile.push(item);
        }
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div
                    className="bg-white  rounded-md  dark:bg-[#212837] flex justify-start items-center col-span-12 md:col-span-4 h-fit">
                    <img
                        src={profileData.profile_photo}
                        alt="pp"
                        className="w-40 md:w-52 p-8 rounded-full"/>
                    <div>
                        <p className="text-xl md:text-2xl">{profileData.name_surname}</p>
                        <p className="text-sm md:text-xl ">{profileData.username}</p>
                        <button
                            className="p-1  bg-[#fdfcd7] dark:bg-[#9D8050] mt-3 md:px-12 md:mt-6 text-center rounded-md flex items-center">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            <span className="pl-1"> Change Picture</span>
                        </button>
                    </div>
                </div>
                <div
                    className="bg-white rounded-md dark:bg-[#212837] px-4 py-8 col-span-12 md:col-span-8">
                    <h4 className="text-2xl">General Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
                        {numberOfProfile.map(user => (
                        <fieldset className="col-span-6" key={user}>
                                <CustomInput inputID={user} labelContent={fn_make_label(user)} inputPlaceholder={profileData[user]}/>
                        </fieldset>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}