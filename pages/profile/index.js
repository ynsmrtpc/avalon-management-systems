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
import Card from "@/components/Card/Card";
import Alert from "@/components/Alert/Alert";

export default function Profile() {
    const router = useRouter();
    const [profileData, setProfileData] = useState({});
    const [profileNames, setProfileNames] = useState({});
    const [socialMediaNames, setSocialMediaNames] = useState([]);
    const [socialMedia, setSocialMedia] = useState("");
    const [socialMediaSelected, setSocialMediaSelected] = useState("");
    const [socialData, setSocialData] = useState("");
    const [loadingSocial, setLoadingSocial] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resultPackage, setResultPackage] = useState({error: 0, message: ""})

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
                    .filter(key => key === "id" && key === "password" && key === "user_id");
                setProfileNames(profile);
                setProfileData(updatedResult.profileData);

                // Sosyal medya isimlerini almak için "data" objesini dolaşıyoruz
                const names = Object.keys(updatedResult.socialData)
                    .filter(key => key !== "id");
                setSocialMediaNames(names);
                setSocialData(updatedResult.socialData);

            } catch (error) {
                console.error('Hata:', error);
            }
        };
        fetchData();

    }, []);

    const addSocialMedia = () => {
        const foundSocialMedia = socialMediaNames.find(social => socialMedia.includes(social));
        if (foundSocialMedia) {
            setLoadingSocial(true);
            const formDataSocial = new FormData();
            formDataSocial.append("process", "social_media_add");
            formDataSocial.append("url", socialMedia);
            formDataSocial.append("socialMedia", socialMediaSelected);
            axios
                .post("/api/profile/social_media", formDataSocial, {
                    "headers": {
                        "Content-Type": "application/json",
                    }
                })
                .then(res => setResultPackage({error: 0, message: res.data}))
                .catch(err => setResultPackage({error: 1, message: err}))
                .finally(() => setLoadingSocial(false));
        } else {
            setResultPackage({error: 1, message: "Hatalı bir adres girdiniz..."})
        }
    }

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

                        <div className="grid grid-cols-1 md:grid-cols-12 mx-auto gap-5 mb-6">
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
                                        <div className="flex items-center justify-center w-full mt-4">
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


                            <div className="col-span-12 md:col-span-6">
                                <Card cardTitle={(
                                    <>
                                     <span className="flex justify-between">
                                         <span>Sosyal Medya</span>
                                     </span>
                                    </>
                                )}>
                                    <CustomInput
                                        className="mt-3"
                                        inputID="social_media"
                                        inputPlaceholder={socialMediaSelected === "" ? "Aşağıdan eklemek istediğiniz sosyal medya linkinizi seçiniz..." : `${fn_make_label(socialMediaSelected)} linkinizi buraya girin ve 'Enter' basın`}
                                        onInputChange={(e) => setSocialMedia(e.target.value)}
                                        handleSubmit={(event) => event.key === 'Enter' ? addSocialMedia() : null}
                                        inputValue={socialMedia}
                                    />
                                    <div
                                        className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 my-4 gap-5 mrd:gap-5 text-center mx-auto">
                                        {socialMediaNames.map((social_media) => (
                                            <button
                                                key={social_media}
                                                title={fn_make_label(social_media)}
                                                onClick={() => {
                                                    setSocialMedia(socialData[social_media] === null ? `https://www.${social_media}.com/` : socialData[social_media])
                                                    setSocialMediaSelected(social_media)
                                                }}
                                                className={classNames(
                                                    "py-3 px-4 hover:bg-primary_logo_light rounded dark:hover:bg-primary_logo_dark mx-auto",
                                                    {
                                                        "dark:bg-primary_logo_dark": socialMediaSelected === social_media,
                                                    }
                                                )}
                                            >
                                                {(loadingSocial && social_media === socialMediaSelected) ? (
                                                        <>
                                                            <div role="status">
                                                                <svg aria-hidden="true"
                                                                     className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                                                                     viewBox="0 0 100 101" fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                        fill="currentColor"/>
                                                                    <path
                                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                        fill="currentFill"/>
                                                                </svg>
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <i className={"fab fa-" + social_media}> </i>
                                                        </>
                                                    )
                                                }
                                            </button>
                                        ))}
                                    </div>
                                    {resultPackage.message && (
                                        <>
                                            <Alert error={resultPackage.error} message={resultPackage.message}></Alert>
                                        </>
                                    )}
                                </Card>
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
