import React, { useCallback, useState } from "react";
import {
  Page,
  Layout,
  Modal,
  TextStyle,
  TextField,
  Badge,
  Stack,
  Button,
  ResourceItem,
  Card,
  TextContainer,
  ResourceList,
} from "@shopify/polaris";
import useFetchApi from "../hooks/useFetchApi";
import requestOptions from "./requestOptions";

const TodoPage = () => {
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const [valueUpdate, setValueUpdate] = useState();
  const handleChangeUp = useCallback((newValue) => setValue(newValue), []);

  const [selectedItems, setSelectedItems] = useState([]);

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
    setLoading,
  } = useFetchApi({
    url: "http://localhost:5000/api/todos",
  });

  const addTodo = async (name) => {
    try {
      setLoading(true);
      const data = {
        name: name,
        price: 80,
        description: "Description product 8",
        product: "Product type 8",
        color: "Color product 8",
        createdAt: "2020-06-8",
        image: "url/img/product8",
        status: false,
      };
      const response = await fetch(
        "http://localhost:5000/api/todos",
        requestOptions("POST", data)
      );
      const product = await response.json();
      setTodo((prev) => {
        return [...prev, product];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, name) => {
    try {
      const data = {
        name: name,
      };
      const response = await fetch(
        "http://localhost:5000/api/todo/" + id,
        requestOptions("PUT", data)
      );
      const product = await response.json();
      setTodo((prev) => {
        return prev;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id) => {
    try {
        setLoading(true)
      const response = await fetch(
        "http://localhost:5000/api/todo/" + id,
        requestOptions("DELETE")
      );
      const product = await response.json();
      setTodo((prev) => {
        return prev;
      });
    } catch (error) {
      console.error(error);
    } finally {
        setLoading(false)
    }
  };

  const completeTodo = async (id) => {
    try {
      const data = {
        status: true,
      };
      const response = await fetch(
        "http://localhost:5000/api/todo/" + id,
        requestOptions("PUT", data)
      );
      const product = await response.json();
      setTodo((prev) => {
        return prev;
      });
    } catch (error) {
      console.error(error);
    }
  };
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

  return (
    <Page
      title="Todos"
      primaryAction={{
        content: "Create Todo",
        onAction: () => {
          handleChangeCreate();
        },
      }}
    >
      {modalCreat}
      {modalUpdate}
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
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default TodoPage;
