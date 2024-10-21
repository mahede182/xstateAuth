import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

import { AuthenticatingScreenProps } from "../types/navigation";

interface Props extends AuthenticatingScreenProps<"SignIn"> {
  isLoading: boolean;
  onSignInPress: (user: string, password: string) => void;
}

export default React.memo(function SignIn({ onSignInPress, isLoading }: Props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        }}
        placeholder="User Name"
        onChangeText={(newText) => setUser(newText.toLowerCase())}
        defaultValue={user}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Password"
        onChangeText={(newText) => setPassword(newText.toLowerCase())}
        defaultValue={password}
      />
      <Button
        mode="contained"
        loading={isLoading}
        onPress={() => {
          Alert.alert(`email: ${user} pass: ${password}`);
          onSignInPress(user, password);
        }}
      >
        Sign In
      </Button>
    </View>
  );
});
