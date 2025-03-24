import { useState } from "react";
import { supabase } from "../supabase";
import "./UploadImage.css"; // Vamos usar um arquivo CSS para a estilização

function UploadImage({ onUpload }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Função que lida com a seleção do arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);
  };

  const getNextImageName = async () => {
    const { data, error } = await supabase.storage.from("uploads").list();

    if (error) {
      console.error("Erro ao buscar imagens:", error);
      return "img1"; // Nome inicial em caso de erro
    } else {
      const imageCount = data.length;
      return `img${imageCount + 1}`; // Gera o próximo nome
    }
  };

  // Função para tratar a imagem (gerar o preview)
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Selecione uma imagem!");

    const imageName = await getNextImageName(); // Obtém o próximo nome sequencial

    const { error } = await supabase.storage
      .from("uploads")
      .upload(imageName, image); // Usa o nome padronizado

    if (error) {
      console.error(error);
      alert("Erro ao enviar imagem!");
    } else {
      const { data, error: urlError } = supabase.storage
        .from("uploads")
        .getPublicUrl(imageName); // Usa o nome padronizado para gerar a URL

      if (urlError) {
        console.error(urlError);
        alert("Erro ao gerar URL!");
      } else {
        setUploadedUrl(data.publicUrl); // Atualiza a URL no estado
        if (typeof onUpload === "function") {
          setTimeout(() => onUpload(), 1000); // Aguarda para buscar a última imagem
        }
        console.log("URL da imagem:", data.publicUrl);
        alert("Imagem enviada com sucesso!");
      }
    }
  };

  // Funções de drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  return (
    <div className="upload-container">
      <div
        className={`upload-box ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-box-label">
          {isDragging
            ? "Solte a imagem aqui!"
            : "Arraste uma imagem ou clique para selecionar"}
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
      </div>

      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
export default UploadImage;
