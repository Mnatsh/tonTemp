import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useInfoAdress } from "../hooks/useInfoAdress";
import { Card, FlexBoxCol, Ellipsis, FlexBoxRow, Button, Input } from "./styled/styled";


export function TonInfoAddress() {
  const { sender, connected } = useTonConnect();
  const { valueCounter, address, fetchInfoAddress } = useInfoAdress();

  const [tonAmount, setTonAmount] = useState("1");
  const [addressQuery, setTonRecipient] = useState("EQA01D1VQtR8-jWxRzbKkGAZtRhmvCJq6ojdShlENfqBl1LE");
  const [valueCont, setValueCont] = useState("never");


  async function info(){
    let valueCoun = await fetchInfoAddress();
      return valueCoun;

  }

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
            //valueCounter = await fetchInfoAddress();
            setValueCont(await fetchInfoAddress());
          } 
          }
          >
          Просмотр информации об адресе
          </Button>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Баланс: {tonAmount}</label>
          <b>Значение счетчика: </b>
          {"шаг " + tonAmount + ": " + valueCont}
          
        </FlexBoxRow>
      </FlexBoxCol>
    </Card>
  );
}
            //<Ellipsis>{tonAmount}</Ellipsis></label>