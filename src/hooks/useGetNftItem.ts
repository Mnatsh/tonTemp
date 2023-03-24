import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";
import { useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { OpenedContract } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import NftItem from "../contracts/infoNftItem"; // интерфейс класса NftItem

export type InfoNftItem = {
    initNft : number;
    index : number;
    collection_address : string;  
    owner_address : string; 
    content : string; 
}
export async function fetchInfoNft(adrr : string) {
  let infoNftItem : InfoNftItem = {
    initNft : 0, 
    index : 0, 
    collection_address : "hello", 
    owner_address : "", 
    content : "", 
  }

  // инициализация ton rpc client для основной сети
  const endpoint = await getHttpEndpoint();
  const client = new TonClient({ endpoint });
  // открыть контракт NftItem по адресу - адрес Nft
  const NftAddress = Address.parse(adrr); // адрес контракта
  const nftItem = new NftItem(NftAddress);
  const nftItemContract = client.open(nftItem);

  const stackNft = await nftItemContract.getNftItem(); //получить геттер
  //распаковать стек
  infoNftItem.initNft = stackNft.readNumber();
  infoNftItem.index = stackNft.readNumber();
  infoNftItem.collection_address = stackNft.readAddress().toString();
  infoNftItem.owner_address = stackNft.readAddress().toString();
  infoNftItem.content = stackNft.readCell().asSlice().loadStringTail();

  return infoNftItem;

}