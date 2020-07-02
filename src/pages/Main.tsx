import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, SafeAreaView } from 'react-native';

interface Member {
  login: String;
  avatar_url: String;
}

const Main: React.FC = () => {

  const [members, setMembers] = useState([] as Array<Member>);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/members').then(response => {
      response.json().then(data => {
        setMembers(data);
      })
    })
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 24 }}
        data={members}
        keyExtractor={(member) => member.login}
        renderItem={({ item: member }) => (
          <View style={styles.member}>
            <Image style={styles.image} source={{ uri: member.avatar_url }} />
            <Text>{member.login}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginRight: 16,
  }
})

export default Main;