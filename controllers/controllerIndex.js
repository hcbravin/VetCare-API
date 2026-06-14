exports.index = async function (req, res) {
    const resposta = {
        nome: "VetCare API",
        descricao: "API RESTful para gerenciamento de atendimentos veterinários",
        versao: "1.0.0",
        tecnologias: ["Node.js", "Express", "Sequelize", "MySQL", "JWT"],
        status: "online",
        timestamp: new Date().toLocaleString(),
        documentacao: "/api-docs",
        desenvolvedor: "Henrique Casagrande Bravin"
    };
    // Configuração: não usar cache (no-store)
    res.set('Cache-Control', 'no-store');
    return res.json(resposta);
};