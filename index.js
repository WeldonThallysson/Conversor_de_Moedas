import React from 'react';
import RNPickerSelect from 'react-native-picker-select/src';

export default function Index(props){

    const placeholder = {
     label: 'Selecione uma Moeda',
     value: null,
     color: 'black'
    }
    return(

    


        <RNPickerSelect 
        placeholder={placeholder}
        items={props.data}
        onValueChange={(valor) => props.onChange(valor)}
        />
 
       
    )
}