import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";

function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="p-8 ">
            <h1 className="text-3xl font-bold">React'te Tailwind ile Modal</h1>
            <p className="mt-4 text-lg">
                Bu sayfada React'te tailwind kullanarak bir modal componenti nasıl
                yapabileceğinizi görebilirsiniz.
            </p>
            <button
                className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                onClick={handleOpenModal}
            >
                Modal Aç
            </button>
            {showModal && (
                <>
                    <div className="fixed inset-0 backdrop-filter backdrop-blur-lg" />
                    <Modal
                        title="Modül Düzenle"
                        content="Bu modal'ın içeriği burada gösterilir. İstediğiniz kadar metin veya başka bir element ekleyebilirsiniz."
                        onClose={handleCloseModal}
                        overlayBlur={true}
                        size="xl"
                    >
                        dfsdfsdkjfh

                    </Modal>
                </>
            )}
        </div>
    );
}

export default Home;
