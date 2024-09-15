import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const CLERK_PUBLISHABLE_KEY = "pk_test_YnJpZ2h0LW1hY2FxdWUtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA";

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key); 
    } catch (err) {
      console.error("Error retrieving token:", err);
      return;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value); 
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },
};
 
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; 

    const inTabsGroup = segments[0] === "(auth)"; 

    console.log("User changed: ", isSignedIn);

    
    if (isSignedIn && !inTabsGroup) {
      router.replace("/(auth)/home"); 
    } else if (!isSignedIn) {
      router.replace("/login"); 
    }
  }, [isSignedIn]); 

  return <Slot />;
};



const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache} >
      <ClerkLoaded>
      <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;