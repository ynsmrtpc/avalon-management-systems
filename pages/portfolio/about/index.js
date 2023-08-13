import HomeLayout from "@/layouts/HomeLayout";
import {useRouter} from "next/router";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import React from "react";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown/Dropdown";



export default function About() {
    const router = useRouter()

    const handleAbout = () => {

    }

    const handleSocial = () => {

    }

    return (
        <HomeLayout>
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
                         {/*<button*/}
                         {/*      className="grid ml-auto mt-1 mb-2 my-auto text-xs p-2 rounded text-white bg-indigo-500 hover:bg-indigo-400"*/}
                         {/*      onClick={handleSocial}>*/}
                         {/*      Sosyal Medya Ekle*/}
                         {/*</button>*/}
                         <Dropdown
                             buttonText="Sosyal Medya Ekle"
                             items={["Github","Linkedin","X (Twitter)","Facebook","Instagram", "Youtube"]}
                         />
                     </span>
                     </>
                 )}>

                 </Card>
             </div>
          </div>
        </HomeLayout>
    )
}