import { Account } from "../components/Account";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { SendXDaiTrx } from "../components/SendXDaiTrx";
import { TrxHistory } from "../components/TrxHistory";
import { SendHoprTrx } from "../components/sendHoprTrx";
import { SendmHoprTrx } from "../components/sendmHoprTrx";
import { SendwxHoprTrx } from "../components/sendwxHoprTrx";

export function Page() {
  return (
    <>
      <h1>SAFE Workshop #2</h1>

      <Connect />

      <Connected>
        <hr />
        <Account />
        <hr />
        <SendXDaiTrx />
        <hr />
        <SendHoprTrx />
        <hr />
        <SendwxHoprTrx />
        <hr />
        <SendmHoprTrx />
        <hr />
        <TrxHistory />
        <hr />
        <NetworkSwitcher />
      </Connected>
    </>
  );
}

export default Page;
