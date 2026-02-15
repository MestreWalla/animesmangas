## Visão Geral do Projeto

Este é um aplicativo da web para gerenciar uma coleção de mangás. O aplicativo permite que os usuários visualizem sua coleção, filtrem por status de aquisição e pesquisem por título. Ele também inclui um seletor de tema para alternar entre os modos claro e escuro.

## Estilo e Design

- **Tema:** O aplicativo usa um sistema de tema claro/escuro com um seletor de tema personalizado.
- **Layout:** O layout é responsivo e se adapta a diferentes tamanhos de tela. Em telas maiores, a visualização detalhada do mangá tem uma barra lateral e uma área de conteúdo. Em telas menores, a barra lateral e o conteúdo são empilhados.
- **Animações:**
    - **Animação de carregamento inicial:** Uma tela de carregamento é exibida quando o aplicativo é iniciado pela primeira vez, com uma grade de capas de mangá que aparecem gradualmente.
    - **Animação de transição de elemento compartilhado:** Ao clicar em um card de mangá, a imagem do card se transforma na imagem de capa na tela de carregamento. A proporção de tela de 2/3 é consistente em todas as imagens de capa para evitar distorções.
    - **Animação de carregamento de volumes:** Ao clicar em um mangá, um pop-up de carregamento é exibido com tamanho fixo (80% da tela), mostrando uma grade de capas de volumes que aparecem gradualmente. A grade exibe no máximo 10 capas para manter a interface limpa e não tem uma barra de rolagem.

## Funcionalidades

- **Visualização da coleção:** Exibe uma grade de cards de mangá, cada um mostrando a imagem da capa, título, editora e contagem de volumes.
- **Estatísticas da coleção:** Mostra o número total de títulos e o número de volumes adquiridos em relação ao total.
- **Pesquisa:** Permite que os usuários pesquisem mangás por título.
- **Filtro:** Permite que os usuários filtrem os mangás por status de aquisição (Adquirido, Faltando).
- **Seleção de tema:** Permite que os usuários alternem entre os modos claro e escuro.

## Plano de Alterações Atuais

- **Manter a proporção da imagem da capa:**
    - Modificar o arquivo `css/style.css` para usar a propriedade `aspect-ratio: 2 / 3` e `object-fit: cover` para todas as imagens de capa, garantindo que a proporção seja mantida e a animação seja suave.
