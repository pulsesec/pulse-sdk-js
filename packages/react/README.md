# Pulse Security - React SDK

## Installation

```sh
$ npm i @pulsesec/react
```

## Example

```tsx
import { PulseScript } from "@pulsesec/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PulseScript sitekey={process.env.PULSE_SITE_KEY} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Token Callback

```ts
window.onpulse((token: string) => {
  console.log("User token", token);
});
```
