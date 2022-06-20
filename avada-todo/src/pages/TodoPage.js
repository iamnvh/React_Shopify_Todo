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
import makeRequest from "./makeRequest";

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
      };
      const todo = await makeRequest({
        url: "/api/todos",
        method: "POST",
        body: data,
      });
      setTodo((prev) => {
        return [...prev, todo];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, name) => {
    try {
      setLoading(true)
      const data = {
        name: name,
      };
      const todo = await makeRequest({
        url: "/api/todo/" + id,
        method: "PUT",
        body: data
      })
      setTodo(todo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const removeTodo = async (id) => {
    try {
      setLoading(true);
      const todo = await makeRequest({
        url: "/api/todo/" + id,
        method: "DELETE",
      })
      setTodo(todo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const completeTodo = async (id) => {
    try {
      setLoading(true)
      const data = {
        status: true,
      };
      const todo = await makeRequest({
        url: "/api/todo/"+ id,
        method: "PUT",
        body: data
      })
      setTodo(todo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
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
