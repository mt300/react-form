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
  id: number;
  category: string;
  description: string;
  address: string;
  value: number;
};

export type UserFactory = {
  users: User[] | undefined;
}

export type RealStateFactory = {
  realStates: RealState[] | undefined;
}

export function MyModal({ title, users, setUserFactory }: MyModalProps) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
    } else {
      setPhone(value);
    }
  }

  function handleCreate(e: any, users: User[] | undefined, setUserFactory: Dispatch<SetStateAction<UserFactory>>) {
    e.preventDefault();

    const newUser: User = { id: "6", name, email, phone };
    const usersPlusNew = users;
    usersPlusNew?.push(newUser);
    setUserFactory(usersPlusNew);
    console.log(typeof(users))
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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{title}</h2>
        <button className="x-button" onClick={closeModal}><span>x</span></button>
        <form onSubmit={(e) => handleCreate(e, users, setUserFactory)}>Create
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
              <label htmlFor="telefone">Telefone:</label>
              <input type="text" id="telefone" name="telefone" value={phone} onChange={updateState} />
            </div>
          </div>
          <div className="buttons-container">
            <button type="submit">Salvar</button>
            <button onClick={closeModal} type="button">Cancelar</button>
          </div>

        </form>
      </Modal>
    </div >
  )

}