import { useContext } from "react";
import { RoleContext } from "../context/roleName";

const useLocalStogate = () => useContext(RoleContext);

export default useLocalStogate;