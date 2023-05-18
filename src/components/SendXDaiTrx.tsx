"use client";

import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";

export function SendXDaiTrx() {
  const { address } = useAccount();

  const { config } = usePrepareSendTransaction({
    chainId: 100,
    to: address,
    value: parseEther("0.01"),
  });

  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  return (
    <div>
      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send 0.01 xDai to yourself
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
