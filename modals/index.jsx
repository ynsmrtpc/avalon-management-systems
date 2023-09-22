import modalData from "@/pages/modals";
import { useModals } from "@/utils/modal";

export default function Modal() {
  const modals = useModals();

  return (
    <div className="bg-white">
      {modals.map((modal) => {
        const m = modalData.find((m) => m.name === modal.name);
        return <m.element />;
      })}
    </div>
  );
}
