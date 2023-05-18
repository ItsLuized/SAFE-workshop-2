"use client";

import { parseEther } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { HoprABI } from "../HoprABI";

export function SendwxHoprTrx() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1",
    abi: HoprABI,
    functionName: "transfer",
    args: [address!, parseEther("0.01")],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Send 0.01 wxHOPR to yourself
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
