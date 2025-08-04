import { createContext, useEffect, useState } from "react"

const RoleContext = createContext();
export default function RoleProvider({children}) {
    const [roleName, setRoleName] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const safeGetRole = () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return null;
            const user = JSON.parse(userStr);
            return user?.role || null;
        } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            return null;
        }
    };
    const safeGetNameUser = () => {
        try {
            const nameStr = localStorage.getItem('user');
            if(!nameStr) return null
            const name = JSON.parse(nameStr);
            return name?.name;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
        }
    }
    useEffect(() => {
        const role = safeGetRole();
        const name = safeGetNameUser();
        setNameUser(name)
        setRoleName(role);
    }, []);
    return (
        <RoleContext.Provider value={{roleName, nameUser}}>
            {children}
        </RoleContext.Provider>
    )
}
export {RoleContext}