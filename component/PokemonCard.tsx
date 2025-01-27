import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import axios from "axios";

type PokemonCardTypes = {
  name: string;
}

type PokemonTypes = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  },
  types: PokemonSpeciesType[]
}

type PokemonSpeciesType = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

const { width } = Dimensions.get('screen')

export default function PokemonCard({ name = "Random Pokemon" }: PokemonCardTypes) {
  const [pokemon, setPokemon] = useState<PokemonTypes>();
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(result => {
      const { data } = result;
      setPokemon(data);
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <View style={styles.card}>
      <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', backgroundColor: '#dfe6e9', padding: 20 }}>
        <Image
          style={styles.img}
          source={{
            uri: pokemon ? pokemon.sprites.front_default : "https://assets.pokemon.com/assets/cms2/img/pokedex/full//007.png",
          }}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 10, paddingTop: 30 }}>
        <Text style={{ fontWeight: 500, fontSize: 18 }}>{name}</Text>
        {
          pokemon && pokemon.types && pokemon.types.map((item, k) => <Text key={k}>{item.type.name}</Text>)
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: width - 50,
    flexDirection: 'row',
    
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5
  },
  img: {
    height: 100,
    width: 100
  }
})