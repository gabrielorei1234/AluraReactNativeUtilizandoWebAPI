import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { CriarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

     async function Criar() {
        const resultado = await CriarRepositoriosDoUsuario(
            route.params.id,
            nome,
            data,            
            )

            if(resultado === 'sucesso'){
                Alert.alert("Repositório criado!");
                navigation.goBack();
            }else{
                Alert.alert("Erro ao criar repositório!");
            }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity style={estilos.botao} onPress={Criar}>
                <Text style={estilos.textoBotao}
                >
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
