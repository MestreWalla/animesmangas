import data from './data.js';

const content = document.querySelector('content');

// Função para criar cards
function criarCards(filter = 'all', searchTerm = '') {
    content.innerHTML = '';

    let filteredData = data.categorias;

    if (filter !== 'all') {
        filteredData = filteredData.map(categoria => {
            const volumes = categoria.volumes.filter(v => v.status === filter);
            if (volumes.length > 0) {
                return { ...categoria, volumes };
            }
            return null;
        }).filter(Boolean);
    }

    if (searchTerm) {
        filteredData = filteredData.filter(categoria => 
            categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredData.forEach(categoria => {
        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('click', () => {
            window.location.href = `volumes.html?manga=${encodeURIComponent(categoria.nome)}`;
        });

        // Adicionar imagem do primeiro volume
        const img = document.createElement('img');
        img.src = categoria.volumes[0].imagem;
        img.alt = `Capa do mangá ${categoria.nome}`;
        card.appendChild(img);

        // Adicionar container para o texto
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';
        
        // Adicionar título
        const title = document.createElement('h2');
        title.textContent = categoria.nome;
        cardInfo.appendChild(title);

        // Adicionar editora como subtitulo
        const editora = document.createElement('p');
        editora.textContent = categoria.editora;
        cardInfo.appendChild(editora);
        
        card.appendChild(cardInfo);

        // Adicionar card ao conteúdo
        content.appendChild(card);
    });
}

// Criar cards quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    criarCards();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        const filterButtons = document.querySelectorAll('.filter-button');
        const activeFilter = Array.from(filterButtons).find(btn => btn.classList.contains('active'));
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        criarCards(filter, e.target.value);
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const searchTerm = document.getElementById('search-bar').value;
            criarCards(e.target.dataset.filter, searchTerm);
        });
    });
});
