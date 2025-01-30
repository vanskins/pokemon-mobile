import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import { POKEMON_TYPE, POKEMON_GRADIENT } from "../constants/PokemonTypes";

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(result => {
      const { data } = result;
      setPokemon(data);
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const getPokemonGradientBackground = () => {
    if (pokemon) {
      if (pokemon.types && pokemon.types.length > 0) {
        const gradientBackground = POKEMON_GRADIENT[pokemon.types[0].type.name.toUpperCase()]
        if (gradientBackground) {
          return gradientBackground;
        }
        return POKEMON_GRADIENT["NORMAL"];
      }
    }
    return POKEMON_GRADIENT["NORMAL"];
  }
  
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={getPokemonGradientBackground()}
        style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', backgroundColor: '#dfe6e9', padding: 20 }}
      >
        <Image
          style={styles.img}
          source={{
            uri: pokemon ? pokemon.sprites.front_default : "https://assets.pokemon.com/assets/cms2/img/pokedex/full//007.png",
          }}
        />
      </LinearGradient>
      <View style={{ flex: 1, padding: 10, gap: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ fontWeight: 500, fontSize: 19 }}>{name.toUpperCase()}</Text>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <AntDesign name={isFavorite ? "heart": "hearto"} color={isFavorite ? "red": "black"} size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={{ flexDirection: 'row', gap: 4 }}>
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
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 5
                  }}>
                  <Text style={{ color: 'white', fontWeight: 600, fontSize: 11 }}>{item.type.name.toUpperCase()}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
          <MaterialCommunityIcons name="weight-pound" size={24} />
          <Text style={{ fontSize: 14 }}>{pokemon?.weight} LB</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
          <MaterialCommunityIcons name="pokeball" size={24} />
          <Text style={{ fontSize: 14 }}>{pokemon?.base_experience} Exp</Text>
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
    alignSelf: 'center',
    margin: 15,
  },
  img: {
    height: 110,
    width: 110
  }
})