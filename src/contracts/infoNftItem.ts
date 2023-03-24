import { Contract, ContractProvider, Sender, Address, contractAddress, beginCell, TupleReader, Cell } from "ton-core";

export default class NftItem implements Contract {
  constructor(readonly address: Address) {}

  async getNftItem(provider: ContractProvider) {
    const { stack } = await provider.get("get_nft_data", []);
    return stack;

  }
}

/*
(int, int, slice, slice, cell)
return (init?, index, collection_address, owner_address, content);


*/