import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// 368. Converting the Modal to a Compound Component
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

/*
// 367. Building a Modal Window Using a React Portal
function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      {/* 352. Introducing Another Library: React Hook Form */ /*}
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
*/

export default AddCabin;
