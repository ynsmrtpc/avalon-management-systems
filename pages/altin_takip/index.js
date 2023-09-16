import HomeLayout from "@/layouts/HomeLayout";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {useRouter} from "next/router";
import React from "react";
import Table from "@/components/Table/Table";
import serverLayer from "next/dist/server/typescript/rules/server";

export default function AltinTakip() {
    const router = useRouter()
    const years = Array.from({length: 2030 - 2022 + 1}, (_, index) => 2022 + index);
    const today = new Date();
    const options = {month: 'long'};
    const todayMonth = today.toLocaleDateString('tr-TR', options);
    const todayYear = today.getFullYear();

    const turkishMonths = Array.from({length: 12}, (_, index) => {
        const date = new Date(todayYear, index, 1);
        return date.toLocaleDateString('tr-TR', {month: 'long'});
    });

    return (

        <HomeLayout>
            <div className="block md:flex justify-between items-center mb-5">
                <BreadCrumb path={router.pathname}/>
                <button
                    className="grid ml-auto mt-5 md:mt-auto text-md px-5 py-3 rounded text-white bg-green-500 hover:bg-green-400"
                    onClick={() => handleOpenModal()}>
                    Yeni Ekle
                </button>
            </div>

            <div className="md:grid md:grid-cols-2 block mb-5 gap-5">
                <fieldset>
                    <label htmlFor="year">Yıl Seçin</label>
                    <select name="year" id="year" className="col-span-1 rounded py-1.5 mt-2 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white mb-2
                dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]">
                        {years.map((year, key) => {
                            const select = todayYear === year ? true : false;
                            return (
                                <option selected={select} key={key} value={year}>{year}</option>
                            )
                        })}
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="year">Ay Seçin</label>
                    <select name="year" id="year" className="col-span-1 rounded py-1.5 mt-2 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white
                dark:focus:bg-card_bg_dark transition-[background-color] outline-[#4b5563]">
                        {turkishMonths.map((month, key) => {
                            const select = todayMonth === month ? true : false;
                            return (
                                <option selected={select} key={key} value={month}>{month}</option>
                            )
                        })}
                    </select>
                </fieldset>
            </div>

            <Table theadContent={(
                <>
                    <th className="border-b-2 py-3">#</th>
                    <th className="border-b-2">Tarih</th>
                    <th className="border-b-2">Miktar</th>
                    <th className="border-b-2">Gram Fiyat</th>
                    <th className="border-b-2">Toplam Fiyat</th>
                    <th className="border-b-2">İşlem</th>
                </>
            )} tbodyContent={(
                <>
                    <tr className="hover:bg-card_bg_dark text-center">
                        <td className="py-3">1</td>
                        <td>12-12-2022</td>
                        <td>3 gr</td>
                        <td>1650</td>
                        <td>6500</td>
                        <td>
                            <button
                                type=" button"
                                title=" Edit"
                                className=" ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                onClick={() => {
                                    handleOpenModal(blog.id)
                                }}
                            ><i
                                className=" fa fa-edit text-green-500"></i>
                            </button>
                            <button
                                type=" button"
                                title=" Delete"
                                className=" ml-2 border px-1.5 py-0.5 rounded hover:bg-gray-200"
                                onClick={() => handleDelete(blog.id)}
                            >
                                <i className=" fa fa-trash text-red-500"></i>
                            </button>
                        </td>
                    </tr>
                </>
            )}/>

        </HomeLayout>
    )
}