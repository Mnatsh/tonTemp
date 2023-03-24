import { useState } from "react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";
import SaleInfo from "../contracts/infoAddress";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { OpenedContract } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";

export type InfoSell = {
  fix_price_sale : number;
  is_complete : number;
  created_at : number;
  marketplace_address : string;  
  nft_address : string; 
  nft_owner_address : string; 
  full_price : number;
  marketplace_fee_address : string; 
  marketplace_fee : number;
  royalty_address : string; 
  royalty_amount : number;
}
export async function fetchInfoAddress(adrr : string) {
  let infoSell : InfoSell = {
    fix_price_sale : 0, 
    is_complete : 0, 
    created_at : 0, 
    marketplace_address : "hello", 
    nft_address : "", 
    nft_owner_address : "", 
    full_price : 0, 
    marketplace_fee_address : "fuf", 
    marketplace_fee : 0, 
    royalty_address : "", 
    royalty_amount : 0, 
  }

  // инициализация ton rpc client для основной сети
  const endpoint = await getHttpEndpoint();
  const client = new TonClient({ endpoint });
  // открыть контракт Sale по адресу - адрес контракта продажи
  const SaleAddress = Address.parse(adrr); // адрес контракта
  const sale = new SaleInfo(SaleAddress);
  const saleContract = client.open(sale);

  const stackSell = await saleContract.getSaleInfo(); //получить геттер
  //распаковать стек
  infoSell.fix_price_sale = stackSell.readNumber();
  infoSell.is_complete = stackSell.readNumber();
  infoSell.created_at = stackSell.readNumber();
  infoSell.marketplace_address = stackSell.readAddress().toString();
  infoSell.nft_address = stackSell.readAddress().toString();
  infoSell.nft_owner_address = stackSell.readAddress().toString();
  infoSell.full_price = stackSell.readNumber();
  infoSell.marketplace_fee_address = stackSell.readAddress().toString();
  infoSell.marketplace_fee = stackSell.readNumber();
  infoSell.royalty_address = stackSell.readAddress().toString();
  infoSell.royalty_amount = stackSell.readNumber();

  return infoSell;

}
