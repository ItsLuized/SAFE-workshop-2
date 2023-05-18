"use client";

import { useAccount, useBalance } from "wagmi";

export function Account() {
  const { address } = useAccount();

  const xDaiBalance = useBalance({
    address: address,
  });

  const HoprBalance = useBalance({
    address: address,
    token: "0xD057604A14982FE8D88c5fC25Aac3267eA142a08",
  });

  const wxHoprBalance = useBalance({
    address: address,
    token: "0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1",
  });

  const mHoprBalance = useBalance({
    address: address,
    token: "0x66225dE86Cac02b32f34992eb3410F59DE416698",
  });

  return (
    <>
      <div>Address: {address}</div>
      <div>
        <p>
          xDai Balance: {xDaiBalance.data?.formatted} {xDaiBalance.data?.symbol}
        </p>
        <p>
          xHopr Balance: {HoprBalance.data?.formatted}{" "}
          {HoprBalance.data?.symbol}
        </p>
        <p>
          wxHopr Balance: {wxHoprBalance.data?.formatted}{" "}
          {wxHoprBalance.data?.symbol}
        </p>
        <p>
          mHopr Balance: {mHoprBalance.data?.formatted}{" "}
          {mHoprBalance.data?.symbol}
        </p>
      </div>
    </>
  );
}
