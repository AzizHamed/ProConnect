import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";

interface ProRefreshControlProps {
  children: React.ReactNode;
  onRefreshAction: () => Promise<any>;
}

const ProRefreshControl: React.FC<ProRefreshControlProps> = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh();
  }, []);

  async function refresh() {
    await props.onRefreshAction();
    setRefreshing(false);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProRefreshControl;
