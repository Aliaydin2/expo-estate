import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Button } from "react-native";
import Form from "./src/components/Form/Form";
import ImageStackNavigator from "./src/components/navigations/StackNavigation";
const App = () => {
  const [project, setProject] = useState(1);
  const handleProject = () => {
    setProject((prev) => (prev == 2 ? 1 : prev + 1));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="change" onPress={handleProject} />
      {project == 1 && <ImageStackNavigator />}
      {project == 2 && <Form />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default App;