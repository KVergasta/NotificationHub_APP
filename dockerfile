# Usa a imagem oficial do Node 12 (versão Alpine é mais leve)
FROM node:12-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (o node 12 usa versões específicas de pacotes)
RUN npm install

# Copia o restante do código do front
COPY . .

# Expõe a porta que o seu front usa (geralmente 3000 ou 4200 para Angular)
EXPOSE 4200

# Comando para rodar o projeto
CMD ["npm", "start"]