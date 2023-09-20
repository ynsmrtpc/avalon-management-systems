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
    // const [profileNames, setProfileNames] = useState({});
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

                const updatedResult = {profileData: profileData.data, socialData: socialData.data};

                setLoading(false);

                // const profile = Object.keys(updatedResult.profileData)
                //     .filter(key => key === "id" && key === "password" && key === "user_id");
                // setProfileNames(profile);
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
                        <div className="block md:flex justify-between items-center mb-2">
                            <BreadCrumb path={router.pathname}/>
                        </div>

                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-12 md:col-span-6">
                                <Card cardTitle="Profile Information">

                                    <div className="flex">
                                        <div className="text-center">
                                            <div className="avatar">
                                                <div className="md:w-36 w-24 rounded-full">
                                                    <img src={profileData.profile_photo}
                                                         alt="pp"/>
                                                </div>
                                            </div>
                                            <CustomInput type="file" className="xs"/>
                                        </div>

                                        <div className="text-center my-auto md:my-0">
                                            <p className="text-xl md:text-5xl">
                                                {profileData.name_surname}
                                            </p>
                                            <p className="text-sm md:text-xl">
                                                {profileData.username}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="col-span-12 md:col-span-6 py-6">
                                <Card cardTitle="Sosyal Medya">
                                    <CustomInput
                                        className="mt-3"
                                        inputID="social_media"
                                        inputPlaceholder={
                                            socialMediaSelected === ""
                                                ? "Aşağıdan eklemek istediğiniz sosyal medya linkinizi seçiniz..."
                                                : `${fn_make_label(
                                                    socialMediaSelected
                                                )} linkinizi buraya girin ve 'Enter' basın`
                                        }
                                        onInputChange={(e) => setSocialMedia(e.target.value)}
                                        handleSubmit={(event) =>
                                            event.key === "Enter" ? addSocialMedia() : null
                                        }
                                        inputValue={socialMedia}
                                    />
                                    <div
                                        className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 my-4 gap-5 mrd:gap-5 text-center mx-auto ">
                                        {socialMediaNames.map((social_media) => (
                                            <button
                                                key={social_media}
                                                title={fn_make_label(social_media)}
                                                onClick={() => {
                                                    setSocialMedia(
                                                        socialData[social_media] === null
                                                            ? `https://www.${social_media}.com/`
                                                            : socialData[social_media]
                                                    );
                                                    setSocialMediaSelected(social_media);
                                                }}
                                                className={classNames(
                                                    "btn hover:bg-base-200 mx-auto relative",
                                                    {
                                                        "btn-neutral": socialMediaSelected === social_media,
                                                    }
                                                )}
                                            >
                                                {socialData[social_media] && (
                                                    <>
                                                        <span
                                                            className="bg-green-500 rounded-full p-1 absolute top-1 right-1"></span>
                                                    </>
                                                )}
                                                {loadingSocial && social_media === socialMediaSelected ? (
                                                    <>
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className={"fab fa-" + social_media}></span>
                                                    </>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {resultPackage.message && (
                                        <div className="my-2">
                                            <Alert
                                                error={resultPackage.error}
                                                message={resultPackage.message}
                                            ></Alert>
                                        </div>
                                    )}
                                </Card>
                            </div>

                            <div className="col-span-12">
                                <Card cardTitle="General Information">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        {Object.entries(profileData).map(([key, value]) =>
                                            (key !== "id" && key !== "profile_photo" && key !== "status") && (
                                                <fieldset className="col-span-6" key={key}>
                                                    <CustomInput
                                                        inputID={value}
                                                        labelContent={fn_make_label(key)}
                                                        inputValue={key === "password" ? "" : value}

                                                    />
                                                </fieldset>
                                            ))}
                                    </div>
                                </Card>
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
