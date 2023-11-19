import { alterar, buscarPorNome, listar, salvar, remover, alterarImagem} from "../repository/roupaRepository.js";
import multer from 'multer';
import { Router } from "express";
const endpoints = Router();

const upload = multer({ dest: './storage' });


endpoints.post('/roupa', async (req, resp) => {
    try {
        let roupa = req.body;
        if (!roupa.nome)
        throw new Error('Nome da roupa é obrigatoria');

        if (!roupa.categoria)
        throw new Error('categoria da roupa é obrigatorio');

        if (!roupa.tamanho)
        throw new Error('tamanho da roupa é obrigatorio');

        if (isNaN(roupa.valor) || roupa.valor < 0)
        throw new Error('valor inválido!!');

        if (!roupa.cor)
        throw new Error('Nome da cor é obrigatoria');

        if (!roupa.anime)
        throw new Error('Nome do anime é obrigatorio');

        let r = await salvar(roupa);
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.get('/roupa', async (req, resp) => {
    try {
        let roupa = req.body;
        let r = await listar(roupa);
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/roupa/busca', async (req, resp) => {
    try {
        let nome = req.query.nome;
        let r = await buscarPorNome(nome);
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/roupa/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linhasAfetadas = await remover(id);

        if (linhasAfetadas == 0)
        throw new Error('Roupa não encontrada!')

        resp.send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.put('/roupa/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let r = await alterar(id, nome);
        resp.status(202).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});



endpoints.put('/roupa/:id/imagem', upload.single('imagem') ,async (req, resp) => {
    let id = req.params.id
    let caminho = req.file.path;

    let r = await alterarImagem(id, caminho);
    resp.status(202).send();
});




export default endpoints