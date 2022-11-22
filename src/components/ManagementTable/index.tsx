import { Dispatch, SetStateAction } from "react";
import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { MyModal } from "../MyModal";
import {User} from "../../types/types";

import "./styles.css";

interface ManagementTableProps {
  title: string;
  entityType: string;
  users?: User[];
  setUserFactory: Dispatch<SetStateAction<UserFactory>>;
  realStates?: RealState[];
  setRealStateFactory: Dispatch<SetStateAction<RealStateFactory>>;
}

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// };

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

export function ManagementTable({
  title,
  entityType,
  users,
  setUserFactory,
  realStates,
  setRealStateFactory
}: ManagementTableProps) {

  async function handleDelete(e: any, entity_id: number, entityType: String) {

    if (entityType === 'user') {
      let usersWithoutDeleteElement: User[] | undefined = [];
      usersWithoutDeleteElement = users?.filter((e: User) => {
        return e.id !== entity_id
      })

      const deleteRequest = await fetch(`http://localhost:5173/api/users/${entity_id}`, { method: "DELETE" });

      if (deleteRequest.status === 204) {
        setUserFactory({ users: usersWithoutDeleteElement });
      }
    } else {
      let realStatesWithoutDeleteElement: RealState[] | undefined = [];
      realStatesWithoutDeleteElement = realStates?.filter((e: RealState) => {
        return e.id !== entity_id
      })

      const deleteRequest = await fetch(`http://localhost:5173/api/real-states/${entity_id}`, { method: "DELETE" });

      if (deleteRequest.status === 204) {
        setRealStateFactory({ realStates: realStatesWithoutDeleteElement });
      }
    }
  }
  return (
    <div className="management-table-container">
      <header>
        <h2>{title}</h2>
        <MyModal title={entityType === "user"?"Criar usuário":"Cadastrar Imóvel"} users={entityType === "user"?users:undefined} setUserFactory={entityType === "user"?setUserFactory:setRealStateFactory} />
      </header>
      <div
        className={
          entityType === "user"
            ? "table-container-user"
            : "table-container-real-state"
        }
      >
        {entityType === "user" ? (
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th className="user-name">Nome</th>
                <th className="user-email">E-mail</th>
                <th className="user-phone">Telefone</th>
                <th className="edit"></th>
                <th className="delete"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User) => (
                <tr key={user.id}>
                  <>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name">{user.name}</td>
                    <td className="user-email">{user.email}</td>
                    <td className="user-phone">{user.phone}</td>
                    <td className="edit">
                      <span>
                        <button type="button" >
                          <FiEdit2 />
                          Editar
                        </button>
                      </span>
                    </td>
                    <td className="delete">
                      <BiTrash onClick={(e) => handleDelete(e, user.id, 'user')} className="trash-icon" />
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th className="real-state-id">id</th>
                <th className="real-state-category">Categoria</th>
                <th className="real-state-real-state-description">Descrição</th>
                <th className="real-state-address">Endereço</th>
                <th className="real-state-value">Valor</th>
                <th className="edit"></th>
                <th className="delete"></th>
              </tr>
            </thead>
            <tbody>
              {realStates?.map((realState: RealState) => (
                <tr key={realState.id}>
                  <>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="real-state-id">{realState.id}</td>
                    <td className="real-state-category">{realState.category}</td>
                    <td className="real-state-real-state-description">
                      {realState.description}
                    </td>
                    <td className="real-state-address">{realState.address}</td>
                    <td className="real-state-value">{realState.value}</td>
                    <td className="edit">
                      <button type="button">
                        <FiEdit2 />
                        Editar
                      </button>
                    </td>
                    <td className="delete">
                      <BiTrash className="trash-icon" onClick={(e) => handleDelete(e, realState.id, "real-state")} />
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination-container">
        <span>0 - 1 de 1</span>
        <div className="pagination-button-group">
          <button>1</button>
        </div>
      </div>
    </div>
  );
}
