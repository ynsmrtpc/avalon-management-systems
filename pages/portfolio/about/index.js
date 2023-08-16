import HomeLayout from "@/layouts/HomeLayout";
import {useRouter} from "next/router";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import React, {useEffect, useState} from "react";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown/Dropdown";
import axios from "axios";
import {fn_make_label} from "@/utils/functions";
import Loading from "@/components/Loading/Loading";
import CustomInput from "@/components/CustomInput/CustomInput";

export default function About() {
    const router = useRouter()
    const [socialMediaNames, setSocialMediaNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socialMedia, setSocialMedia] = useState("");

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
                    // axios.get('url2')
                ]);
                const updatedResult = {socialData: socialData.data[0]};

                setLoading(false);

                // Sosyal medya isimlerini almak için "data" objesini dolaşıyoruz
                const names = Object.keys(updatedResult.socialData)
                    .filter(key => key !== "id");
                setSocialMediaNames(names);

            } catch (error) {
                console.error('Hata:', error);
            }
        };
        fetchData();
    }, []);


    const handleAbout = () => {

    }

    const addSocialMedia = () => {
        const foundSocialMedia = socialMediaNames.find(social => socialMedia.includes(social));
        if (foundSocialMedia) {
            const result = {socialMediaName: foundSocialMedia, socialMediaURL: socialMedia}
        }
        return 0;
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

                        <div className="grid-cols-6">
                            <Card cardTitle={(
                                <>
                     <span className="flex justify-between">

                         <span>Sosyal Medya</span>
                         {/*<Dropdown*/}
                         {/*    buttonText="Sosyal Medya Ekle"*/}
                         {/*    items={socialMediaNames.map((social, key) => (*/}
                         {/*        <>*/}
                         {/*            <input onClick={() => addSocialMedia(fn_make_label(social))} type="button"*/}
                         {/*                   id={fn_make_label(social)}*/}
                         {/*                   key={key}*/}
                         {/*                   value={fn_make_label(social)}*/}
                         {/*            />*/}
                         {/*        </>*/}
                         {/*    ))}*/}
                         {/*    labels={socialMediaNames}*/}
                         {/*    classes=" bg-white shadow-sm ring-1 ring-inset ring-gray-300"*/}
                         {/*/>*/}
                     </span>
                                </>
                            )}>
                                {/*
                                tek bir input yap ve girilen text'i socialMediaControl fonksiyonuna gönder
                                burada veritabanından çektiğin sosyal medya isimleri o inputun içinde varsa direkt o alana kayıt at
                                mesela twitter varsa eğer inputun içinde kaydı oraya at
                                */}
                                <div className="my-2">
                                    <small className="text-xs font-thin block">* Sosyal Medya linkinizi aşağıya yapıştırın ve
                                        'Enter' tuşuna basın</small>
                                    <small className="text-xs font-thin block">* Birden fazla ekleme yapmak için aralara virgül
                                        koyunuz</small>
                                    <CustomInput
                                        className="mt-2"
                                        inputID="social_media"
                                        inputPlaceholder="Sosyal Medya Linkinizi Buraya Yapıştırın..."
                                        onInputChange={(e) => setSocialMedia(e.target.value)}
                                        handleSubmit={(event) => event.key === 'Enter' ? addSocialMedia() : null}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </HomeLayout>
    )
}