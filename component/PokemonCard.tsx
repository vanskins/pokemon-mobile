import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { POKEMON_TYPE } from "@/constants/pokemonTypes";

type PokemonCardTypes = {
  name: string;
}

type PokemonTypes = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  },
  types: PokemonSpeciesType[],
  weight: number;
  base_experience: number;
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
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: 600, fontSize: 20 }}>{name.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {
            pokemon && pokemon.types && pokemon.types.map((item, k) => {
              const type: string = item.type.name.toUpperCase()
              return(
                <View 
                  key={k}
                  style={{ 
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: POKEMON_TYPE[type],
                    padding: 5,
                    borderRadius: 5
                  }}>
                  <Text style={{ color: 'white', fontWeight: 600 }}>{item.type.name.toUpperCase()}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5, gap: 5 }}>
          <MaterialCommunityIcons name="weight-pound" size={24} />
          <Text style={{ fontWeight: 600, fontSize: 16}}>{pokemon?.weight} LB</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5, gap: 5 }}>
          <MaterialCommunityIcons name="pokeball" size={24} />
          <Text style={{ fontWeight: 600, fontSize: 16}}>{pokemon?.base_experience} Exp</Text>
        </View>
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