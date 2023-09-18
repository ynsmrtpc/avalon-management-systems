import axios from "axios";
import {useEffect, useState} from "react";
import Card from "@/components/Card/Card";
import Head from "next/head";
import HomeLayout from "@/layouts/HomeLayout";
export default function gezi_rehberi() {
const [locations, setLocations] = useState([]);

useEffect(() => {
    axios.get("https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/bursa.json")
        .then(res => setLocations(res.data))
        .catch(err => console.log(err))
}, [])
    return(
        <HomeLayout>
            <Head>
                <title>Gezi Rehberi</title>
            </Head>
            {Object.entries(locations).map(([placeName, placeData]) => (
                <>
                    <Card key={placeName} cardTitle={placeName}>
                        <div>
                            <strong className="font-extrabold">Adresi:  </strong>
                            <span className="text-indigo-300">{placeData.yer_adresi}</span>
                        </div>
                        <div>
                            <strong className="font-extrabold">Puanı:  </strong>
                            <span className="text-red-300">{placeData.yer_puani}</span>
                        </div>
                        <div>
                            <strong className="font-extrabold">Ulaşım İmkanı:  </strong>
                            <span className="text-orange-300">{placeData.yer_ulasim_imkani}</span>
                        </div>
                        <div>
                            <strong className="font-extrabold">Fiyat Bilgisi:  </strong>
                            <span className="text-pink-300">{placeData.yer_fiyat_bilgisi}</span>
                        </div>
                        <div>
                            <strong className="font-extrabold">Menü Resmi:  </strong>
                            {placeData.yer_menu_resmi === undefined ?  <a className="text-red-600" >Menü Bulunamadı</a> :
                                <a className="text-green-300" target="_blank" href={placeData.yer_menu_resmi}>{placeName} Menü</a>
                            }
                        </div>
                        <br/>
                    </Card>
                    <br/>
                </>
            ))}
        </HomeLayout>
    )
}