import { useState } from "react";
import { supabase } from "../supabase";
import './UploadImage.css';  // Vamos usar um arquivo CSS para a estilização

function UploadImage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // Função que lida com a seleção do arquivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleImage(file);
    };

    // Função para tratar a imagem (gerar o preview)
    const handleImage = (file) => {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // Função para realizar o upload da imagem
    const handleUpload = async () => {
        if (!image) return alert("Selecione uma imagem!");

        const { error } = await supabase.storage.from("uploads").upload(image.name, image);

        if (error) {
            console.error(error);
            alert("Erro ao enviar imagem!");
        } else {
            const url = `${supabase.storage.from("uploads").getPublicUrl(image.name).publicUrl}`;
            setUploadedUrl(url);
            alert("Imagem enviada com sucesso!");
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
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="upload-box-label">
                    {isDragging ? "Solte a imagem aqui!" : "Arraste uma imagem ou clique para selecionar"}
                </label>
                {preview && <img src={preview} alt="Preview" className="image-preview" />}
            </div>

            <button className="upload-button" onClick={handleUpload}>Upload</button>

            {uploadedUrl && <img src={uploadedUrl} alt="Uploaded" className="uploaded-image" />}
        </div>
    );
}

export default UploadImage;
