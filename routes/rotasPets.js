var express = require('express');
var router = express.Router();
const controllerPets = require('../controllers/controllerPets');
const { ehAutenticado, autorizar } = require('../middlewares/auth');

router.post('/',
  /* #swagger.tags = ['Pets']
     #swagger.summary = 'Cadastra um novo pet'
     #swagger.description = 'Adiciona um novo pet ao sistema. Requer autenticação e perfil de administrador.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados do pet',
       schema: {
         $nome: 'Rex',
         $especie: 'cachorro'
       }
     }
     #swagger.responses[201] = {
       description: 'Pet criado com sucesso',
       schema: {
         id: 1,
         nome: 'Rex',
         especie: 'cachorro',
         criada_em: '2026-06-14T14:30:00.000Z',
         atualizada_em: '2026-06-14T14:30:00.000Z'
       }
     }
     #swagger.responses[400] = {
       description: 'Dados inválidos (nome ou espécie obrigatórios)'
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas administradores podem cadastrar pets'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['admin']),
  controllerPets.cadastrar
);

router.get('/',
  /* #swagger.tags = ['Pets']
     #swagger.summary = 'Lista todos os pets'
     #swagger.description = 'Retorna a lista completa de pets cadastrados, com opção de filtro por espécie. Requer autenticação e perfil de recepção.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['especie'] = {
       in: 'query',
       type: 'string',
       required: false,
       description: 'Filtra pets por espécie (ex: ?especie=cachorro)'
     }
     #swagger.responses[200] = {
       description: 'Lista de pets obtida com sucesso',
       schema: {
         type: 'array',
         items: {
           id: 1,
           nome: 'Rex',
           especie: 'cachorro',
           criada_em: '2026-06-14T14:30:00.000Z',
           atualizada_em: '2026-06-14T14:30:00.000Z'
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas recepção pode listar pets'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['recepcao']),
  controllerPets.listar
);

module.exports = router;