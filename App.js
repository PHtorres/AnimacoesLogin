import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard
} from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacidade] = useState(new Animated.Value(0));
  const [dimensoesLogo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  const tempoAnimacaoLogo = 700;

  useEffect(() => {
    EventosTeclado();
    AnimacaoInicial();
  }, []);

  function EventosTeclado() {
    Keyboard.addListener('keyboardDidShow', TecladoExibido);
    Keyboard.addListener('keyboardDidHide', TecladoEscondido);
  }
  function AnimacaoInicial() {

    Animated.parallel([ //esse parallel é para executar duas animações ao mesmo tempo
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 15,
        useNativeDriver: false
      }),

      Animated.timing(opacidade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false
      })

    ]).start();
  }

  function TecladoExibido() {

    Animated.parallel([

      Animated.timing(dimensoesLogo.x, {
        toValue: 55,
        duration: tempoAnimacaoLogo,
        useNativeDriver: false
      }),

      Animated.timing(dimensoesLogo.y, {
        toValue: 65,
        duration: tempoAnimacaoLogo,
        useNativeDriver: false
      })
    ]).start();

  }

  function TecladoEscondido() {
    Animated.parallel([

      Animated.timing(dimensoesLogo.x, {
        toValue: 130,
        duration: tempoAnimacaoLogo,
        useNativeDriver: false
      }),

      Animated.timing(dimensoesLogo.y, {
        toValue: 155,
        duration: tempoAnimacaoLogo,
        useNativeDriver: false
      })
    ]).start();
  }

  const estilosAnimacaoAreaInputs = {
    opacity: opacidade,
    transform: [
      {
        translateY: offset.y
      }
    ]
  }

  return (
    <KeyboardAvoidingView style={estilos.tela}>

      <View style={estilos.areaLogo}>
        <Animated.Image source={require('./src/assets/logo.png')}
          style={{ width: dimensoesLogo.x, height: dimensoesLogo.y }} />
      </View>

      <Animated.View style={[estilos.areaInuts, estilosAnimacaoAreaInputs]}>
        <TextInput
          style={estilos.inputs}
          placeholder="E-mail"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          style={estilos.inputs}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity style={estilos.botaoAcessar}>
          <Text style={estilos.textoBotaoAcessar}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoCriarConta}>
          <Text style={estilos.textoBotaoCriarConta}>Criar conta</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    paddingBottom: 30
  },
  areaLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  areaInuts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  inputs: {
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '100%',
    padding: 10,
    borderRadius: 7,
    fontSize: 17,
    color: '#222'
  },
  botaoAcessar: {
    backgroundColor: '#35aaff',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  textoBotaoAcessar: {
    color: '#fff',
    fontSize: 17
  },
  botaoCriarConta: {
    marginTop: 15
  },
  textoBotaoCriarConta: {
    color: '#fff',
  }
})
