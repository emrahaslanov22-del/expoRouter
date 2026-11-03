import { useProductContext } from "@/context/ProductContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen() {
  const { products } = useProductContext();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const productDetailsHandle = (item: any) => {
    router.push({
      pathname: "/ProductDetailsScreen",
      params: { id: item.id }
    })
  }

  const addProductHandle = () => {
    router.push({
      pathname: "/AddProductScreen",
    })
  }

  return (
    <View style={styles.container}>

      <View style={[styles.addProductContainer, { paddingTop: StatusBar.currentHeight }]}>
        <TouchableOpacity
          style={styles.btn}
          onPress={addProductHandle}
        >
          <Text style={styles.btnText}>Add new product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => productDetailsHandle(item)}>

            <Image
              source={item.imageUrl}
              style={styles.image}
            />

            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2FA",
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 120,
    marginBottom: 14,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E3E6F2",
    backgroundColor: "#FFFFFF",
    shadowColor: "#222B58",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 14,
    backgroundColor: "#F1F0FF",
  },
  name: {
    flex: 1,
    marginLeft: 16,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#202441",
  },
  addProductContainer: {
    paddingHorizontal: 16,
    paddingTop: -12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E3E6F2",
    backgroundColor: "#F0F2FA",
  },
  btn: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#5545A5",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  }
});