import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, TupleReader } from "ton-core";

export default class NftColl implements Contract {
  constructor(readonly address: Address) {}

  async getNftColl(provider: ContractProvider) {
    const { stack } = await provider.get("get_collection_data", []);

    return stack;
  }
}
 
/*
   this.content = stack.readCell().asSlice().loadStringTail();


;; storage scheme
;; default#_ royalty_factor:uint16 royalty_base:uint16 royalty_address:MsgAddress = RoyaltyParams;
;; storage#_ owner_address:MsgAddress next_item_index:uint64
;;           ^[collection_content:^Cell common_content:^Cell]
;;           nft_item_code:^Cell
;;           royalty_params:^RoyaltyParams
;;           = Storage;

(int, cell, slice) get_collection_data() method_id {
  var (owner_address, next_item_index, content, _, _) = load_data();
  slice cs = content.begin_parse();
  return (next_item_index, cs~load_ref(), owner_address);
}
*/