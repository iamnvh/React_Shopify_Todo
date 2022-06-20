import React, { useCallback, useRef, useState } from "react";
import { AppProvider, Frame, TopBar } from "@shopify/polaris";
import logo from "../../config/theme";
import TodoPage from "../../pages/TodoPage";

export default function App() {
  const skipToContentRef = useRef(null);
  const userMenuMarkup = <TopBar.UserMenu name="Avada_React" initials="H" />;
  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <div style={{ height: "500px" }}>
      <AppProvider>
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          skipToContentTarget={skipToContentRef.current}
        >
          <TodoPage />
        </Frame>
      </AppProvider>
    </div>
  );
}
