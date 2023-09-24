import Avatar from "@/components/Avatar/Avatar";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import Table from "@/components/Table/Table";
import HomeLayout from "@/layouts/HomeLayout";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading/Loading";
import StatusControl from "@/components/StatusControl";
import ActionButtons from "@/components/ActionButtons";
import getUserData from "@/utils/getUserData";
import {fn_delete} from "@/utils/functions";
import {createModal, useModals} from "@/utils/modal";
import Modal from "@/modals";

export default function Users() {
    const modals = useModals();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const formData = new FormData();
        formData.append("action", "get");

        const result = await axios.post("/api/system/users", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result) {
            setUsers(result.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <HomeLayout>

            {modals.length > 0 && <Modal/>}

            {loading ? (
                <Loading/>
            ) : (
                <>
                    <div className="block md:flex justify-between items-center mb-10">
                        <BreadCrumb path={router.pathname}/>
                        <button onClick={() => createModal("usersModal")} className="btn btn-success">Yeni Ekle</button>
                    </div>

                    <Table
                        theadContent={
                            <>
                                <th>#</th>
                                <th>Profil Resmi</th>
                                <th>Adı Soyadı</th>
                                <th>Kullanıcı Adı</th>
                                <th>E-posta</th>
                                <th className="text-center">Durum</th>
                                <th className="text-center">İşlem</th>
                            </>
                        }
                        tbodyContent={users.map((user, key) => (
                            <tr className="hover:bg-base-200 transition-all">
                                <td className="w-24">{++key}</td>
                                <td className="w-32">
                                    <Avatar
                                        size="xs"
                                        imageURL={user.profile_photo}
                                        rounded="full"
                                    />
                                </td>
                                <td>{user.name_surname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td className="text-center">
                                    <StatusControl status={user.status}/>
                                </td>
                                <td className="w-24">
                                    <ActionButtons deleteHandle={fn_delete}
                                                   editHandle={() => createModal("usersModal", users.filter(u => u.id === user.id ))}/>
                                </td>
                            </tr>
                        ))}
                    />
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
