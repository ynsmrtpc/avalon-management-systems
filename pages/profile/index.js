import CustomInput from "@/components/CustomInput/CustomInput";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";
import classNames from "classnames";
import HomeLayout from "@/layouts/HomeLayout";
import getUserData from "@/utils/getUserData";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {useRouter} from "next/router";
import Loading from "@/components/Loading/Loading";

export default function Profile() {
    const router = useRouter();
    const [profileData, setProfileData] = useState({});
    const [profileNames, setProfileNames] = useState({});
    const [socialMediaData, setSocialMediaData] = useState({});
    const [socialMediaNames, setSocialMediaNames] = useState({});
    const [socialMedia, setSocialMedia] = useState("");
    const [socialMediaURL, setSocialMediaURL] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append("attributes", ["id", "name_surname", "username", "title", "email", "phone", "status", "profile_photo", "password"]);

                const social_media_form = new FormData();
                social_media_form.append("process", "social_media_get");
                social_media_form.append("attributes", ["instagram", "facebook", "twitter", "tiktok", "youtube", "linkedin", "github"]);

                const [profileData, socialData] = await Promise.all([
                    axios.post("/api/profile", formData,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }),
                    axios.post("/api/profile/social_media", social_media_form,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }),
                ]);

                // setSocialMediaData(socialData.data)
                const updatedResult = {profileData: profileData.data, socialData: socialData.data};

                setLoading(false);
                // setProfileData(updatedResult.profileData)

                const profile = Object.keys(updatedResult.profileData)
                    .filter(key => key === "id" && key === "password");
                setProfileNames(profile);
                setProfileData(updatedResult.profileData);

                // Sosyal medya isimlerini almak için "data" objesini dolaşıyoruz
                const names = Object.keys(updatedResult.socialData)
                    .filter(key => key !== "id");
                setSocialMediaNames(names);
                setSocialMediaData(updatedResult.socialData);

            } catch (error) {
                console.error('Hata:', error);
            }
        };
        fetchData();

    }, []);


    const socialMediaHandle = (social_media) => {
        const result = socialMediaData[social_media];
        setSocialMediaURL(result === null ? " " : result);
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

            {loading ? (
                    <>
                        <Loading/>
                    </>
                ) :
                (
                    <>
                        <div className="block md:flex justify-between items-center mb-10">
                            <BreadCrumb path={router.pathname}/>
                        </div>
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

                                    <CustomInput inputID="dropzone-file" type="file" className="hidden">
                                        <div className="flex items-center justify-center w-full mt-4 ">
                                            <label htmlFor="dropzone-file"
                                                   className="flex flex-col w-full items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg className="w-8 h-8 mt-1 text-gray-500 dark:text-gray-400"
                                                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <span
                                                        className="mb-2 text-sm text-gray-500 dark:text-gray-400">Resim Yükle</span>
                                                </div>
                                            </label>
                                        </div>
                                    </CustomInput>
                                </div>
                            </div>

                            <div
                                className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-6">
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

                                    {socialMediaURL && (
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
                                                    "dark:bg-primary_logo_dark": socialMedia === social_media,
                                                }
                                            )}
                                        >
                                            <i className={"fab fa-" + social_media}> </i>
                                        </button>
                                    ))}
                                </div>

                            </div>

                            <div
                                className="bg-white rounded-md dark:bg-card_bg_dark px-4 py-8 col-span-12 md:col-span-12">
                                <h4 className="text-2xl"> General Information </h4>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">

                                    {profileNames.map((user) => (
                                        <fieldset className="col-span-6" key={user}>
                                            <CustomInput
                                                inputID={user}
                                                labelContent={fn_make_label(user)}
                                                inputValue={profileData.user}
                                            />
                                        </fieldset>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
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
