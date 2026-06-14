var express = require('express');
var router = express.Router();
const controllerUsuarios = require('../controllers/controllerUsuarios');

router.post('/cadastro',
  /* #swagger.tags = ['Usuários']
     #swagger.summary = 'Cadastra um novo usuário'
     #swagger.description = 'Cria uma nova conta de usuário no sistema. O perfil é opcional (padrão: recepcao)'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados para cadastro do usuário',
       schema: {
         $nome: 'João Silva',
         $usuario: 'joao.silva',
         $senha: 'senha123',
         perfil: 'recepcao'
       }
     }
     #swagger.responses[201] = {
       description: 'Usuário criado com sucesso',
       schema: {
         id: 1,
         nome: 'João Silva',
         usuario: 'joao.silva',
         perfil: 'recepcao'
       }
     }
     #swagger.responses[400] = {
       description: 'Dados inválidos (campo obrigatório faltando, senha menor que 6 caracteres, usuário já existe)'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  controllerUsuarios.cadastro
);

router.post('/login',
  /* #swagger.tags = ['Usuários']
     #swagger.summary = 'Realiza login do usuário'
     #swagger.description = 'Autentica o usuário e retorna um token JWT válido por 24 horas'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Credenciais do usuário',
       schema: {
         $usuario: 'joao.silva',
         $senha: 'senha123'
       }
     }
     #swagger.responses[200] = {
       description: 'Login realizado com sucesso',
       schema: {
         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
         usuario: {
           id: 1,
           nome: 'João Silva',
           usuario: 'joao.silva',
           perfil: 'recepcao'
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Usuário e senha são obrigatórios'
     }
     #swagger.responses[401] = {
       description: 'Usuário ou senha inválidos'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  controllerUsuarios.login
);

module.exports = router;