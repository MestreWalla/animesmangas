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

*   **Cabeçalho:** Um cabeçalho fixo com o título da aplicação, um seletor de tema animado e um campo de pesquisa.
*   **Grid de Cards:** Uma grade responsiva que exibe os cards de mangá.
*   **Cards de Mangá:** Cada card exibe a imagem da capa, o título, a editora e uma contagem do número de volumes adquiridos em relação ao total.

### Funcionalidades

*   **Filtros:** Os usuários podem filtrar a coleção para ver todos os mangás, apenas os completos ou apenas os incompletos.
*   **Pesquisa:** Os usuários podem pesquisar mangás pelo título.
*   **Efeito de Hover:** Ao passar o mouse sobre um card de mangá, a imagem de papel de parede do mangá é exibida como plano de fundo da página.
*   **Transição de Página:** Ao clicar em um card de mangá, uma animação de transição é acionada, e o usuário é redirecionado para a página de detalhes do mangá.

## Página de Detalhes (`volumes.html`)

### Layout e Componentes

*   **Cabeçalho:** Um cabeçalho com um botão de voltar, filtros de volume e um seletor de tema animado.
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

*   **Seletor de Tema Animado:** A aplicação apresenta um seletor de tema animado e altamente interativo. Ele exibe uma animação de um sol se transformando em uma lua dentro de um céu que muda de cor, com nuvens que se tornam estrelas. 
*   **Implementação:** A funcionalidade é construída com HTML (usando múltiplos `divs` para os elementos visuais), CSS avançado (utilizando Grid, posicionamento absoluto e transições complexas) e JavaScript.
*   **Persistência:** O script `theme.js` gerencia a lógica, alternando o atributo `data-theme` no `<body>` e salvando a preferência do usuário no `localStorage` para manter a consistência entre as sessões.

## Dados (`data.js`)

### Estrutura dos Dados

*   Os dados da coleção são armazenados em um array de objetos, onde cada objeto representa uma categoria de mangá. Cada categoria tem um nome, editora, sinopse, imagem de papel de parede e uma lista de volumes. Cada volume tem um número e um status.

# Plano Atual

**Visão Geral da Última Atualização:**

1.  **Seletor de Tema Aprimorado:** O seletor de tema antigo foi substituído por um componente animado e interativo, melhorando significativamente a experiência do usuário.
2.  **Correção de Estilos:** Foram restaurados os estilos da animação de carregamento (popup de transição) e corrigido o fundo do cabeçalho, que haviam sido acidentalmente removidos.
3.  **Atualização do Blueprint:** Este documento (`blueprint.md`) foi atualizado para refletir as novas funcionalidades e o estado atual do projeto.
