// "use client";

// import {
//   type signInFormDataType,
//   signInUser,
// } from "@/services/apiPostRequests";
// import { createContext, useEffect, useState } from "react";

// interface UserType {
//   role: string;
// }

// // Create a context for the auth provider
// export const AuthContext = createContext({
//   user: null as UserType | null,
//   signIn: (userData: signInFormDataType) => {},
//   signOut: () => {},
//   isLogin: false,
// });

// // Create the AuthProvider component
// const AuthProvider = ({
//   children,
//   roles,
// }: {
//   children: React.ReactNode;
//   roles: {
//     admin: React.ReactNode;
//     procurement_team: React.ReactNode;
//     sales_manager: React.ReactNode;
//     salesman: React.ReactNode;
//   };
// }) => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     const currentUser = localStorage.getItem("user");
//     if (currentUser) {
//       setUser(JSON.parse(currentUser));
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//   }, []);

//   const signIn = async (signInFormData: signInFormDataType) => {
//     // Perform authentication logic here
//     // Set the user object in state
//     try {
//       const userResponse = await signInUser(signInFormData);

//       if (userResponse.data) {
//         setUser(userResponse.data);
//         setIsLogin(true);
//         localStorage.setItem("user", JSON.stringify(userResponse.data));
//       }
//       // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//     } catch (err: any) {
//       console.error(err);
//       throw new Error(err?.message || "An error occurred while signing in");
//     }
//   };

//   const signOut = async () => {
//     // Perform sign out logic here
//     // Clear the user object from state
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsLogin(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut, isLogin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook to access the auth context

// export { AuthProvider };
