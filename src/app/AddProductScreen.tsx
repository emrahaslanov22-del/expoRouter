import { useProductContext } from "@/context/ProductContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

export default function AddProductScreen() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const { addProduct } = useProductContext();

    const addProductHandle = () => {
        const numericPrice = Number(price);

        if (!name.trim() || !description.trim() || !(numericPrice > 0)) {
            Alert.alert("Məlumatları doldurun Qiymət 0-dan böyük olmalıdır");
            return;
        }

        addProduct(name.trim(), numericPrice, description.trim());
        console.log(addProduct.toString());
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add product</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Product name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Product description"
                    value={description}
                    onChangeText={setDescription}
                />

                <TextInput
                    style={[styles.input, styles.priceInput]}
                    placeholder="Product price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={addProductHandle}
                >
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 18,
        fontSize: 28,
        fontWeight: "800",
        color: "#202441",
    },
    form: {
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
    input: {
        minHeight: 50,
        marginBottom: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#E3E0F1",
        borderRadius: 14,
        backgroundColor: "#F7F6FD",
        color: "#202441",
        fontSize: 16,
    },
    descriptionInput: {
        minHeight: 96,
        textAlignVertical: "top",
    },
    priceInput: {
        marginBottom: 0,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 18,
    },
    button: {
        minHeight: 48,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        borderRadius: 14,
    },
    addButton: {
        flex: 1,
        backgroundColor: "#5545A5",
    },
    backButton: {
        borderWidth: 1,
        borderColor: "#D7CFF2",
        backgroundColor: "#FFFFFF",
    },
    addBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    btnText: {
        color: "#5545A5",
        fontSize: 16,
        fontWeight: "700",
    },
});