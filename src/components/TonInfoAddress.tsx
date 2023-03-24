import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import {fetchInfoAddress } from "../hooks/useInfoAdress";
import {fetchInfoNft } from "../hooks/useGetNftItem";
import {fetchInfoNftColl } from "../hooks/useGetNftColl";
import { Card, FlexBoxCol, Ellipsis, FlexBoxRow, Button, Input } from "./styled/styled";



export function TonInfoAddress() {
  const { sender, connected } = useTonConnect();

  const [infoSell, setInfoSell] = useState({
    fix_price_sale : 0, 
    is_complete : 0, 
    created_at : 0, 
    marketplace_address : "", 
    nft_address : "", 
    nft_owner_address : "", 
    full_price : 0, 
    marketplace_fee_address : "", 
    marketplace_fee : 0, 
    royalty_address : "", 
    royalty_amount : 0, 
  });
  const [infoNftItem, setInfoNftItem] = useState({
    initNft : 0,
    index : 0,
    collection_address : "",
    owner_address : "",
    content : "",
  });
  const [infoNftColl, setInfoNftColl] = useState({
    next_item_index : 0,
    owner_address : "",
    common_content : "",
    sym1 : "",
  });

  const [addressQuery, setTonRecipient] = useState("EQDifJX959Np9-gp1lfSoygTdIK7fhqf2e08iQQUhi5aKMZJ");

  return (
    <Card>
      <FlexBoxCol>
        <h3>Информация об адресе TON</h3>
        <FlexBoxRow>
          <label>Введите адрес </label>
          <Input
            style={{ marginRight: 8 }}
            value={addressQuery}
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>        
          <Button  //прописать обработку нажатия на кнопку
            disabled={!connected}
            style={{ marginTop: 1 }}
            onClick={async () => {
              let tmpInfoAddress = await fetchInfoAddress(addressQuery);
              let tmpInfoNft = await fetchInfoNft(tmpInfoAddress.nft_address);
              let tmpInfoNftColl = await fetchInfoNftColl(tmpInfoNft.collection_address);
              setInfoSell(tmpInfoAddress);
              setInfoNftItem(tmpInfoNft);
              setInfoNftColl(tmpInfoNftColl);
            }}
            >
            Просмотр информации об адресе
          </Button>
        </FlexBoxRow>
        <FlexBoxRow>
          Тип: {infoSell.fix_price_sale}
          ; Дата создания: <b>{(new Date(infoSell.created_at * 1000)).toLocaleString()}</b>
          ; Цена: <b>{infoSell.full_price / 1000000000}</b>
        </FlexBoxRow>
        <FlexBoxRow>Адрес маркета: <b>{infoSell.marketplace_address}</b></FlexBoxRow>
        <FlexBoxRow>Адрес NFT: <b>{infoSell.nft_address}</b></FlexBoxRow>
        <FlexBoxRow>Адрес владельца: <b>{infoSell.nft_owner_address}</b></FlexBoxRow>
        <FlexBoxRow>
          Адрес royalty: <b>{infoSell.royalty_address}</b>
          ; Комиссия royalty: <b>{infoSell.royalty_amount / 1000000000}</b>
        </FlexBoxRow>
        <FlexBoxRow>
          Адрес маркета: <b>{infoSell.marketplace_fee_address}</b>
          ; Комиссия маркета: <b>{infoSell.marketplace_fee / 1000000000}</b>
        </FlexBoxRow>

        <FlexBoxRow>   *************</FlexBoxRow>
        <FlexBoxRow>initNft: <b>{infoNftItem.initNft}</b>; index: <b>{infoNftItem.index}</b></FlexBoxRow>
        <FlexBoxRow>collection_address: <b>{infoNftItem.collection_address}</b></FlexBoxRow>
        <FlexBoxRow>owner_address: <b>{infoNftItem.owner_address}</b></FlexBoxRow>
        <FlexBoxRow>content: <b>{infoNftItem.content}</b></FlexBoxRow>

        <FlexBoxRow>   *************</FlexBoxRow>
        <FlexBoxRow>Номер последней Nft: <b>{infoNftColl.next_item_index}</b></FlexBoxRow>
        <FlexBoxRow>Собственник коллекции: <b>{infoNftColl.owner_address}</b></FlexBoxRow>
        <FlexBoxRow>content: <b>{infoNftColl.common_content}</b></FlexBoxRow>
        <FlexBoxRow>1 символ: <b>{infoNftColl.sym1}</b></FlexBoxRow>

      </FlexBoxCol>
    </Card>
  );
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
        //    await sleep(1500);
           //<Ellipsis>{tonAmount}</Ellipsis></label>