import modalData from "@/pages/modals";
import {useModals} from "@/utils/modal";

export default function Modal() {
    const modals = useModals();

    return (
        <>
            {modals.map((modal) => {
                const m = modalData.find((m) => m.name === modal.name);
                return (
                    <m.element content={modal.data} info={m}/>
                );
            })}</>
    )
}
