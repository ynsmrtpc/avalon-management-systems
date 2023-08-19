import HomeLayout from "@/layouts/HomeLayout";
import {useRouter} from "next/router";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import React, {useEffect, useState} from "react";
import Card from "@/components/Card/Card";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";
import Loading from "@/components/Loading/Loading";
import CustomInput from "@/components/CustomInput/CustomInput";
import getUserData from "@/utils/getUserData";
import classNames from "classnames";
import Alert from "@/components/Alert/Alert";

export default function About() {
    const router = useRouter()
    const [socialMediaNames, setSocialMediaNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socialMedia, setSocialMedia] = useState("");
    const [socialMediaSelected, setSocialMediaSelected] = useState("github");
    const [socialData, setSocialData] = useState("github");
    const [loadingSocial, setLoadingSocial] = useState(false);
    const [resultPackage, setResultPackage] = useState({error: 0, message: ""})
    const [aboutText, setAboutText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append("process", "all_social_media");

                const [socialData] = await Promise.all([
                    axios.post("/api/profile/social_media", formData,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }),
                ]);
                const updatedResult = {socialData: socialData.data[0]};

                setLoading(false);

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

    const handleAbout = () => {
        const formDataAbout = new FormData();
        formDataAbout.append("content", aboutText);

        axios
            .post("/api/profile/about", formDataAbout, {
                "headers": {
                    "Content-Type": "application/json",
                }
            })
            .then(res => setResultPackage({error: 0, message: res.data}))
            .catch(err => setResultPackage({error: 1, message: err}))
            .finally(() => setLoadingSocial(false));
    }

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
            ) : (
                <>

                    <div className="block md:flex justify-between items-center mb-10">
                        <BreadCrumb path={router.pathname}/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="grid-cols-12">
                            <Card cardTitle="Hakkında">

                      <textarea name="hakkinda"
                                id="hakkinda"
                                rows="7"
                                onChange={(e) => setAboutText(e.target.value)}
                                className="block mt-4 rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]"
                      >
                      </textarea>

                                <button
                                    className="grid ml-auto mt-5 mb-2 my-auto text-xs p-2 rounded text-white bg-green-500 hover:bg-green-400"
                                    onClick={handleAbout}>
                                    Kaydet
                                </button>
                            </Card>
                        </div>

                        <div className="grid-cols-12 md:grid-cols-6">
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
                                    inputPlaceholder={`${fn_make_label(socialMediaSelected)} Linkinizi Buraya Girin ve 'Enter' Basın`}
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
                </>
            )}
        </HomeLayout>
    )
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
