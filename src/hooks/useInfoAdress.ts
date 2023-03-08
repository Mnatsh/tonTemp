import { useState } from "react";
import CounterInfo from "../contracts/infoAddress";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";

export function useInfoAdress() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new CounterInfo(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQBnl39OpR9QKvbHQweqDcUY50ciPZyn5Cd7Mx3ehUuSRium"
          : "EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb"
      ) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<CounterInfo>;
  }, [client]);

  const { data, isFetching } = useQuery(
    ["counter"],
    async () => {
      if (!counterContract) return null;
      return (await counterContract!.getCounter()).toString();
    },
  );

  return {
    valueCounter: isFetching ? null : data,
    address: counterContract?.address.toString(),
    fetchInfoAddress: async () => {
      return (await counterContract!.getCounter()).toString();
    },
  };
}
