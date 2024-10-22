import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import { useSelector } from "@xstate/react";

import { AuthenticatedScreenProps } from "../types/navigation";
import { HomeMachineActor } from "../machines/home";
import { useApp } from "../contexts/useApp";

interface Props extends AuthenticatedScreenProps<"Home"> {
  actorRef?: HomeMachineActor;
}

export default React.memo(function Home({ navigation, actorRef }: Props) {
  const { state: appState } = useApp();
  const { email, accessToken, image, gender } = appState?.context?.user;
  const state = useSelector(actorRef, (snapshot) => snapshot);
  console.log(appState?.context);

  return (
    <View style={{ padding: 16 }}>
      <Button onPress={() => navigation.goBack()}>Back</Button>
      <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
        Welcome, {appState.context.username}
      </Text>
      <Image src={image} style={styles.profileImage} />
      <Card>
        <Card.Title title="Email"></Card.Title>
        <Card.Actions>
          <Text>{email}</Text>
        </Card.Actions>
        <Card.Actions>
          <Text>{gender}</Text>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Title title="Full Name"></Card.Title>
        <Card.Actions>
          <Text>{appState?.context?.username}</Text>
        </Card.Actions>
      </Card>
      <Text>{accessToken}</Text>
    </View>
  );
});
const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
