import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { pegarRepositoriosDoUsuario, pegarRepositoriosDoUsuarioPeloNome } from '../../servicos/requisicoes/repositorios';
import estilos from './estilos';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');
    const estaNaTela = useIsFocused();

    useEffect(async () => {
        const resultado = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultado);
    }, [estaNaTela]);

    async function buscarRepositorioPorNome() {
        const resultado = await PegarRepositoriosDoUsuarioPeloNome(route.params.id, nomeRepo);
        setRepo(resultado);
        setNomeRepo('');
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio',{ id: route.params.id})}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Busque por um repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nomeRepo}
                onChangeText={setNomeRepo}
            />

            <TouchableOpacity
                onPress={buscarRepositorioPorNome}
            >
                <Text>Buscar</Text>
            </TouchableOpacity>

            <FlatList data={repo}
                style={{ width: '100%' }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('InfoRepositorio', { item })}
                        style={estilos.repositorio} >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>


    );
}
