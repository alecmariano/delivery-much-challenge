# Delivery Much Challenge

Esta é a minha aplicação back end para atender aos requisitos propostos no desafio. Como era para ser, foi realmente desafiador e aprendi muito no processo.

## O desafio

Você deve construir uma API que recebe ingredientes como parâmetro de entrada em uma chamada GET e retorna uma lista de receitas. Utilize as APIs públicas da RecipePuppy (http://www.recipepuppy.com/about/api/) e da Giphy (https://developers.giphy.com/docs/) para obter os dados necessários.

A API deve receber como parâmetro um conjunto de ingredientes (máximo 3) e deve retornar os itens utilizados para realizar a busca; e uma lista de receitas.

Cada item lista de receitas deve possuir 4 atributos:

- Título da receitam;
- Lista de ingredientes;
- Link para acessar a receita;
- Link de um gif para a receita.

## Requisitos

Os requisitos do desafio foram:

- Utilizar NodeJS ou Go para criar a aplicação;
- Toda configuração e chaves de acesso (se necessário) devem ser acessadas em um arquivo de ambiente. Sua configuração deve estar documentada no README;
- Para obter o gif no Giphy, utilize o título da receita recebido pelo RecipePuppy;
- Os ingredientes recebidos pelo RecipePuppy são recebidos em String. Organize os ingredientes em um array e ordene esse array por ordem alfabética;
- Se algum dos serviços externos estiver indisponível o projeto deverá informar o usuário dessa indisponibilidade;
- Utilizar Docker para executar o projeto;

## Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Express](https://www.npmjs.com/package/express)
- [Axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Docker](https://www.docker.com/)

## Instruções para execução da aplicação

### 1. Clonar o projeto
Navegue até o diretório onde deseja baixar o projeto e execute o comando Git abaixo:
```
git clone https://github.com/alecmariano/delivery-much-challenge.git
```
### 2. Chave de acesso do GIPHY
Para que a aplicação consiga consumir a API que fornece os gifs para cada receita, você deve acessar a plataforma [GIPHY](https://developers.giphy.com/docs/sdk/) e criar uma conta pelo botão **Create an App**. Selecione a opção API e dê um nome interno para o App dessa chave. Então, a chave de acesso vai ser criada e disponibilizada no campo **API Key**.

### 3. Registrar sua chave de acesso
Para usar a chave de acesso à API que você obteve, é preciso alterar o arquivo Dockerfile, para que o Docker registre a chave como variável de ambiente. No arquivo Dockerfile, localize a linha `ENV GIPHY_API_KEY=SUA_CHAVE` e substitua o valor`SUA_CHAVE` pela chave de acesso obtida da GIPHY. Salve o arquivo e o Docker estará pronto para executar a aplicação com a sua própria chave de acesso.

### 4. Criar imagem e executar container no Docker
Na pasta raiz do projeto, onde também se encontra o arquivo Dockerfile, e execute a seguinte instruição:
```
docker build -t delivery-much-challenge .
```
Após isso, a imagem estará criada e pronta para gerar o container de execução da aplicação. Rode o comando abaixo:
```
docker run -p 8000:3001 --restart=on-failure delivery-much-challenge
```
Se tudo ocorreu como esperado, você estará pronto para consumir o endpoint da nossa aplicação.
## Consumir o endpoint

A aplicação foi desenvolvida para que haja apenas um endpoint, que utiliza a seguinte chamada:
```
http://localhost:8000/recipes/?i={ingrediente1},{ingrediente2},{ingrediente3}
```
O método HTTP GET pode receber até 3 ingredientes separados por vírgula no parâmetro **i** da query. Sendo consumido de forma correta, o endpoint responde a requisição no formato de um objeto JSON que possui dois vetores. O primeiro vetor é chamado *keywords* e possui como valores, os ingredientes informados na requisição ao endpoint. O segundo vetor é o *recipes* que retorna uma lista de objetos receita, obtidas da API do Recipe Puppy. Segue exemplo de um retorno do nosso endpoint:
```
{
  "keywords": [
    "cinnamon",
    "peppers",
    "sugar"
  ],
  "recipes": [
    {
      "title": "Chili Sauce Recipe",
      "ingredients": [
        "tomato",
        " sweet pepper",
        " peppers",
        " onions",
        " cinnamon",
        " cloves",
        " mustard",
        " ginger",
        " sugar",
        " cayenne",
        " vinegar",
        " salt"
      ],
      "link": "http://cookeatshare.com/recipes/chili-sauce-15575",
      "gif": "https://giphy.com/embed/XcA5sS6ehjfep8z5wf"
    },
    {
      "title": "Chili Sauce Or Salsa Recipe",
      "ingredients": [
        "tomato",
        " peppers",
        " sugar",
        " allspice",
        " cinnamon",
        " onions",
        " salt",
        " vinegar",
        " black pepper"
      ],
      "link": "http://cookeatshare.com/recipes/chili-sauce-or-salsa-13768",
      "gif": "https://giphy.com/embed/Bgr27Gg1jaEHS"
    }
  ]
}
```

## Dúvidas?
Entre em contato pelo e-mail alec_mariano@hotmail.com.
Obrigado.
