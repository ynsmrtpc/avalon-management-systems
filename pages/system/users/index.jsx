import Avatar from "@/components/Avatar/Avatar";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import Table from "@/components/Table/Table";
import HomeLayout from "@/layouts/HomeLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Users() {
  const router = useRouter();
  const [users, setUSers] = useState([]);

  async function fetchData() {
    const formData = new FormData();
    formData.append("action", "get");

    const result = await axios.post("/api/system/users", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result) {
      setUSers(result.data);
      //   console.log(result.data);
    }
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <HomeLayout>
      <div className="block md:flex justify-between items-center mb-10">
        <BreadCrumb path={router.pathname} />
        <button className="btn btn-success">Yeni Ekle</button>
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
            <th className="text-right">İşlem</th>
          </>
        }
        tbodyContent={users.map((user, key) => (
          <tr className="hover:bg-base-200 transition-all">
            <td className="w-24">{++key}</td>
            <td className="w-32">
              <Avatar size="xs" imageURL={user.profile_photo} rounded="full" />
            </td>
            <td>{user.name_surname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td className="text-center">
              <i
                className={`fa fa-${
                  user.status === 1
                    ? "heart text-success"
                    : "heart-crack text-error"
                }`}
              ></i>
            </td>
            <td className="flex justify-end">
              <div className="grid grid-cols-2  gap-x-2">
                <button className="btn btn-outline btn-success btn-xs col-span-1">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-outline btn-error btn-xs col-span-1">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      />
    </HomeLayout>
  );
}
