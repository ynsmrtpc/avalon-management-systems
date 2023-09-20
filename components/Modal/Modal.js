import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {motion} from "framer-motion";

export default function Modal({title, children, onClose, size, handleModalSubmit, buttonText}) {
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
                        "rounded-lg shadow-lg h-fit transform transition-all duration-300 bg-base-200",
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
                            className="btn btn-ghost mr-2"
                            onClick={handleCloseModal}
                        >
                            Kapat
                        </button>
                        <button
                            className="btn"
                            onClick={handleModalSubmit}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}