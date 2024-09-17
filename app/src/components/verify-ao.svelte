<script>
  export let signingMessage = {
    message: "",
    nonce: "",
  };

  import { address } from "../store.js";
  const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;

  let isProcessing = false;

  function login() {
    isProcessing = true;
    const addr = $address;
    console.log("address: ", addr);
    const redirect = `${SERVER_ADDRESS}/vouch?address=${addr}&callback=${encodeURI(
      globalThis.location.href
    )}`;
    console.log("redirect: ", redirect);
    globalThis.location.href = redirect;
  }
</script>

<div class="flex-col justify-start items-start gap-[37px] flex">
  <div class="flex-col justify-start items-start gap-[25px] flex">
    <div class="w-[912px] pb-[23px] justify-center items-center inline-flex">
      <div
        class="w-[912px] text-zinc-400 text-[17px] font-normal font-['Satoshi'] tracking-tight"
      >
        Now that you connected your wallet, verify your AO balance to prove your
        credibility on the permaweb.
      </div>
    </div>
  </div>
  <div
    class="w-[701px] h-[175px] px-6 bg-gradient-to-b from-violet-50 to-white rounded-[18px] shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-[49px] flex"
  >
    <div class="justify-center items-start gap-2.5 inline-flex">
      <div
        class="text-zinc-900 text-[19px] font-medium font-['Satoshi'] tracking-tight"
      >
        Verify your AO Balance.
      </div>
    </div>
    <button
      on:click={isProcessing ? null : login}
      class={`flex-col justify-center items-start gap-[7px] flex ${
        isProcessing ? "cursor-wait animate-pulse" : "cursor-pointer"
      }`}
    >
      <div
        class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
      >
        <div class="justify-start items-center gap-1.5 flex">
          <svg
            width="26"
            height="26"
            viewBox="0 0 429 214"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 214H71.3763L85.9429 174.61L53.1681 107.5L0 214Z"
              fill="white"
            />
            <path
              d="M189.366 160.75L109.978 1L85.9429 55.7089L160.961 214H215L189.366 160.75Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M322 214C381.094 214 429 166.094 429 107C429 47.9055 381.094 0 322 0C262.906 0 215 47.9055 215 107C215 166.094 262.906 214 322 214ZM322 172C357.899 172 387 142.899 387 107C387 71.1015 357.899 42 322 42C286.101 42 257 71.1015 257 107C257 142.899 286.101 172 322 172Z"
              fill="white"
            />
          </svg>
          <!-- <svg
            width="24"
            height="11.97"
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
          </svg> -->

          <div class="text-white text-[17px] font-medium font-['Satoshi']">
            Verify Balance
          </div>
          <div class="w-[25px] h-[25px] relative">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.94788 17.7708L13.7187 13L8.94788 8.21875L10.4166 6.75L16.6666 13L10.4166 19.25L8.94788 17.7708Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  </div>
</div>
