import { AuthContext } from "@/context/auth-provider";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
