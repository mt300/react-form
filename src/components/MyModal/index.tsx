import { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-modal';

import "./styles.css";

Modal.setAppElement('body');

interface MyModalProps {
  title: string;
  // entityType: "user" | "real state";
  users?: User[];
  setUserFactory: Dispatch<SetStateAction<UserFactory>>;
  // realStates?: RealState[];
  // setRealStateFactory: Dispatch<SetStateAction<RealStateFactory>>;
}

type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
};

type RealState = {
  id?: string;
  category: string;
  description: string;
  address: string;
  value: string;
};

export type UserFactory = {
  users: User[] | undefined;
}

export type RealStateFactory = {
  realStates: RealState[] | undefined;
}

export function MyModal({ title, users, setUserFactory, realStates, setRealStatesFactory,entityType}: MyModalProps) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateState(e: any) {
    const type = e.target.name;
    const value = e.target.value;
    if (type === 'name') {
      setName(value);
    } else if (type === 'email') {
      setEmail(value);
    } else if (type === 'phone'){
      setPhone(value);
    } else if (type === 'category'){
      setCategory(value);
    } else if (type === 'description'){
      setDescription(value);
    } else if (type === 'address'){
      setAddress(value);
    } else {
      setValue(value);
    }
  }

  function handleCreateUsers(e: any, users: User[] | undefined, setUserFactory: Dispatch<SetStateAction<UserFactory>>) {
    e.preventDefault();

    const newUser: User = { id: "6", name, email, phone };
    const usersPlusNew = users;
    usersPlusNew?.push(newUser);
    setUserFactory({users:usersPlusNew});
    // console.log(typeof(users))
  }
  function handleCreateStates(e: any, realStates: RealState[] | undefined, setRealStatesFactory: Dispatch<SetStateAction<RealStateFactory>>) {
    e.preventDefault();

    const newRealState: RealState = { id: "5", category, description, address, value };
    const realStatePlusNew = realStates;
    realStatePlusNew?.push(newRealState);
    setRealStatesFactory({realStates:realStatePlusNew});
    console.log(entityType)
  }

  return (
    <div>
      <button onClick={openModal}>Criar novo</button>
      <Modal
        overlayClassName={"modal-overlay"}
        className={"modal"}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={title}
      >
        { entityType === "user" ? (
        <>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{title}</h2>
        <button className="x-button" onClick={closeModal}><span>x</span></button>
        <form onSubmit={(e) => handleCreateUsers(e, users, setUserFactory)}>Create
          <div className="modal-first-row">
            <div className="modal-input-container">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" value={name} onChange={updateState} />
            </div>
            <div className="modal-input-container">
              <label htmlFor="name">Email:</label>
              <input type="text" id="email" name="email" value={email} onChange={updateState} />
            </div>
          </div>
          <div className="modal-second-row">
            <div className="modal-input-container">
              <label htmlFor="phone">Telefone:</label>
              <input type="text" id="phone" name="phone" value={phone} onChange={updateState} />
            </div>
          </div>
          <div className="buttons-container">
            <button type="submit">Salvar</button>
            <button onClick={closeModal} type="button">Cancelar</button>
          </div>

        </form>
        </>
        ):(
        <>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{title}</h2>
        <button className="x-button" onClick={closeModal}><span>x</span></button>
        <form onSubmit={(e) => handleCreateStates(e, realStates, setRealStatesFactory)}>Create
          <div className="modal-first-row">
            <div className="modal-input-container">
              <label htmlFor="name">Categoria:</label>
              <input type="text" id="category" name="category" value={category} onChange={updateState} />
            </div>
            <div className="modal-input-container">
              <label htmlFor="name">Descrição:</label>
              <input type="text" id="description" name="description" value={description} onChange={updateState} />
            </div>
          </div>
          <div className="modal-second-row">
            <div className="modal-input-container">
              <label htmlFor="name">Endereço:</label>
              <input type="text" id="address" name="address" value={address} onChange={updateState} />
            </div>
            <div className="modal-input-container">
              <label htmlFor="name">Valor:</label>
              <input type="text" id="value" name="value" value={value} onChange={updateState} />
            </div>
          </div>
          <div className="buttons-container">
            <button type="submit">Salvar</button>
            <button onClick={closeModal} type="button">Cancelar</button>
          </div>

        </form>
        </>
        )}
      </Modal>
    </div >
  )

}