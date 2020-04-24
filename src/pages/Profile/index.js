import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";
// import { Container } from './styles';

export default function Profiule() {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  async function getIncidents() {
    const response = await api.get("profile", {
      headers: { Authorization: ongId },
    });
    setIncidents(response.data);
  }

  useEffect(() => {
    getIncidents();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: { Authorization: ongId },
      });
      getIncidents();
    } catch (error) {
      alert("Falha ao excluir caso");
    }
  }

  function handleLogout() {
    localStorage.removeItem("ongName");
    localStorage.removeItem("ongId");
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incident/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastros</h1>

      <ul>
        {incidents.map((i) => (
          <li key={i.id}>
            <strong>CASO:</strong>
            <p>{i.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{i.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(i.value)}
            </p>

            <button type="button" onClick={() => handleDelete(i.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
