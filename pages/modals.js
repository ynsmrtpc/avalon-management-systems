import ExerciseModal from "@/modals/exercise/exerciseModal";
import ExerciseModal2 from "@/modals/exercise/exerciseModal2";
import BlogsModals from "@/modals/blogsModal";
import ProjectModal from "@/modals/projectModal";
import UsersModal from "@/modals/usersModal";

const modals = [
  {
    name: "exerciseModal",
    element: ExerciseModal,
  },
  {
    name: "exerciseModal2",
    element: ExerciseModal2,
  },
  {
    name: "blogsModal",
    title: "Blog Ekle / Düzenle",
    size: "lg",
    buttonText: "Kaydet",
    element: BlogsModals,
  },
  {
    name: "projectsModal",
    title: "Proje Ekle / Düzenle",
    size: "lg",
    buttonText: "Kaydet",
    element: ProjectModal,
  },
  {
    name: "usersModal",
    title: "Kullanıcı Ekle / Düzenle",
    size: "xl",
    buttonText: "Kaydet",
    element: UsersModal,
  },
];

export default modals;
