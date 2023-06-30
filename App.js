import {
  GluestackUIProvider,
  HStack,
  VStack,
  Checkbox,
  Input,
  Text,
  StyledSafeAreaView,
  StyledScrollView,
  StyledKeyboardAvoidingView,
  StyledGestureHandlerRootView,
  ProgressBar,
  SwipeableContainer,
  Pressable,
  CheckIcon,
} from "./components";
import { config } from "./gluestack-ui.config";
import React, { useState, useRef } from "react";
import shortid from "shortid";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { getCompletedTasks, getDay, defaultTodos } from "./utils";
const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const [swipedItemId, setSwipedItemId] = useState(null);
  const [lastItemSelected, setLastItemSelected] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const inputRef = useRef(null);
  const addTodo = () => {
    if (item != "") {
      setTodos([
        ...todos,
        {
          id: shortid.generate(),
          task: item,
          completed: lastItemSelected,
        },
      ]);
      setItem("");
      setLastItemSelected(false);
    }
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <StyledKeyboardAvoidingView
        w="100%"
        h="100%"
        bg="$backgroundDark900"
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <StyledSafeAreaView
          sx={{
            "@base": {
              bg: "backgroundDark900",
            },
            "@md": {
              bg: "$black",
            },
          }}
          w="100%"
          h="100%"
        >
          <StyledGestureHandlerRootView
            w="100%"
            minHeight="100%"
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
                  w: "100%",
                },
                "@md": {
                  w: 700,
                  maxHeight: 500,
                  borderRadius: "$sm",
                },
              }}
              flexDirection="column"
            >
              <VStack px="$6">
                <Text color="$dark900" fontWeight="$bold" fontSize="$xl">
                  {getDay()}
                </Text>
                <HStack my="$4" alignItems="center">
                  <ProgressBar
                    completedTasks={getCompletedTasks(
                      todos,
                      item != "" && lastItemSelected
                    )}
                    totalTasks={item !== "" ? todos.length + 1 : todos.length}
                  />
                </HStack>
              </VStack>

              <VStack>
                {todos.map((todo, index) => (
                  <SwipeableContainer
                    key={index}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    swipedItemId={swipedItemId}
                    setSwipedItemId={setSwipedItemId}
                    editItemId={editItemId}
                    setEditItemId={setEditItemId}
                    imputRef={inputRef}
                  />
                ))}
              </VStack>
              <VStack px="$6">
                <HStack minHeight={38} alignItems="center" py="$2">
                  <Checkbox
                    isChecked={item != "" && lastItemSelected}
                    onChange={() => {
                      setLastItemSelected(!lastItemSelected);
                    }}
                    size="sm"
                    isInvalid={false}
                    isDisabled={item == ""}
                  >
                    <Checkbox.Indicator
                      bg="transparent"
                      sx={{
                        ":checked": {
                          bg: "$primary500",
                          borderColor: "$primary500",
                        },
                        ":active": {
                          borderColor: "$red500",
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
                  <Input
                    borderWidth={0}
                    w="$full"
                    h={22}
                    sx={{
                      ":focus": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    <Input.Input
                      pl="$2"
                      borderWidth={0}
                      value={item}
                      placeholder=""
                      color="$textDark50"
                      fontSize="$sm"
                      fontWeight="$normal"
                      textDecorationLine={
                        lastItemSelected ? "line-through" : "none"
                      }
                      onChangeText={(val) => {
                        setItem(val);
                      }}
                      onSubmitEditing={addTodo}
                      autoCompleteType="off"
                      ref={inputRef}
                    />
                  </Input>
                </HStack>

                <Pressable
                  variant="unstyled"
                  mb="$32"
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
                    <AntDesignIcon name="plus" size={14} color="#737373" />
                    <Text ml="$2" fontSize="$sm" color="$textDark50">
                      Add Task
                    </Text>
                  </HStack>
                </Pressable>
              </VStack>
            </StyledScrollView>
          </StyledGestureHandlerRootView>
        </StyledSafeAreaView>
      </StyledKeyboardAvoidingView>
    </GluestackUIProvider>
  );
};

export default App;
