FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia package files
COPY package*.json ./

# Instala dependências de produção apenas
RUN npm ci --only=production

# Copia o código fonte
COPY src ./src

# Expõe porta
EXPOSE 3000

# Roda como usuário não-root
USER node

# Inicia a aplicação
CMD ["npm", "start"]
