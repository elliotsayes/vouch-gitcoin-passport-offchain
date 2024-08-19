<script>
  import Confetti from "svelte-confetti";
  import { assign } from "@permaweb/aoconnect";

  let isVouchProcessing = false;
  let isVouchDone = false;

  export let address = "";
  export let message = "";

  async function checkGateway(e) {
    e.preventDefault();
    const targetUrl = globalThis.location.origin.includes("vouch-ao-balance")
      ? globalThis.location.origin.replace("vouch-ao-balance", "now")
      : "https://now.g8way.io";

    fetch(targetUrl, { method: "HEAD" }).then((res) => {
      if (res.ok) {
        globalThis.location.href = targetUrl;
      } else {
        globalThis.location.href = "https://now.g8way.io";
      }
    });
    //globalThis.location.href = "https://now.g8way.io";
  }
  async function getProcesses(address) {
    return fetch("https://arweave-search.goldsky.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variables: { addresses: [address] },
        query: `query ($addresses:[String!]!) {
  transactions (
    first: 100,
    owners: $addresses, 
    tags: [
      { name: "Data-Protocol", values: ["ao"] },
      { name: "Variant", values: ["ao.TN.1"] },
      { name: "Type", values: ["Process"]}
    ]
  ) {
    edges {
      node {
        id 
      }
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data?.transactions?.edges.map(({ node }) => node.id));
  }

  async function vouchAO() {
    isVouchProcessing = true;
    const vouch = "ZTTO02BL2P-lseTLUgiIPD9d0CF1sc4LbMA2AQ7e9jo";
    const processes = await getProcesses(address).catch((err) => {
      console.error(err);
      globalThis.alert("Error Fetching Processes!");
      isVouchProcessing = false;
    });
    await Promise.all(
      processes.map((pid) =>
        fetch(
          `https://su-router.ao-testnet.xyz?process-id=${vouch}&assign=${pid}`,
          {
            method: "POST",
          }
        ).then((res) => res.json())
      )
    )
      .then((res) => {
        console.log(res);
        globalThis.alert("Processes Vouched!");
        isVouchProcessing = false;
        isVouchDone = true;
      })
      .catch((err) => {
        console.error(err);
        globalThis.alert("Error Vouching Processes!");
        isVouchProcessing = false;
      });

    /*
    const process = "L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo";
    const message = "8IxceJSmgQBJE4EkuFzky1kUofUd1h1m9hKPTW8FDIk";
    const result = await fetch(
      `https://mu1.ao-testnet.xyz?process-id=${process}&assign=${message}`,
      {
        method: "POST",
      },
    ).then((res) => res.json());
    console.log(result);
    */
  }
</script>

<div
  style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
>
  <Confetti
    x={[-5, 5]}
    y={[0, 0.1]}
    delay={[500, 2000]}
    infinite
    duration="5000"
    amount="200"
    fallDistance="100vh"
  />
</div>

<div class="flex-col justify-start items-start gap-[37px] flex">
  <div class="flex-col justify-start items-start gap-[25px] flex">
    <div class="w-12 h-12 relative">
      <svg
        width="52"
        height="52"
        viewBox="0 0 429 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 214H71.3763L85.9429 174.61L53.1681 107.5L0 214Z"
          fill="black"
        />
        <path
          d="M189.366 160.75L109.978 1L85.9429 55.7089L160.961 214H215L189.366 160.75Z"
          fill="black"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M322 214C381.094 214 429 166.094 429 107C429 47.9055 381.094 0 322 0C262.906 0 215 47.9055 215 107C215 166.094 262.906 214 322 214ZM322 172C357.899 172 387 142.899 387 107C387 71.1015 357.899 42 322 42C286.101 42 257 71.1015 257 107C257 142.899 286.101 172 322 172Z"
          fill="black"
        />
      </svg>
    </div>
    <div class="w-[912px] pb-[23px] justify-center items-center inline-flex">
      <div
        class="w-[912px] text-zinc-400 text-[17px] font-normal font-['Satoshi'] tracking-tight"
      >
        {message.length > 0
          ? message
          : "Congrats! You are successfully vouched on the Permaweb!"}
      </div>
    </div>
    <div
      class="w-[701px] h-[175px] px-6 bg-gradient-to-b from-violet-50 to-white rounded-[18px] shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-[49px] flex"
    >
      <div class="justify-center items-start gap-2.5 inline-flex">
        Vouch your AO processes
      </div>
      <button
        class={`px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex text-white ${
          isVouchDone
            ? "cursor-not-allowed opacity-50"
            : isVouchProcessing
              ? "cursor-wait animate-pulse"
              : "cursor-pointer"
        }`}
        on:click={isVouchDone || isVouchProcessing ? null : vouchAO}
        >{isVouchDone ? "AO PROCESSES VOUCHED!" : "VOUCH AO PROCESSES"}</button
      >
    </div>
    <div
      class="w-[701px] h-[175px] px-6 bg-gradient-to-b from-violet-50 to-white rounded-[18px] shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-[49px] flex"
    >
      <div class="justify-center items-start gap-2.5 inline-flex">
        Check out ar://now and start exploring the Permaweb!
      </div>
      <a
        class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex text-white"
        href="https://now.g8way.io"
        on:click={checkGateway}>ar://now</a
      >
    </div>
  </div>
</div>
