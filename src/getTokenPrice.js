const axios = require("axios");
var fs = require("fs");
let addressOBJArr = [
  //token abi
  {
    address: "0x0fEAdcC3824E7F3c12f40E324a60c23cA51627fc",
    name: "wad",
  },
  {
    address: "0x844fa82f1e54824655470970f7004dd90546bb28",
    name: "dop",
  },
  {
    address: "0x768d221e81524de52841aed976370b2e4f990416",
    name: "mmp",
  },
  {
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    name: "busd",
  },
  {
    address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    name: "dai",
  },
  {
    address: "0x23396cf899ca06c4472205fc903bdb4de249d6fc",
    name: "ust",
  },
  {
    address: "0x55d398326f99059ff775485246999027b3197955",
    name: "usdt",
  },
  {
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    name: "usdc",
  },
  {
    address: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    name: "btcb",
  },
  {
    address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    name: "eth",
  },
  {
    address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
    name: "cake",
  },
  {
    address: "0x39f1014a88c8ec087cedf1bfc7064d24f507b894",
    name: "scz", // waiting list
  },
  {
    address: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
    name: "dot",
  },
  {
    address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
    name: "xrp",
  },
  {
    address: "0xa184088a740c695e156f91f5cc086a06bb78b827",
    name: "autov2",
  },
  {
    address: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
    name: "link",
  },
  {
    address: "0x947950bcc74888a40ffa2593c5798f11fc9124c4",
    name: "sushi", //
  },
  {
    address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
    name: "ada", //pancake
  },
  {
    address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
    name: "doge", //ape
  },
  {
    address: "0x0491648c910ad2c1afaab733faf71d30313df7fc",
    name: "jdi", // ape
  },
  {
    address: "0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95",
    name: "banana", // ape
  },

  {
    address: "",
    name: "scz",
  },
  {
    address: "",
    name: "scz",
  },

  ///LP abi

  //warden abi
  
  {
    address: "0x0fEAdcC3824E7F3c12f40E324a60c23cA51627fc",
    name: "warden-wad",
  },
  {
    address: "0xDc683Adb914EdF91df4A36c33EE4f59ca41bC263",
    name: "warden-wad-bnb",
  },
  {
    address: "0xc95b1750043fce5dfcc8539835ea3830ec002a89",
    name: "warden-wad-busd",
  },
  {
    address: "0xCf643C4B9DBf42239aa00e23A0570c90d517E6dC",
    name: "warden-busd-bnb",
  },
  {
    address: "0x7942d74438D0D58e0E2946b525699767a871fddf",
    name: "warden-bnb-bidr",
  },
  {
    address: "0x1b1675A97b2f62B568569ebD349E88A04DdE8586",
    name: "warden-btcb-bnb",
  },
  {
    address: "0x8485c5f255FF30AafaB0030329e508BD8dDE11c5",
    name: "warden-eth-bnb",
  },
  {
    address: "0x087d69B97a6dF4FB37E4E93A31752008223A6C19",
    name: "warden-usdt-busd",
  },
  ///dopple
  {
    address: "0x844fa82f1e54824655470970f7004dd90546bb28",
    name: "dopple-dop",
  },
  {
    address: "0xdc62be962c1754deda214848614a87b88e7ff646",
    name: "dopple-dop-dolly",
  },
  {
    address: "0x070659c37d40029280dfec931b20e315f2cdffbc",
    name: "dopple-dop-bnb",
  },
  {
    address: "0xb694ec7c2a7c433e69200b1da3ebc86907b4578b",
    name: "dopple-dop-busd",
  },
  {
    address: "0x9116f04092828390799514bac9986529d70c3791",
    name: "dopple-dop-lp",
  },
  {
    address: "0xAA5509Ce0ecEA324bff504A46Fc61EB75Cb68B0c",
    name: "dopple-dolly-lp",
  },
  {
    address: "0x7edcdc8cd062948ce9a9bc38c477e6aa244dd545",
    name: "dopple-ust-lp",
  },
  {
    address: "0x124166103814e5a033869c88e0f40c61700fca17",
    name: "dopple-2pool-lp",
  },
  //pancake
  {
    address: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
    name: "pancake-cake-bnb",
  },
  {
    address: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
    name: "pancake-bnb-busd",
  },
  {
    address: "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F",
    name: "pancake-ada-bnb",
  },
  {
    address: "0x16aFc4F2Ad82986bbE2a4525601F8199AB9c832D",
    name: "pancake-sushi-eth",
  },
  {
    address: "0xf45cd219aef8618a92baa7ad848364a158a24f33",
    name: "pancake-btcb-busd",
  },
  {
    address: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    name: "pancake-eth-bnb",
  },
  {
    address: "0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF",
    name: "pancake-dot-bnb",
  },
  {
    address: "0x03F18135c44C64ebFdCBad8297fe5bDafdBbdd86",
    name: "pancake-xrp-bnb",
  },
  {
    address: "0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead56",
    name: "pancake-autov2-bnb",
  },
  {
    address: "0x824eb9faDFb377394430d2744fa7C42916DE3eCe",
    name: "pancake-link-bnb",
  },
  //apeswap
  {
    address: "0xfd1ef328a17a8e8eeaf7e4ea1ed8a108e1f2d096",
    name: "ape-doge-bnb",
  },
];

const masterChef = {
  dopMasterChef: "0xda0a175960007b0919dbf11a38e6ec52896bddbe",
  wardenMasterChef: "0xde866dd77b6df6772e320dc92bff0eddc626c674",
  pancakeswapMasterChef : "0x73feaa1ee314f8c655e354234017be2193c9e24e"
};
const getABIFunction = (addressOBJArr, idx, maxLength) => {
  let data = addressOBJArr[idx];
  console.log(data['name'], idx);
  let url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${data["address"]}&apikey=M4DZ9R465CNF2YUEHIKVMAHI6VYI2W3YUT`;
  axios
    .get(url)
    .then((res) => {
      // console.log(res.data.result)
      fs.writeFile(`./ABI/ABI${data["name"]}.json`, res.data.result, () => {
        //   console.log(idx , maxLength)
        if (idx < maxLength - 1)
          getABIFunction(addressOBJArr, idx + 1, maxLength);
      });
    })
    .catch((err) => console.log(err));
};

getABIFunction(addressOBJArr, 0, addressOBJArr.length)
