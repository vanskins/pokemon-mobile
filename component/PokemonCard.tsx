import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get('screen')
export default function PokemonCard({ name }: { name: string}) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full//007.png',
        }}
      />
      <View>
        <Text>{name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: width - 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5
  },
  img: {
    height: 100,
    width: 100
  }
})