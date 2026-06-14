var express = require('express');
var router = express.Router();
const controllerAtendimentos = require('../controllers/controllerAtendimentos');
const { ehAutenticado, autorizar } = require('../middlewares/auth');

router.post('/',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Cadastra um novo atendimento'
     #swagger.description = 'Agenda um novo atendimento para um pet. Requer autenticação e perfil de recepção.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados do atendimento',
       schema: {
         $data_hora: '2026-06-15T14:30:00.000Z',
         $motivo: 'Consulta de rotina',
         $pet_id: 1,
         $usuario_id: 1
       }
     }
     #swagger.responses[201] = {
       description: 'Atendimento criado com sucesso',
       schema: {
         id: 1,
         data_hora: '2026-06-15T14:30:00.000Z',
         motivo: 'Consulta de rotina',
         status: 'agendado',
         pet_id: 1,
         usuario_id: 1,
         criada_em: '2026-06-14T14:30:00.000Z',
         atualizada_em: '2026-06-14T14:30:00.000Z'
       }
     }
     #swagger.responses[400] = {
       description: 'Dados inválidos (campo obrigatório faltando)'
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas recepção pode cadastrar atendimentos'
     }
     #swagger.responses[404] = {
       description: 'Pet não encontrado'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['recepcao']),
  controllerAtendimentos.cadastrar
);

router.get('/:id',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Consulta atendimento por ID'
     #swagger.description = 'Retorna os detalhes de um atendimento específico, incluindo os dados completos do pet associado. Requer autenticação e perfil de recepção.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
       description: 'Atendimento encontrado com sucesso',
       schema: {
         id: 1,
         data_hora: '2026-06-15T14:30:00.000Z',
         motivo: 'Consulta de rotina',
         status: 'agendado',
         pet_id: 1,
         usuario_id: 1,
         criada_em: '2026-06-14T14:30:00.000Z',
         atualizada_em: '2026-06-14T14:30:00.000Z',
         Pet: {
           id: 1,
           nome: 'Rex',
           especie: 'cachorro'
         }
       }
     }
     #swagger.responses[400] = {
       description: 'ID inválido'
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas recepção pode consultar atendimentos'
     }
     #swagger.responses[404] = {
       description: 'Atendimento não encontrado'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['recepcao']),
  controllerAtendimentos.consultarPorId
);

router.put('/:id/iniciar',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Inicia um atendimento'
     #swagger.description = 'Altera o status do atendimento para "em_atendimento". Requer autenticação e perfil de veterinário.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
       description: 'Atendimento iniciado com sucesso',
       schema: {
         id: 1,
         data_hora: '2026-06-15T14:30:00.000Z',
         motivo: 'Consulta de rotina',
         status: 'em_atendimento',
         pet_id: 1,
         usuario_id: 1,
         criada_em: '2026-06-14T14:30:00.000Z',
         atualizada_em: '2026-06-14T14:30:00.000Z'
       }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou atendimento já em andamento ou já finalizado'
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas veterinários podem iniciar atendimentos'
     }
     #swagger.responses[404] = {
       description: 'Atendimento não encontrado'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['veterinario']),
  controllerAtendimentos.iniciarAtendimento
);

router.put('/:id/finalizar',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Finaliza um atendimento'
     #swagger.description = 'Altera o status do atendimento para "finalizado". Requer autenticação e perfil de veterinário.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
       description: 'Atendimento finalizado com sucesso',
       schema: {
         id: 1,
         data_hora: '2026-06-15T14:30:00.000Z',
         motivo: 'Consulta de rotina',
         status: 'finalizado',
         pet_id: 1,
         usuario_id: 1,
         criada_em: '2026-06-14T14:30:00.000Z',
         atualizada_em: '2026-06-14T14:30:00.000Z'
       }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou atendimento já finalizado'
     }
     #swagger.responses[401] = {
       description: 'Não autenticado - Token ausente ou inválido'
     }
     #swagger.responses[403] = {
       description: 'Acesso negado - Apenas veterinários podem finalizar atendimentos'
     }
     #swagger.responses[404] = {
       description: 'Atendimento não encontrado'
     }
     #swagger.responses[500] = {
       description: 'Erro interno do servidor'
     }
  */
  ehAutenticado,
  autorizar(['veterinario']),
  controllerAtendimentos.finalizarAtendimento
);

module.exports = router;