import ProductProvider from "@/context/ProductContext";
import { Stack } from "expo-router";

export default function TabLayout() {

  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home" }} />

        <Stack.Screen
          name="ProductDetailsScreen"
          options={{ title: "Product Details" }} />

        <Stack.Screen
          name="AddProductScreen"
          options={{ title: "Add Product" }} />

      </Stack>
    </ProductProvider>
  );
}
