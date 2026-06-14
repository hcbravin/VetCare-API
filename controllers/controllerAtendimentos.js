const { Atendimento, Pet } = require('../models/models');

// Cadastro de Atendimento (apenas recepcao)
exports.cadastrar = async function (req, res) {
    const { data_hora, motivo, pet_id, usuario_id } = req.body;

    const errors = [];
    if (!data_hora) errors.push({ msg: 'Data e hora são obrigatórias' });
    if (!motivo || motivo.trim() === '') errors.push({ msg: 'Motivo é obrigatório' });
    if (!pet_id) errors.push({ msg: 'ID do pet é obrigatório' });
    if (!usuario_id) errors.push({ msg: 'ID do usuário é obrigatório' });
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
        const pet = await Pet.findByPk(pet_id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        const novoAtendimento = await Atendimento.create({
            data_hora,
            motivo,
            pet_id,
            usuario_id,
            status: 'agendado'
        });

        return res.status(201).json(novoAtendimento);
    } catch (error) {
        console.error('Erro ao cadastrar atendimento:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar atendimento' });
    }
};

// Consulta de Atendimento por ID (apenas recepcao)
exports.consultarPorId = async function (req, res) {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const atendimento = await Atendimento.findByPk(id, {
            include: [{ model: Pet }]
        });

        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }

        // Cache: private + max-age 1 dia + no-cache
        res.set('Cache-Control', 'private, max-age=86400, no-cache');
        return res.json(atendimento);
    } catch (error) {
        console.error('Erro ao consultar atendimento:', error);
        return res.status(500).json({ error: 'Erro ao consultar atendimento' });
    }
};

// Iniciar Atendimento (apenas veterinario)
exports.iniciarAtendimento = async function (req, res) {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const atendimento = await Atendimento.findByPk(id);
        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }

        if (atendimento.status === 'em_atendimento') {
            return res.status(400).json({ error: 'Atendimento já está em andamento' });
        }

        if (atendimento.status === 'finalizado') {
            return res.status(400).json({ error: 'Atendimento já foi finalizado' });
        }

        await atendimento.update({ status: 'em_atendimento' });
        return res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao iniciar atendimento:', error);
        return res.status(500).json({ error: 'Erro ao iniciar atendimento' });
    }
};

// Finalizar Atendimento (apenas veterinario)
exports.finalizarAtendimento = async function (req, res) {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const atendimento = await Atendimento.findByPk(id);
        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }

        if (atendimento.status === 'finalizado') {
            return res.status(400).json({ error: 'Atendimento já foi finalizado' });
        }

        await atendimento.update({ status: 'finalizado' });
        return res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao finalizar atendimento:', error);
        return res.status(500).json({ error: 'Erro ao finalizar atendimento' });
    }
};