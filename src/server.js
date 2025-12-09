require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const SMS_TOKEN = process.env.SMS_TOKEN;
const SMS_BASE_URL = process.env.SMS_BASE_URL || 'https://sms.aresfun.com';

// Middlewares
app.use(cors());
app.use(express.json());

// Validação do token
if (!SMS_TOKEN) {
  console.error('ERRO: SMS_TOKEN não configurado no arquivo .env');
  process.exit(1);
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SMS Proxy API está funcionando' });
});

// 1. Endpoint para enviar SMS
app.post('/send-sms', async (req, res) => {
  try {
    const { to, message, from } = req.body;

    const response = await axios.post(
      `${SMS_BASE_URL}/v1/integration/${SMS_TOKEN}/send-sms`,
      { to, message, from }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao enviar SMS:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao enviar SMS',
      details: error.response?.data || error.message
    });
  }
});

// 2. Endpoint para enviar código OTP
app.post('/send-otp', async (req, res) => {
  try {
    const { to, message_default, from, qtd_digits, with_text, expires_in } = req.body;

    const response = await axios.post(
      `${SMS_BASE_URL}/v1/integration/${SMS_TOKEN}/send-otp`,
      { to, message_default, from, qtd_digits, with_text, expires_in }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao enviar OTP:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao enviar OTP',
      details: error.response?.data || error.message
    });
  }
});

// 3. Endpoint para validar código OTP
app.post('/verify-otp', async (req, res) => {
  try {
    const { code, phone } = req.body;

    const response = await axios.post(
      `${SMS_BASE_URL}/v1/integration/${SMS_TOKEN}/verify-otp`,
      { code, phone }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao validar OTP:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao validar OTP',
      details: error.response?.data || error.message
    });
  }
});

// 4. Endpoint para consulta de CPF
app.post('/consult', async (req, res) => {
  try {
    const { type, documents, showPhoneValid } = req.body;

    const response = await axios.post(
      `${SMS_BASE_URL}/v1/integration/${SMS_TOKEN}/consult`,
      { type, documents, showPhoneValid }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro na consulta:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro na consulta',
      details: error.response?.data || error.message
    });
  }
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 SMS Proxy API rodando na porta ${PORT}`);
  console.log(`📍 Endpoints disponíveis:`);
  console.log(`   POST /send-sms - Enviar SMS`);
  console.log(`   POST /send-otp - Enviar código OTP`);
  console.log(`   POST /verify-otp - Validar código OTP`);
  console.log(`   POST /consult - Consultar CPF`);
  console.log(`   GET  /health - Health check`);
});
