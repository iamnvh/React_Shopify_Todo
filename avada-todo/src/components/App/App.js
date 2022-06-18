import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  ResourceList,
  ResourceItem,
  TextStyle,
  AppProvider,
  Card,
  Frame,
  Layout,
  Modal,
  Page,
  TextContainer,
  TextField,
  TopBar,
  Stack,
  Badge,
  Checkbox,
} from "@shopify/polaris";

import useFetchApi from "../../hooks/useFetchApi";

export default function App() {
  const skipToContentRef = useRef(null);

  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const [valueUpdate, setValueUpdate] = useState();
  const handleChangeUp = useCallback((newValue) => setValue(newValue), []);

  const [selectedItems, setSelectedItems] = useState([]);
  const [checked, setChecked] = useState(false);

  const [activeCreat, setActiveCreate] = useState(false);
  const handleChangeCreate = useCallback(
    () => setActiveCreate(!activeCreat),
    [activeCreat]
  );

  const [activeUpdate, setActiveUpdate] = useState(false);
  const handleChangeUpdate = useCallback(
    () => setActiveUpdate(!activeUpdate),
    [activeUpdate]
  );

  const {
    data: todos,
    setData: setTodo,
    loading,
  } = useFetchApi({
    url: "http://localhost:5000/api/products",
  });

  const addTodo = async (name) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: 80,
        description: "Description product 8",
        product: "Product type 8",
        color: "Color product 8",
        createdAt: "2020-06-8",
        image: "url/img/product8",
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/products",
      requestOptions
    );
    const product = await response.json();
    setTodo((prev) => {
      return [...prev, product];
    });
  };

  const updateTodo = async (id, name) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/product/" + id,
      requestOptions
    );
    const product = await response.json();
    setTodo((prev) => {
      return prev;
    });
  };

  const removeTodo = async (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(
      "http://localhost:5000/api/product/" + id,
      requestOptions
    );
    const product = await response.json();
    setTodo((prev) => {
      return prev;
    });
  };

  const completeTodo = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: true,
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/product/" + id,
      requestOptions
    );
    const product = await response.json();
    setTodo((prev) => {
      return prev;
    });
  };

  const userMenuMarkup = <TopBar.UserMenu name="Avada_React" initials="H" />;

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  const actualPageMarkup = (
    <Page
      title="Todos"
      primaryAction={{
        content: "Create Todo",
        onAction: () => {
          handleChangeCreate();
        },
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              resourceName={{
                singular: "customer",
                plural: "customers",
              }}
              items={todos}
              renderItem={(item) => {
                const { id, name, status } = item;

                return (
                  <ResourceItem
                    id={id}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                      </Stack.Item>
                      <Stack.Item>
                        <Badge status="success">
                          {status ? "Done" : "Pendding"}
                        </Badge>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          outline
                          onClick={() => {
                            completeTodo(id);
                          }}
                        >
                          Complete
                        </Button>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          outline
                          onClick={() => {
                            handleChangeUpdate();
                            setValueUpdate(id);
                          }}
                        >
                          Edit
                        </Button>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          destructive
                          onClick={() => {
                            removeTodo(id);
                          }}
                        >
                          Delete
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceItem>
                );
              }}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={[
                {
                  content: "Complete",
                  onAction: () => console.log("Todo: implement bulk edit"),
                },
                {
                  content: "Delete",
                  onAction: () => console.log("Todo: implement bulk edit"),
                },
              ]}
              alternateTool={
                <Checkbox
                  label="Select"
                  checked={checked}
                  onChange={handleChange}
                />
              }
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  const pageMarkup = actualPageMarkup;

  const modalCreat = (
    <Modal
      
      open={activeCreat}
      onClose={handleChangeCreate}
      title="Creat a new Todo"
      primaryAction={{
        content: "Create",
        onAction: () => {
          addTodo(value);
          handleChangeCreate();
        },
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChangeCreate,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <TextField
            placeholder="This is my todo name"
            value={value}
            onChange={handleChange}
            autoComplete="off"
          />
        </TextContainer>
      </Modal.Section>
    </Modal>
  );

  const modalUpdate = (
    <Modal
      open={activeUpdate}
      onClose={handleChangeUpdate}
      title="Update Todo"
      primaryAction={{
        content: "Update",
        onAction: () => {
          updateTodo(valueUpdate, value);
          handleChangeUpdate();
        },
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChangeUpdate,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <TextField
            placeholder="This is my todo name"
            value={value}
            onChange={handleChangeUp}
            autoComplete="off"
          />
        </TextContainer>
      </Modal.Section>
    </Modal>
  );

  const logo = {
    width: 124,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
    url: "http://jadedpixel.com",
    accessibilityLabel: "Jaded Pixel",
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider>
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          skipToContentTarget={skipToContentRef.current}
        >
          {pageMarkup}
          {modalCreat}
          {modalUpdate}
        </Frame>
      </AppProvider>
    </div>
  );
}
