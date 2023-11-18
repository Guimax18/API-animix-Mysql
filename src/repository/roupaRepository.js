import { con } from "./connection.js";

export async function salvar(roupa) {
    const comando = `
    INSERT INTO tb_roupas (nm_roupa, categoria, tamanho, valor, cor, anime)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const [info] = await con.query(comando, [roupa.nome, roupa.categoria, roupa.tamanho, roupa.valor, roupa.cor, roupa.anime]);
    roupa.id = info.insertId;
    return roupa;
}

export async function listar() {
 const comando = `
    SELECT id_roupa,
	        nm_roupa,
            categoria,
            tamanho,
            valor,
            cor,
            anime,
            img_roupa
    FROM tb_roupas;
 `
    const [linhas] = await con.query(comando);
    return linhas
}


export async function buscarPorNome(nome) {
    const comando = `
       SELECT id_roupa     as id,
               nm_roupa    as nome,  
               categoria   as categoria,
               tamanho     as tamanho,
               valor       as valor,
               cor         as cor,
               anime       as anime,
               img_roupa   as imagem
       FROM tb_roupas
       WHERE nm_roupa like ?
    `
       const [linhas] = await con.query(comando, ['%'+nome+'%']);
       return linhas
   }
   

export async function alterar(id, nome) {

}

export async function remover(id) {
    const comando = `DELETE FROM tb_roupas WHERE id_roupa = ?`

    const [info] = await con.query(comando, [id]);
    return info.affectedRows;
}