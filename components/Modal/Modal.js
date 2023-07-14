import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {motion} from "framer-motion";

export default function Modal({title, children, onClose, size, handleModalSubmit}) {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const handleCloseModal = () => {
        setModalVisible(false);
        setTimeout(onClose, 200); // Animasyon tamamlandıktan sonra kapatma işlemi
    };

    return (
        <>
            <motion.div
                initial={{backdropFilter: "blur(0px)"}}
                animate={{backdropFilter: "blur(10px)"}}
                className="fixed inset-0 z-50 backdrop-filter backdrop-blur-lg"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                <div
                    className={classNames(
                        "rounded-lg shadow-lg h-fit transform transition-all duration-300 bg-primary_bg_light text-zinc-900 dark:text-white dark:bg-card_bg_dark",
                        {
                            "opacity-0 translate-y-8": !modalVisible,
                            "opacity-100 translate-y-0": modalVisible,
                            "w-96": size === "md",
                            "w-[48rem]": size === "lg",
                            "w-[64rem]": size === "xl",
                            "w-[96rem]": size === "2xl",
                            "w-full": size === "full"
                        }
                    )}
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseModal}>
                            &times;
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">{children}</div>
                    <div className="flex items-center justify-end p-4 border-t border-gray-200">
                        <button
                            className="mr-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                            onClick={handleCloseModal}
                        >
                            Kapat
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                            onClick={handleModalSubmit}
                        >
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}