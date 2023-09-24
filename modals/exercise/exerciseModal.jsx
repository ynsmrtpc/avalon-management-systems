import {destroyModal} from "@/utils/modal";

export default function ExerciseModal() {
  return (
      <div>
        Exercise Modal 1 <br/><br/>
        <button className="btn btn-secondary" onClick={destroyModal}>Kapat</button>
      </div>);
}
