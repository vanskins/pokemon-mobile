import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import PokemonCard from "@/component/PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

type metadataPokemonTypes = {
  results: resultsTypes[];
  next: string;
}

type resultsTypes = {
  name: string;
  url: string;
}

export default function Index() {
  const [metadataPokemon, setMetadataPokemon] = useState<metadataPokemonTypes>({
    results: [],
    next: "",
  });
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then(result => {
      const { data } = result;
      setMetadataPokemon(data);
    }).then(error => console.log(error, 'Error'))
  }, [])

  const handleAddingNewData = () => {
    const { next } = metadataPokemon;
    // if (next) {
    //   axios.get(next).then(result => {
    //     const { data } = result;
    //     setMetadataPokemon({...data, results: [...metadataPokemon.results, ...data.results]});
    //   }).then(error => console.log(error, 'Error'))
    // }
  }

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
          onEndReached={handleAddingNewData}
          onEndReachedThreshold={0.5}
        />
        
      </View>
    </SafeAreaView>
  );
}
