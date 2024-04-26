import React from "react";

type Props = {
  siteKey: string;
};

export function PulseScript({ siteKey }: Props) {
  return (
    <script
      src={`https://cdn.pulsesecurity.org/script/pulse.js`}
      data-sitekey={siteKey}
      async
    />
  );
}
