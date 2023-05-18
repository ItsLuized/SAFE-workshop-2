"use client";

import { parseEther } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { HoprABI } from "../HoprABI";

export function SendHoprTrx() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xD057604A14982FE8D88c5fC25Aac3267eA142a08",
    abi: HoprABI,
    functionName: "transfer",
    args: [address!, parseEther("0.01")],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Send 0.01 HOPR to yourself
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
