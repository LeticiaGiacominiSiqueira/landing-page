import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Modal from "./components/modal/modal";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [lastImage, setLastImage] = useState(null);

  // Função para buscar a última imagem do Supabase
  const fetchLastImage = async () => {
    const { data, error } = await supabase.storage.from("uploads").list();

    if (error) {
      console.error("Erro ao buscar imagens:", error);
    } else if (data.length > 0) {
      // Pegando a última imagem com base na data
      const lastFile = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];
      const { data: urlData } = supabase.storage
        .from("uploads")
        .getPublicUrl(lastFile.name);
      setLastImage(urlData.publicUrl);
      console.log("Imagem atualizada no estado:", urlData.publicUrl);
    }
  };

  useEffect(() => {
    fetchLastImage();
  }, []);

return (
  <div className="app-container">
    <header className="header">
      <div className="header-text">
        <h1>Bem-vindo ao Museu Virtual</h1>
        <p>
          Este museu virtual permite que você explore obras de arte e imagens
          enviadas por nossos usuários. Aqui você sempre verá a última imagem
          cadastrada, mantendo nossa coleção dinâmica e atualizada.
        </p>
      </div>
      <div className="image-preview">
        {lastImage ? (
          <img
            src={lastImage}
            alt="Última imagem cadastrada"
            className="last-image"
            key={lastImage}
          />
        ) : (
          <p>Carregando última imagem...</p>
        )}
        <button
          className="open-modal-button"
          onClick={() => setShowModal(true)}>
          Enviar Nova Imagem
        </button>
      </div>
    </header>

    {showModal && (
      <Modal closeModal={() => setShowModal(false)} onUpload={fetchLastImage} />
    )}

    <footer className="footer">
      <p>
        Este projeto é uma demonstração de integração com o Supabase para
        armazenamento de arquivos. <br />
        Experimente enviar suas imagens e veja o resultado instantâneo!
      </p>
    </footer>
  </div>
);
}

export default App;
