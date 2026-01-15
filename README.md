# Typing Speed Test
Aplicativo de teste de digitação construído com React, inspirado no desafio “Typing Speed Test” da Frontend Mentor. O usuário pode praticar digitação, acompanhar WPM e precisão em tempo real e salvar seu recorde no navegador.

## Demo​
Acesse o projeto online: [https://typing-speed-test-seven-phi.vercel.app/]

##  Funcionalidades
* Seleção de dificuldade: Easy, Medium e Hard.
​

* Dois modos de teste:

Timed (60s): teste de 60 segundos.

Passage: digita o texto completo, com tempo contando para cima.
​

* Estatísticas em tempo real:

WPM (palavras por minuto).

Accuracy (acurácia em %).

Tempo decorrido.
​

* Feedback visual:

Caracteres corretos em verde.

Erros em vermelho/sublinhado.

Cursor visível acompanhando a digitação.
​

* Resultados ao final do teste:

WPM, accuracy e total de caracteres corretos/incorretos.
​

* Progresso do usuário:

“Baseline Established!” no primeiro teste.

“High Score Smashed!” com confete ao bater o recorde.

Recorde de WPM salvo em localStorage.
​

* Layout responsivo com estados de hover e foco nos botões.
​

### Tecnologias 🚀
React + TypeScript

Vite para build e dev server

CSS para estilização

## Como rodar o projeto
Clonar o repositório:

bash
```
git clone https://github.com/isabela2903/typing-speed-test.git
cd typing-speed-test
```
Instalar dependências:

bash
```
npm install
# ou
yarn
```
Rodar em ambiente de desenvolvimento:

bash
```
npm run dev
# ou
yarn dev
```
Build de produção:

bash
```
npm run build
# ou
yarn build
```
