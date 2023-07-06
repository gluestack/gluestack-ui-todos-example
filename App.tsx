import {
  GluestackUIProvider,
  HStack,
  Text,
  StyledSafeAreaView,
  StyledScrollView,
  StyledKeyboardAvoidingView,
  StyledGestureHandlerRootView,
  ProgressBar,
  SwipeableContainer,
  Pressable,
  Icon,
  AddIcon,
  Box,
} from "./components";
import { config } from "./gluestack-ui.config";
import React, { useState, useRef } from "react";
import shortid from "shortid";
import { getCompletedTasks, getDay, defaultTodos } from "./utils";

const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const [swipedItemId, setSwipedItemId] = useState(null);
  const [lastItemSelected, setLastItemSelected] = useState(false);
  const inputRef = useRef(null);

  const addTodo = () => {
    const lastTodo = todos[todos.length - 1];

    console.log(todos, "____");

    if (lastTodo.task !== "") {
      setTodos([
        ...todos,
        {
          id: shortid.generate(),
          task: "",
          completed: false,
        },
      ]);
      setItem("");
      setLastItemSelected(false);
    }
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <StyledKeyboardAvoidingView
        w="$full"
        h="$full"
        bg="$backgroundDark900"
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <StyledSafeAreaView
          sx={{
            "@base": {
              bg: "$backgroundDark900",
            },
            "@md": {
              bg: "$black",
            },
          }}
          w="$full"
          h="$full"
        >
          <StyledGestureHandlerRootView
            w="$full"
            minHeight="$full"
            sx={{
              "@md": {
                justifyContent: "center",
                alignItems: "center",
                bg: "$black",
              },
            }}
          >
            <StyledScrollView
              pt="$6"
              pb="$10"
              bg="$backgroundDark900"
              sx={{
                "@base": {
                  w: "$full",
                },
                "@md": {
                  w: 700,
                  maxHeight: 500,
                  borderRadius: "$sm",
                },
              }}
              flexDirection="column"
            >
              <Box px="$6">
                <Text color="$dark900" fontWeight="$bold" fontSize="$xl">
                  {getDay()}
                </Text>
                <ProgressBar
                  completedTasks={getCompletedTasks(
                    todos,
                    item != "" && lastItemSelected
                  )}
                  totalTasks={item !== "" ? todos.length + 1 : todos.length}
                />
              </Box>

              {todos.map((todo, index) => (
                <SwipeableContainer
                  key={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  swipedItemId={swipedItemId}
                  setSwipedItemId={setSwipedItemId}
                />
              ))}

              <Pressable
                mb="$32"
                px="$6"
                sx={{
                  "@md": {
                    mb: 0,
                  },
                }}
                onPress={() => {
                  addTodo();
                  setTimeout(() => {
                    inputRef.current.focus();
                  }, 100);
                }}
              >
                <HStack alignItems="center" mt="$4">
                  <Icon as={AddIcon} color="$secondary600" />
                  <Text ml="$2" fontSize="$sm" color="$textDark50">
                    Add Task
                  </Text>
                </HStack>
              </Pressable>
            </StyledScrollView>
          </StyledGestureHandlerRootView>
        </StyledSafeAreaView>
      </StyledKeyboardAvoidingView>
    </GluestackUIProvider>
  );
};

export default App;
