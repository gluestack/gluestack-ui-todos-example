import React, { useState, useRef, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Hoverable } from "./Hoverable";
//import { Checkbox } from "./Checkbox";
import { Button, Input, Text, Checkbox, CheckIcon } from "../core";
const SwipeableContainer = ({
  todo,
  todos,
  setTodos,
  swipedItemId,
  setSwipedItemId,
  editItemId,
  setEditItemId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [editItem, setEditItem] = useState(todo.task);
  const swipeableRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      swipeableRef.current.close();
    }
  });

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const toggleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const handleEdit = (id) => {
    setEditItemId(null);
    if (editItem != "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, item: editItem } : todo
      );
      setTodos(updatedTodos);
    }
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    if (!lastTap) {
      setLastTap(now);
    } else {
      if (now - lastTap < 700) {
        setEditItemId(todo.id);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      }
      setLastTap(null);
    }
  };
  const handleSwipeStart = () => {
    if (todo.id !== swipedItemId) setSwipedItemId(todo.id);
    setIsOpen(true);
  };

  const handleSwipeClose = () => {
    setSwipedItemId(null);
    setIsOpen(false);
  };
  const renderRightActions = (progress, dragX) => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      return null;
    }
    return (
      <Button
        zIndex={9999}
        h="100%"
        p="$3"
        bg="$error900"
        borderRadius={0}
        onPress={() => handleDelete(todo.id)}
      >
        <EvilIconsIcon name="trash" size={18} color="white" />
      </Button>
    );
  };

  return (
    <Swipeable
      key={todo.id}
      onSwipeableWillOpen={handleSwipeStart}
      onSwipeableWillClose={handleSwipeClose}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      friction={1}
    >
      <Hoverable
        px="$6"
        py="$2"
        minHeight={38}
        flexDirection="row"
        bg={isOpen ? "$backgroundDark700" : "$backgroundDark900"}
        key={todo.id}
        alignItems="center"
        onPress={handleDoubleTap}
      >
        <Checkbox
          isChecked={todo.completed}
          onChange={() => toggleCheckbox(todo.id)}
          size="sm"
          borderColor="transparent"
        >
          <Checkbox.Indicator
            bg="transparent"
            sx={{
              ":checked": {
                bg: "$primary500",
                borderColor: "$primary500",
              },
            }}
          >
            <Checkbox.Icon
              fontWeight="bold"
              color="$backgroundDark900"
              as={CheckIcon}
            />
          </Checkbox.Indicator>
        </Checkbox>
        {editItemId != todo.id ? (
          <Text
            textDecorationLine={todo.completed ? "line-through" : "none"}
            color="$textDark50"
            ml="$2"
            w="100%"
            lineHeight="$md"
            fontSize="$sm"
            fontWeight="$normal"
          >
            {editItem}
          </Text>
        ) : (
          <Input
            sx={{
              ":focus": {
                boxShadow: "none",
              },
            }}
            borderWidth={0}
            w="$full"
            h={22}
          >
            <Input.Input
              pl="$2"
              editable={!isOpen}
              borderWidth={0}
              value={editItem}
              placeholder=""
              color="$textDark50"
              fontSize="$sm"
              fontWeight="$normal"
              textDecorationLine={todo.completed ? "line-through" : "none"}
              onChangeText={(val) => {
                setEditItem(val);
              }}
              onSubmitEditing={() => {
                handleEdit(todo.id);
              }}
              autoCompleteType="off"
              ref={inputRef}
            />
          </Input>
        )}
      </Hoverable>
    </Swipeable>
  );
};
export { SwipeableContainer };
