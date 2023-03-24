import { Contract, ContractProvider, Sender, Cell, contractAddress, beginCell, TupleReader } from "ton-core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";
import NftColl from "../contracts/infoNftColl"; // интерфейс класса NftColl

export type InfoNftColl = {
    next_item_index : number;
    owner_address : string;  
    common_content : string; 
    sym1 : string; 
}

export async function fetchInfoNftColl(adrr : string) {
    let infoNftColl : InfoNftColl = {
        next_item_index : 0,
        owner_address : "",
        common_content : "",
        sym1 : "",
    }
  
    // инициализация ton rpc client для основной сети
    const endpoint = await getHttpEndpoint();
    const client = new TonClient({ endpoint });
    // открыть контракт NftColl по адресу - адрес Nft
    const contNftColl = Address.parse(adrr); // адрес контракта
    const nftColl = new NftColl(contNftColl);
    const nftItemContract = client.open(nftColl);
  
    const stackNftColl = await nftItemContract.getNftColl(); //получить геттер
    //распаковать стек
    //let content = new Cell();
    infoNftColl.next_item_index = stackNftColl.readNumber();
    let content = stackNftColl.readCell().beginParse().loadStringTail();
    //let content = stackNftColl.readAddress().toString();
    infoNftColl.owner_address = stackNftColl.readAddress().toString();

    infoNftColl.sym1 = content.slice(0,1);
    infoNftColl.common_content = content.slice(1);

    return infoNftColl;
  }

/*  
  next_item_index = 0;
  content = new Cell();
  owner_address = Address.parse("EQBnl39OpR9QKvbHQweqDcUY50ciPZyn5Cd7Mx3ehUuSRium");
  collection_content = "";
  common_content = "";

  constructor(readonly address: Address) {}

  async getNftColl(provider: ContractProvider) {
    const { stack } = await provider.get("get_collection_data", []);
    
    this.next_item_index = stack.readNumber();
    const content = stack.readCell();
    this.owner_address = stack.readAddress();

    const con = content.asSlice();
    this.collection_content = con.loadStringTail();
    const df = con.loadRef();


    this.next_item_index = stack.readNumber();
    const content = stack.readCell();
    this.owner_address = stack.readAddress();

    const con = content.asSlice();
    this.collection_content = con.loadStringTail();
    const df = con.loadRef();


    //this.common_content = df.toString();

*/

