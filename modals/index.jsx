import modalData from "@/pages/modals";
import { destroyModal, useModals } from "@/utils/modal";
import ModalComponent from "@/components/Modal/Modal";

export default function Modal() {
  const modals = useModals();
  return modals.map((modal) => {
    const m = modalData.find((m) => m.name === modal.name);
    return (
      <ModalComponent
        title={m.title}
        onClose={destroyModal}
        overlayBlur={true}
        size={m.size}
      >
        <m.element content={modal.data} />
      </ModalComponent>
    );
  });
}
