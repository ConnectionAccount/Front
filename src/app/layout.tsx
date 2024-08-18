import React from "react";
import { Toaster } from "react-hot-toast";
import { modals, ModalsProvider } from "@mantine/modals";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import ConfirmModal from "@/libs/modals/confirm";
import ReduxProvider from "@/store/redux-provider";
import "@/styles/global.css";
import "@mantine/core/styles.css";

export const metadata = {
  title: "Digital med",
  description: "I am using Mantine with Next.js!",
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <ModalsProvider modals={{ confirm: ConfirmModal }}>
              {children}
            </ModalsProvider>
          </MantineProvider>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
