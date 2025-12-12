"use client";

import React from "react";
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import { User } from "lucide-react";
import Loader from "@/components/global/loder";

const ClerkAuthState = () => {
  return (
    <>
      {/* LOADING */}
      <ClerkLoading>
        <Loader state={true}/>
      </ClerkLoading>

      {/* LOADED */}
      <ClerkLoaded>
        <Loader state={false}>
          <>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-6 h-6",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <User
                  size={18}
                  className="text-[#9B9CA0] hover:text-white transition cursor-pointer"
                />
              </SignInButton>
            </SignedOut>
          </>
        </Loader>
      </ClerkLoaded>
    </>
  );
};

export default ClerkAuthState;
