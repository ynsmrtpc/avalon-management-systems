import store from "@/pages/store";
import { append, destroy, destroyAll } from "@/pages/store/modal";
import { useSelector } from "react-redux";

export const useModals = () => useSelector((state) => state.modal.modals);

export const createModal = (name, data = false) =>
  store.dispatch(
    append({
      name,
      data,
    })
  );

export const destroyMoadal = () => store.dispatch(destroy());
export const destroyAllMoadal = () => store.dispatch(destroyAll());
