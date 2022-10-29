import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,ActivityIndicator,Image, Keyboard,Alert} from 'react-native';
import Index from './src/components/Picker';
import api from './api';

export default function App() {
       
  const [moedas,setMoedas] = useState([])
  const [moedaselecionada,setMoedaSelecionada] = useState(null)
  const [loading,setLoading] = useState(true)
  const [moedabvalor,setMoedaBValor] = useState(0)

  const [valorMoeda,setValorMoeda] = useState(0)
  const [ValorConvertido,setValorConvertido] = useState(null)

  useEffect(()=> {
     
    async function carregarAp(){
      const response = await api.get('all')
      
      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key, 
          label: key,
          value: key,
        })
    
      setMoedas(arrayMoedas)
      setLoading(false)
      })
      
    }

    carregarAp()

  },[])
 
  async function Converter(){
    if(moedaselecionada === null || moedabvalor === 0){
      Alert.alert('Por favor selecione uma moeda')
      return;
    }
    const response = await api.get(`all/${moedaselecionada}-BRL`)
    console.log(response.data[moedaselecionada].ask)
    let resultado = (response.data[moedaselecionada].ask * parseFloat(moedabvalor))

    setValorConvertido(`R$ ${resultado.toFixed(2)}`)
    setValorMoeda(moedabvalor)

    Keyboard.dismiss()
  }

if(loading){
  return(
    <View style={{justifyContent: 'center',alignItems: 'center',flex: 1,backgroundColor: '#121212'}}>
      <ActivityIndicator color={'yellow'} size={40} />
    </View>
  )
} 
 else{

 return (
   <View style={Estilos.conteiner}>
    
    <View style={Estilos.areaMoeada}>
    <Image source={{uri: 'https://w7.pngwing.com/pngs/781/728/png-transparent-finance-currency-converter-bank-money-bank-orange-payment-logo.png'}} style={{width: 50,height: 40, marginLeft: '43%'}}/>
     <Text style={Estilos.titulos}>Selecione sua Moeda</Text>
      
      <Index data={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)}/>
     
    </View>

      <View style={Estilos.areaValor}>
       <Text style={Estilos.titulos}>Digite um valor para converter em (R$)</Text>
       <TextInput 
       keyboardType='numeric'
       placeholder={'Digite o Valor'}
       style={Estilos.input}
       onChangeText={(valor) => {setMoedaBValor(valor)}}
       />
      </View>

     <View style={Estilos.botaoArea}> 
      <TouchableOpacity style={Estilos.botaoArea} onPress={() => {Converter()}}>
        <Text style={Estilos.textoBtn}>Converter</Text>
      </TouchableOpacity>
      </View>
        {ValorConvertido !== null && ( <View style={Estilos.AreaResultado}>
        <Text style={Estilos.ValorConvertido}>{valorMoeda} {moedaselecionada}</Text>
        <Text style={[Estilos.ValorConvertido,{fontSize: 18, fontWeight: 'bold'}]}>corresponde a </Text>
        <Text style={Estilos.ValorConvertido}>{ValorConvertido}</Text>
      
      </View>) 


    }
     

   </View>
  );
}
}

const Estilos = StyleSheet.create({
    conteiner:{
      flex: 1,
      alignItems:'center',
      backgroundColor: '#121212',
      paddingTop: 40
    },
    areaMoeada:{
      width: '90%',
      backgroundColor: 'white',
      paddingTop: 9,
      borderTopLeftRadius: 9,
      borderTopRightRadius: 9,
      marginBottom: 1
    },
    areaValor:{
     width:'90%',
     backgroundColor: 'white',
     paddingBottom: 8,
     paddingTop: 9
    },
    titulos: {
      color: 'black',
      padding: 10,
      fontSize: 15,
    },
    input: {
      width: '100%',
      padding: 10,
      height: 45,
      fontSize: 20,
      marginTop: 5,
      fontSize: 15,
    },
    botaoArea:{
      width: '90%',
      backgroundColor: 'red',
      height: 45,
      borderBottomLeftRadius: 9,
      borderBottomRightRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',

    },
    textoBtn:{
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    },
    AreaResultado: {
      width: '90%',
      backgroundColor: 'white',
      marginTop: 35,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30
    },
    ValorConvertido:{
      fontSize: 30,
      color: 'black'
    }

})