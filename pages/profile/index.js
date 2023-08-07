import CustomInput from "@/components/CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";
import classNames from "classnames";
import HomeLayout from "@/layouts/HomeLayout";
import getUserData from "@/utils/getUserData";

export default function Profile() {
    const [profileData, setProfileData] = useState({});
    const [socialMediaData, setSocialMediaData] = useState({});
    const [socialMedia, setSocialMedia] = useState("");
    const [socialMediaURL, setSocialMediaURL] = useState("");
    const [message, setMessage] = useState("");
    const numberOfProfile = [];
    const socialMediaNames = [];

    useEffect(() => {
        const formData = new FormData();
        formData.append("attributes", [
            "id",
            "name_surname",
            "username",
            "title",
            "email",
            "phone",
            "status",
            "profile_photo",
            "password",
        ]);
        axios
            .post("/api/profile", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err));
        const social_media_form = new FormData();

        social_media_form.append("process", "social_media_get");
        social_media_form.append("attributes", [
            "instagram",
            "facebook",
            "twitter",
            "tiktok",
            "youtube",
            "linkedin",
            "github",
        ]);
        axios
            .post("/api/profile/social_media", social_media_form, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => setSocialMediaData(res.data))
            .catch((err) => console.log(err));
    }, []);
    
    Object.keys(socialMediaData).forEach((item) => {
        socialMediaNames.push(item);
    });
    Object.keys(profileData).forEach((item) => {
        if (item !== "id" && item !== "profile_photo" && item !== "password") {
            numberOfProfile.push(item);
        }
    });
    const socialMediaHandle = (social_media) => {
        setSocialMedia(social_media);
        setSocialMediaURL(
            socialMediaData[social_media] === null
                ? ""
                : socialMediaData[social_media]
        );
    };
    const socialButtonHandle = async () => {
        const formData = new FormData();
        formData.append("url", socialMediaURL);
        formData.append("socialMedia", socialMedia);
        formData.append("process", "social_media_add");

        await axios
            .post("/api/profile/social_media", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => setMessage(res.data))
            .catch((err) => console.log(err))
            .finally(() => {
                setTimeout(() => {
                    setMessage("");
                    setSocialMedia("");
                }, 3000);
            });
    };

    return (
        <HomeLayout>
            <div className="grid mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 mx-auto gap-5">
                    <div
                        className="bg-white rounded-md dark:bg-card_bg_dark lg:flex lg:justify-start lg:items-center col-span-12 md:col-span-6">
                        <img
                            src={profileData.profile_photo}
                            alt="pp"
                            className="w-40 md:w-52 p-8 rounded-full mx-auto"
                        />
                        <div className="sm:flex sm:flex-col sm:items-center grid grid-cols-1 mx-auto">
                            <p className="text-xl md:text-2xl mx-auto">
                                {profileData.name_surname}
                            </p>
                            <p className="text-sm md:text-xl mx-auto">
                                {profileData.username}
                            </p>
                            <button
                                className="p-1 bg-primary_logo_light dark:bg-primary_logo_dark mt-3 md:mt-6 text-center rounded-md flex items-center justify-center">
                                <i className="fa-solid fa-cloud-arrow-up"> </i>
                                <span className="pl-1"> Change Picture </span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-6">
                        <h4 className="text-2xl">
                            Social Media
                            {message && (
                                <div
                                    className="text-sm text-center bg-sky-400 dark:bg-sky-800 dark:text-white text-zinc-700 p-2 rounded w-full">

                                    {message}
                                </div>
                            )}
                        </h4>
                        <div className="mt-4 flex">

                            {socialMedia && (
                                <CustomInput
                                    inputPlaceholder={
                                        "Your " + fn_make_label(socialMedia) + " profile URL"
                                    }
                                    inputID={socialMedia}
                                    inputValue={socialMediaURL}
                                    onInputChange={(e) => setSocialMediaURL(e.target.value)}
                                >
                                    <button
                                        className="bg-primary_logo_dark py-1 px-2.5 text-center rounded"
                                        onClick={socialButtonHandle}
                                    >
                                        Add
                                    </button>

                                </CustomInput>
                            )}
                        </div>

                        <div
                            className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 my-8 gap-5 mrd:gap-5 text-center mx-auto">

                            {socialMediaNames.map((social_media) => (
                                <button
                                    key={social_media}
                                    onClick={() => socialMediaHandle(social_media)}
                                    className={classNames(
                                        "py-3 px-4 hover:bg-primary_logo_light rounded dark:hover:bg-primary_logo_dark mx-auto",
                                        {
                                            "bg-green-400 dark:bg-green-800":
                                                socialMediaData[social_media] &&
                                                socialMedia !== social_media,
                                            "bg-red-400 dark:bg-red-800":
                                                !socialMediaData[social_media] &&
                                                socialMedia !== social_media,
                                            "dark:bg-primary_logo_dark": socialMedia === social_media,
                                        }
                                    )}
                                >
                                    <i className={"fab fa-" + social_media}> </i>
                                </button>
                            ))}
                        </div>

                    </div>

                    <div className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-12">
                        <h4 className="text-2xl"> General Information </h4>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">

                            {numberOfProfile.map((user) => (
                                <fieldset className="col-span-6" key={user}>
                                    <CustomInput
                                        inputID={user}
                                        labelContent={fn_make_label(user)}
                                        inputPlaceholder={profileData[user]}
                                    />
                                </fieldset>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </HomeLayout>
    );
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
