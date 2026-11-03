import { useProductContext } from "@/context/ProductContext";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { products, updateProduct } = useProductContext();

    const productId = Number(id);
    const product = products.find((p) => p.id === productId);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const udpdateProductHandle = () => {
        const numericPrice = Number(price);

        if (!name.trim() || !description.trim() || !(numericPrice > 0)) {
            Alert.alert("Məlumatları doldurun. Qiymət 0-dan böyük olmalıdır.");
            return;
        }

        updateProduct(productId, name.trim(), numericPrice, description.trim());
        Alert.alert("Product yenilendi");
    };

    if (!product) {
        return (
            <Text style={styles.notFound}>Product not found</Text>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Product details</Text>

            <View style={styles.card}>
                <View>
                    <Image
                        source={product.imageUrl}
                        style={styles.image}

                    />
                    <Text style={styles.displayValue}>Product name: {product.name}</Text>
                    <Text style={styles.displayValue}>Product price: {product.price} $</Text>
                    <Text style={styles.displayValue}>Product description: {product.description}</Text>
                </View>

                <TextInput
                    placeholder="new name"
                    style={styles.name}
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    placeholder="new price"
                    style={styles.name}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />

                <TextInput
                    placeholder="new description"
                    style={styles.name}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={udpdateProductHandle}>

                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => router.back()}
            >
                <Text style={styles.btnText}>Back Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F2FA",
    },
    header: {
        marginBottom: 16,
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#6255A5",
    },
    card: {
        padding: 16,
        borderRadius: 24,
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
        width: "100%",
        height: 220,
        borderRadius: 16,
        backgroundColor: "#F1F0FF",
    },
    name: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: "800",
        color: "#111b65",
        borderBottomWidth: 1,
        borderBottomColor: "#E3E6F2",
        paddingVertical: 4,
    },
    btn: {
        marginTop: 20,
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 14,
        backgroundColor: "#5545A5",
    },
    btnText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    notFound: {
        margin: 20,
        fontSize: 16,
        color: "#5C6178",
    },
    displayValue: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
        fontWeight: "bold"
    },
});