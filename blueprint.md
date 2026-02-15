## Visão Geral do Projeto

Este é um aplicativo da web para gerenciar uma coleção de mangás. O aplicativo permite que os usuários visualizem sua coleção, filtrem por status de aquisição e pesquisem por título. Ele também inclui um seletor de tema para alternar entre os modos claro e escuro.

## Estilo e Design

- **Tema:** O aplicativo usa um sistema de tema claro/escuro com um seletor de tema personalizado.
- **Layout:** O layout é responsivo e se adapta a diferentes tamanhos de tela. Em telas maiores, a visualização detalhada do mangá tem uma barra lateral e uma área de conteúdo. Em telas menores, a barra lateral e o conteúdo são empilhados.
- **Animações:**
    - **Animação de carregamento inicial:** Uma tela de carregamento é exibida quando o aplicativo é iniciado pela primeira vez, com uma grade de capas de mangá que aparecem gradualmente.
    - **Animação de transição de elemento compartilhado:** Ao clicar em um card de mangá, a imagem do card se transforma na imagem de capa na tela de carregamento.

## Funcionalidades

- **Visualização da coleção:** Exibe uma grade de cards de mangá, cada um mostrando a imagem da capa, título, editora e contagem de volumes.
- **Estatísticas da coleção:** Mostra o número total de títulos e o número de volumes adquiridos em relação ao total.
- **Pesquisa:** Permite que os usuários pesquisem mangás por título.
- **Filtro:** Permite que os usuários filtrem os mangás por status de aquisição (Adquirido, Faltando).
- **Seleção de tema:** Permite que os usuários alternem entre os modos claro e escuro.

## Plano de Alterações Atuais

- **Restaurar animação de carregamento inicial:**
    - Recriar o arquivo `js/initial-loading.js` com a lógica para a animação de carregamento inicial.
    - Adicionar a estrutura HTML necessária para a sobreposição de carregamento em `index.html`.
    - Adicionar os estilos CSS para a sobreposição de carregamento e os efeitos de animação em `css/style.css`.
    - Modificar o arquivo `js/main.js` para chamar a função de animação de carregamento antes de inicializar o aplicativo principal.
