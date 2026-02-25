# 🏮 Anime & Manga Hub

<p align="center">
  <img src="https://img.shields.io/github/repo-size/MestreWalla/animesmangas?style=for-the-badge&color=blueviolet" alt="Repo Size">
  <img src="https://img.shields.io/github/languages/top/MestreWalla/animesmangas?style=for-the-badge&color=yellow" alt="Top Language">
  <img src="https://img.shields.io/github/last-commit/MestreWalla/animesmangas?style=for-the-badge" alt="Last Commit">
</p>

> **Status do Projeto:** 🚀 Em desenvolvimento (Atualização manual via `data.js`)

Uma central personalizada para organização e exibição da minha coleção de mangás e animes. O projeto foi construído para ser leve, rodando diretamente no navegador sem a necessidade de APIs externas complexas.

---

## 📌 Sobre o Projeto

Este repositório foi desenvolvido para centralizar informações sobre minha coleção de mangás de forma visual e intuitiva. O diferencial deste projeto é a autonomia: todos os dados são gerenciados localmente através de um arquivo JavaScript, o que permite total controle sobre a biblioteca sem depender de serviços de terceiros.

## ✨ Funcionalidades

- 📚 **Listagem Dinâmica:** Renderização automática dos títulos cadastrados.
- 🔍 **Categorização:** Filtros por gênero, ano ou status de leitura/assistido.
- 📱 **Responsividade:** Interface adaptada para visualização em desktops e dispositivos móveis.
- ⚡ **Independência de API:** Carregamento rápido utilizando banco de dados local (`data.js`).

## 🛠️ Tecnologias Utilizadas

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

---

## 🚀 Como Executar o Projeto

Para visualizar a coleção localmente, siga estes passos:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/MestreWalla/animesmangas.git](https://github.com/MestreWalla/animesmangas.git)

2. **Abra o projeto:**

    Navegue até a pasta do projeto e abra o arquivo index.html no seu navegador de preferência.

## ⚙️ Como Atualizar a Coleção:
    Para adicionar novos itens, você deve editar o arquivo de dados manualmente:

    Localize o arquivo data.js (geralmente na pasta /js/ ou na raiz).

    Adicione um novo objeto seguindo o padrão:

```bash
        {
            "nome": "nome do manga",
            "editora": "editora do manga",
            "sinopsis": "sinopse da historia",
            "wallpaper": "link da imagem",
            "volumes": [
                {
                    "volume": "Volume 01,02,03,...",
                    "status": "Adquirido/Falta",
                    "imagem": "link da imagem"
                }
            ]
        }
```
Salve e recarregue a página no navegador.

## 📸 Pré visualização
https://mestrewalla.github.io/animesmangas/

## 👤 Autor
Maycon Correa

GitHub: @MestreWalla

<p align="center">
Desenvolvido com foco em organização! ⛩️
</p>
