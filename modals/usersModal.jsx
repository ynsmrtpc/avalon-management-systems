import ModalSubmit from "@/components/Modal/ModalSubmit";
import CustomInput from "@/components/CustomInput/CustomInput";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";

export default function UsersModal({ content }) {
  const [userInfo, setUserInfo] = useState([content][0][0] || "");

  const handleModalSubmit = () => {
    // submit modal
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="mx-auto">
          <Avatar
            className="flex justify-center"
            size="lg"
            rounded="lg"
            imageURL={userInfo.profile_photo}
          />
          <CustomInput type="file" className="xs" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-x-5 mt-2 text-center">
        <CustomInput
          labelContent="İsim Soyisim"
          inputValue={userInfo.name_surname}
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              name_surname: e.target.value,
            }))
          }
        />

        <CustomInput
          labelContent="Kullanıcı Adı"
          inputValue={userInfo.username}
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
        />

        <CustomInput
          labelContent="Şifre"
          type="password"
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />

        <CustomInput
          labelContent="Ünvan"
          inputValue={userInfo.title}
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />

        <CustomInput
          labelContent="Email"
          inputValue={userInfo.email}
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />

        <CustomInput
          inputValue={userInfo.phone}
          labelContent="Telefon"
          onInputChange={(e) =>
            setUserInfo((prevState) => ({
              ...prevState,
              phone: e.target.value,
            }))
          }
        />
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12 mx-auto">
          <CustomInput
            inputValue={userInfo.status}
            labelContent="Durum"
            inputID="status"
            type="radio"
            onInputChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                status: e ? 1 : 0,
              }))
            }
          />
        </div>
      </div>
      <ModalSubmit modalSubmi t={handleModalSubmit} text="Kaydet" />
    </>
  );
}
