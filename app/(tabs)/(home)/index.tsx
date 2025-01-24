import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import PokemonCard from "@/component/PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

type metadataPokemonTypes = {
  results: resultsTypes[];
}

type resultsTypes = {
  name: string;
  url: string;
}

export default function Index() {
  const [metadataPokemon, setMetadataPokemon] = useState<metadataPokemonTypes>({
    results: []
  });
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then(result => {
      const { data } = result;
      setMetadataPokemon(data);
    }).then(error => console.log(error, 'Error'))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        
        <FlatList
          data={metadataPokemon.results}
          renderItem={({item}) => <PokemonCard name={item.name} />}
          keyExtractor={item => item.name}
        />
        
      </View>
    </SafeAreaView>
  );
}
