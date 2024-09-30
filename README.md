
# Rain Tomorrow

Rain Tomorrow é um projeto em Node.js que utiliza a API OpenWeather para exibir a previsão do tempo para o dia seguinte com base na cidade pesquisada pelo usuário. Ele emprega middlewares como Express e Axios para processar requisições e renderiza as informações em uma interface EJS simples.

## Funcionalidades

- Pesquisa de previsão do tempo para o dia seguinte em qualquer cidade.
- Suporte para descrição do clima em português.
- Exibe ícones representando as condições climáticas.

## Stack Tecnológica

- **Back-end**: Node.js
- **Middlewares**: Express, body-parser, axios
- **Front-end**: HTML, CSS
- **Renderização de templates**: EJS

## Requisitos

- Node.js (versão mínima recomendada: 14.x)
- Uma conta na [API OpenWeather](https://openweathermap.org/) para obter a chave de API.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/rain-tomorrow.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd rain-tomorrow
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` no diretório raiz e adicione sua chave da API:
   ```bash
   API_KEY=your_openweather_api_key
   ```

## Configuração e Execução

1. Execute o servidor:
   ```bash
   npm start
   ```

2. Acesse a aplicação no navegador:
   ```bash
   http://localhost:3000
   ```

3. Insira o nome da cidade desejada na interface para receber a previsão do tempo para o dia seguinte.

## Uso da API OpenWeather

### 1. Buscar coordenadas da cidade

Para obter a latitude e longitude da cidade pesquisada, é feita uma requisição para a seguinte URL:

```bash
http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}
```

### 2. Obter dados do clima

Com base na latitude e longitude, outra requisição é feita para receber os dados meteorológicos do local, com a descrição do clima em português:

```bash
https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&lang=pt_br
```

### 3. Clima do dia seguinte

Os dados de previsão do clima para o dia seguinte são extraídos assim:

```javascript
const weatherDescription = weatherResponse.data.daily[1].weather[0].description;
const weatherIcon = weatherResponse.data.daily[1].weather[0].icon;
```

## Renderização no Front-end

No back-end, os dados são passados para a página EJS, que renderiza a descrição do clima e o ícone correspondente:

```javascript
res.render("index.ejs", {
    weather: weatherDescription,
    iconCode: weatherIcon
});
```

### Código do Template EJS

Exemplo do template `index.ejs` que exibe o clima e o ícone:

```html
<% if(locals.weather){ %>
    <h2><%= weather %></h2>
    <img src="http://openweathermap.org/img/wn/<%= iconCode %>@2x.png" alt="Ícone do clima">
<% } %>
```

## Próximos Passos

- Implementar tratamento de erros para consultas inválidas ou API indisponível.
- Adicionar mais informações sobre o clima, como temperatura e umidade.
- Melhorar a interface do usuário com animações ou gráficos.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir, siga estes passos:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit de suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---