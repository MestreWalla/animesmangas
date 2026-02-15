# Visão Geral do Projeto

O "Mangá Collection" é uma aplicação web para gerenciar e exibir uma coleção de mangás. A aplicação permite que os usuários visualizem sua coleção, filtrem por status (completo ou incompleto) e pesquisem por título. A interface é projetada para ser visualmente atraente e responsiva, com temas claro e escuro.

# Design e Funcionalidades

## Estrutura do Projeto

*   `index.html`: A página principal que exibe a coleção de mangás.
*   `volumes.html`: A página de detalhes que exibe os volumes de um mangá específico.
*   `style.css`: A folha de estilos que define a aparência de ambas as páginas.
*   `main.js`: O script para a página principal, responsável por criar os cards de mangá e gerenciar a filtragem e a pesquisa.
*   `volumes.js`: O script para a página de detalhes, responsável por criar os cards de volume.
*   `data.js`: Um arquivo que contém os dados da coleção de mangás.
*   `theme.js`: Um script que gerencia a funcionalidade de troca de tema (claro/escuro).

## Página Principal (`index.html`)

### Layout e Componentes

*   **Cabeçalho:** Um cabeçalho fixo com o título da aplicação, um campo de pesquisa e botões de filtro.
*   **Grid de Cards:** Uma grade responsiva que exibe os cards de mangá.
*   **Cards de Mangá:** Cada card exibe a imagem da capa, o título, a editora e uma contagem do número de volumes adquiridos em relação ao total.

### Funcionalidades

*   **Filtros:** Os usuários podem filtrar a coleção para ver todos os mangás, apenas os completos ou apenas os incompletos.
*   **Pesquisa:** Os usuários podem pesquisar mangás pelo título.
*   **Efeito de Hover:** Ao passar o mouse sobre um card de mangá, a imagem de papel de parede do mangá é exibida como plano de fundo da página.
*   **Transição de Página:** Ao clicar em um card de mangá, uma animação de transição é acionada, e o usuário é redirecionado para a página de detalhes do mangá.

## Página de Detalhes (`volumes.html`)

### Layout e Componentes

*   **Cabeçalho:** Um cabeçalho com um botão de voltar, filtros de volume e um botão de troca de tema.
*   **Informações do Mangá:** Uma seção que exibe o título e a sinopse do mangá.
*   **Grid de Volumes:** Uma grade que exibe os cards de volume para o mangá selecionado.
*   **Cards de Volume:** Cada card de volume exibe a imagem da capa, o número do volume e o status (adquirido ou faltando).

### Funcionalidades

*   **Filtros de Volume:** Os usuários podem filtrar os volumes para ver todos, apenas os adquiridos ou apenas os que faltam.

## Estilo e Tema (`style.css`, `theme.js`)

### Design System

*   **Cores:** A aplicação usa um sistema de cores com variáveis para um tema claro e escuro.
*   **Tipografia:** A fonte "Inter" é usada em toda a aplicação.
*   **Cards:** Os cards têm um design limpo e moderno com cantos arredondados e sombras sutis.

### Tema Claro/Escuro

*   A aplicação inclui um botão para alternar entre os temas claro e escuro. A preferência do usuário é salva no `localStorage`.

## Dados (`data.js`)

### Estrutura dos Dados

*   Os dados da coleção são armazenados em um array de objetos, onde cada objeto representa uma categoria de mangá. Cada categoria tem um nome, editora, sinopse, imagem de papel de parede e uma lista de volumes. Cada volume tem um número e um status.

# Plano Atual

*   Atualizar o arquivo `blueprint.md` para refletir o estado atual da aplicação.
