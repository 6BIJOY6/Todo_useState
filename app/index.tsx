import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

interface TodoItems {
  id: string;
  text: string;
  compeleted: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItems[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((p) => [
        ...p,
        { id: Math.random().toString(), text: newTodo, compeleted: false },
      ]);
      setNewTodo("");
    } else {
      alert("plz enter at least one letter");
    }
  };
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          compeleted: !todo.compeleted,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const saveEditTodo = (id: string, editedText: string) => {
    if (editedText.trim()) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditedText("");
    } else {
      alert("Please enter at least one letter.");
    }
  };
  const startEditTodo = (id: string) => {
    setEditingId(id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Todo App</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <CheckBox
              checked={item.compeleted}
              onPress={() => toggleTodo(item.id)}
            />
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedText}
                  onChangeText={(Text) => setEditedText(Text)}
                  autoFocus
                />
                <TouchableOpacity
                  onPress={() => saveEditTodo(item.id, editedText)}
                >
                  <Ionicons name="save" size={24} color="blue" />
                </TouchableOpacity>
              </>
            ) : (
              <Text
                style={{
                  textDecorationLine: item.compeleted ? "line-through" : "none",
                }}
              >
                {item.text}
              </Text>
            )}
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startEditTodo(item.id)}>
              <Ionicons name="create" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  editInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 18,
    alignItems: 'center',
    margin:10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
