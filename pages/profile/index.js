import CustomInput from "@/components/CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";
import classNames from "classnames";

export default function Profile() {
    const [profileData, setProfileData] = useState({});
    const [socialMediaData, setSocialMediaData] = useState({});
    const numberOfProfile = [];
    const socialMediaNames = [];

    useEffect(() => {
        axios
            .post("/api/profile")
            .then(res => setProfileData(JSON.parse(res.data)[0]))
            .catch(err => console.log(err))

        axios
            .get("/api/profile/social_media")
            .then(res => setSocialMediaData(JSON.parse(res.data)[0]))
            .catch(err => console.log(err))

    }, [])
    // socialMediaData.forEach((item, key) => console.log(item))

    Object.keys(socialMediaData).forEach(item => {
        socialMediaNames.push(item);
    });

    Object.keys(profileData).forEach(item => {
        if (item !== "id" && item !== "login_token" && item !== "profile_photo") {
            numberOfProfile.push(item);
        }
    });
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div
                        className="bg-white rounded-md dark:bg-card_bg_dark flex justify-start items-center col-span-12 md:col-span-6 h-fit">
                        <img
                            src={profileData.profile_photo}
                            alt="pp"
                            className="w-40 md:w-52 p-8 rounded-full"/>
                        <div>
                            <p className="text-xl md:text-2xl">{profileData.name_surname}</p>
                            <p className="text-sm md:text-xl ">{profileData.username}</p>
                            <button
                                className="p-1  bg-primary_logo_light dark:bg-primary_logo_dark mt-3 md:px-12 md:mt-6 text-center rounded-md flex items-center justify-center mr-5">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                <span className="pl-1"> Change Picture</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-6">
                        <h4 className="text-2xl">Social Media</h4>
                        <div
                            className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 my-8 gap-5 md:gap-5 text-center">
                            {socialMediaNames.map(social_media => (
                                <a
                                    href={socialMediaData[social_media]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classNames("  py-3 px-4 mx-2 hover:bg-primary_logo_light rounded dark:hover:bg-primary_logo_dark", {
                                        "bg-green-400 dark:bg-green-700": socialMediaData[social_media],
                                        "bg-red-400 dark:bg-red-700": !socialMediaData[social_media],
                                    })}>
                                    <i className={'fab fa-' + social_media}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-12">
                        <h4 className="text-2xl">General Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
                            {numberOfProfile.map(user => (
                                <fieldset className="col-span-6" key={user}>
                                    <CustomInput inputID={user} labelContent={fn_make_label(user)}
                                                 inputPlaceholder={profileData[user]}/>
                                </fieldset>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}