import { Pressable } from "../core";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <Pressable
      alignItems="center"
      justifyContent="center"
      w="$4"
      h="$4"
      bg={checked ? "$primary500" : "transparent"}
      borderWidth={checked ? 0 : 2}
      borderRadius="$sm"
      borderColor="$borderDark500"
      onPress={onChange}
    >
      {checked && (
        <FontAwesome5Icon
          name={checked ? "check" : "check"}
          size={10}
          color="#171717"
        />
      )}
    </Pressable>
  );
};
export { Checkbox };
