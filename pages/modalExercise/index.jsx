import { createModal, useModals } from "@/utils/modal";
import Modal from "@/modals";

export default function ModalExercise() {
  const modals = useModals();
  return (
    <>
      {modals.length > 0 && <Modal />}

      <button onClick={() => createModal("exerciseModal")} className="btn">
        Modal Aç
      </button>
    </>
  );
}
