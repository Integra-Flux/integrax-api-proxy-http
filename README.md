# SMS Proxy API

API proxy HTTP simples para servidor SMS. Esconde o token de autenticação do front-end.

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e configure o token:
```env
SMS_TOKEN=seu_token_real_aqui
PORT=3000
SMS_BASE_URL=https://sms.aresfun.com
```

## 🏃 Executar

### Modo Produção
```bash
npm start
```

### Modo Desenvolvimento (com hot reload)
```bash
npm run dev
```

## 📡 Endpoints

Todos os endpoints aceitam `POST` com JSON no body.

### 1. Enviar SMS
```
POST /send-sms
```
**Payload:**
```json
{
  "to": ["5511945390461"],
  "message": "Seu código de verificação é 01002",
  "from": "29093"
}
```

### 2. Enviar Código OTP
```
POST /send-otp
```
**Payload:**
```json
{
  "to": "55119999999",
  "message_default": "Sua conta, verifique com o codigo: [code]",
  "from": "29094",
  "qtd_digits": 5,
  "with_text": true,
  "expires_in": 10
}
```

### 3. Validar Código OTP
```
POST /verify-otp
```
**Payload:**
```json
{
  "code": "1MP5L",
  "phone": "551199999999"
}
```

### 4. Consultar CPF
```
POST /consult
```
**Payload:**
```json
{
  "type": "cpf",
  "documents": ["111111111111"],
  "showPhoneValid": false
}
```

### 5. Health Check
```
GET /health
```

## 🔒 Segurança

- O token nunca é exposto aos clientes
- Apenas esta API tem acesso ao token do servidor SMS
- Configure CORS adequadamente para produção
- Use HTTPS em produção

## 📝 Exemplo de uso no Front-end

```javascript
// Enviar SMS
const response = await fetch('http://localhost:3000/send-sms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: ["5511945390461"],
    message: "Seu código é 12345",
    from: "29093"
  })
});

const data = await response.json();
console.log(data);
```
