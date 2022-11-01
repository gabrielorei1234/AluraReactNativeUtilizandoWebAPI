import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
    try {
        const resultado = await api.get(`repos?postId=${id}`);
        return resultado.data;
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function pegarRepositoriosDoUsuarioPeloNome(postId, nome) {   
    try{
        const resultado = await api.get(`/repos?postId=${postId}&name=${nome}`).then(response => {
            return response.data
        }).catch(error =>{
            console.log(error);
            return [];
        })
        return resultado;
    }catch(error){
        console.log(error)
    }
        
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
    try {
        await api.put(`repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        });
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function CriarRepositoriosDoUsuario(postId, nome, data) {
    try {
        await api.post(`repos/`, {
            name: nome,
            data: data,
            postId: postId,            
        });
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function DeletarRepositorioDoUsuario(id) {
    try {
        await api.delete(`/repos/${id}`);
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}