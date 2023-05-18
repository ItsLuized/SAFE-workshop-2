"use client";

import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

export function TrxHistory() {
  interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
  }
  const [last3Trx, setLast3Trx] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const { address } = useAccount();
  useEffect(() => {
    fetch(
      `https://api.gnosisscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=3&sort=desc`
    ).then((res) =>
      res.json().then((json) => {
        /*
        {"status":"1","message":"OK",
        "result":[
            {"blockNumber":"27995584","timeStamp":"1684362540","hash":"0x633f6fa3e54196b92610d6efbe34723b5dd35f23706c8000067055c7d121d9c0","nonce":"78","blockHash":"0xe928e6ab390360d1a08eab0684282e4038ce17bfe555ff30d546ae875c7484ee","from":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","contractAddress":"0x66225de86cac02b32f34992eb3410f59de416698","to":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","value":"10000000000000000","tokenName":"HOPR Token","tokenSymbol":"mHOPR","tokenDecimal":"18","transactionIndex":"1","gas":"68314","gasPrice":"9446636000","gasUsed":"40448","cumulativeGasUsed":"232281","input":"deprecated","confirmations":"597"},
            {"blockNumber":"27995581","timeStamp":"1684362525","hash":"0xae3f21c99b5b74541920d1657a61ae511d9ac2d9cacf2954ac88e7a1e40d7f56","nonce":"77","blockHash":"0xe540eeb5439a5dceb6b03be9727f4fb79d98210ae2db7068d33ccea8d66e63d3","from":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","contractAddress":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","to":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","value":"10000000000000000","tokenName":"Wrapped xHOPR Token","tokenSymbol":"wxHOPR","tokenDecimal":"18","transactionIndex":"2","gas":"67954","gasPrice":"16012224325","gasUsed":"40208","cumulativeGasUsed":"547673","input":"deprecated","confirmations":"600"},
            {"blockNumber":"27995580","timeStamp":"1684362520","hash":"0xd03e4d661e49ff1478e50e624997622f0187170951594d79e969b79d4012dd3c","nonce":"76","blockHash":"0x3b4314cd9786e63264afa20a516482d2d6a85d3887ffa88f9248659a35d2f918","from":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","contractAddress":"0xd057604a14982fe8d88c5fc25aac3267ea142a08","to":"0x608bef6e818d42a6ba5f62bb09a220bc36807d30","value":"10000000000000000","tokenName":"HOPR Token on xDai","tokenSymbol":"HOPR","tokenDecimal":"18","transactionIndex":"0","gas":"60375","gasPrice":"18424350720","gasUsed":"35035","cumulativeGasUsed":"35035","input":"deprecated","confirmations":"601"}
            ]
        }
         */
        console.log(json.result);
        setLast3Trx(json.result);

        setLoading(false);
      })
    );
  }, [address]);

  const fetchReady = (): boolean => {
    if (loading === false && Array.isArray(last3Trx)) return true;
    return false;
  };

  const shortenHash = (hash: string): string => {
    return `${hash.slice(0, 6)}...${hash.slice(-5)}`;
  };

  const shortenAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-5)}`;
  };

  return (
    <>
      {fetchReady() &&
        last3Trx.map((trx, index) => {
          console.log(JSON.stringify(trx));
          return (
            <div key={index}>
              <pre>
                <a
                  href={`https://gnosisscan.io/tx/${trx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  trx {index}
                </a>
                : hash: {shortenHash(trx.hash)} - from:{" "}
                {shortenAddress(trx.from)} - to: {shortenAddress(trx.to)} -
                amount: {formatEther(BigInt(trx.value))} {trx.tokenSymbol}
              </pre>
            </div>
          );
        })}
    </>
  );
}
