"use client";

import { parseEther } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { HoprABI } from "../HoprABI";

export function SendmHoprTrx() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x66225dE86Cac02b32f34992eb3410F59DE416698",
    abi: HoprABI,
    functionName: "transfer",
    args: [address!, parseEther("0.01")],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Send 0.01 mHOPR to yourself
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
