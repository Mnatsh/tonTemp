import {
  Contract,
  ContractProvider,
  Sender,
  Address,
  Cell,
  contractAddress,
  beginCell,
} from "ton-core";

export default class SaleInfo implements Contract {

  async getSaleInfo(provider: ContractProvider) {
    const { stack } = await provider.get("get_sale_data", []);
    return stack;
  }

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}
}
