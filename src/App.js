import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(`repositories`).then((response) => {
      setRepositories(response.data);
    });
  });

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repo ${Date.now()}`,
      url: "www.rogerio.dev",
      techs: ["React", "Javascript"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title, url, techs }) => (
          <li key={id}>
            {id} --
            {title} - {url} - {techs}
          </li>
        ))}

        <button onClick={() => handleRemoveRepository(1)}>Remover</button>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
