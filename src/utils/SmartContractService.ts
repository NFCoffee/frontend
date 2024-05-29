import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {Transaction as Tx} from 'ethereumjs-tx';
// import CryptoJS from 'rn-crypto-js';
import * as Keychain from 'react-native-keychain';

// Load ABIs
import OrderingABI from './Ordering_ABI.json';
import PLZTokenABI from './PLZToken_ABI.json';
import PLZNFTABI from './PLZNFT_ABI.json';

// Web3 인스턴스 생성
const web3 = new Web3('http://127.0.0.1:8545');

// 스마트 컨트랙트 주소
const ORDERING_CONTRACT_ADDRESS = '0xYourOrderingContractAddress';
const PLZ_TOKEN_CONTRACT_ADDRESS = '0xYourPLZTokenContractAddress';
const PLZ_NFT_CONTRACT_ADDRESS = '0xYourPLZNFTContractAddress';

// 컨트랙트 인스턴스 생성
const orderingContract = new web3.eth.Contract(
  OrderingABI as AbiItem[],
  ORDERING_CONTRACT_ADDRESS,
);
const plzTokenContract = new web3.eth.Contract(
  PLZTokenABI as AbiItem[],
  PLZ_TOKEN_CONTRACT_ADDRESS,
);
const plzNftContract = new web3.eth.Contract(
  PLZNFTABI as AbiItem[],
  PLZ_NFT_CONTRACT_ADDRESS,
);

// 암호화 및 복호화 함수
// const encryptPrivateKey = (privateKey: string, passphrase: string): string => {
//   return CryptoJS.AES.encrypt(privateKey, passphrase).toString();
// };

// const decryptPrivateKey = (
//   encryptedPrivateKey: string,
//   passphrase: string,
// ): string => {
//   const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, passphrase);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

// 프라이빗 키 저장
const savePrivateKey = async (privateKey: string, passphrase: string) => {
  // const encryptedPrivateKey = encryptPrivateKey(privateKey, passphrase);
  // await Keychain.setGenericPassword('privateKey', encryptedPrivateKey);
  await Keychain.setGenericPassword('privateKey', privateKey);
};

// 프라이빗 키 로드
const loadPrivateKey = async (passphrase: string): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    // return decryptPrivateKey(credentials.password, passphrase);
    return credentials.password;
  }
  return null;
};

export const SmartContractService = {
  // 트랜잭션 서명 및 전송 함수
  signAndSendTransaction: async (txData: any, passphrase: string) => {
    try {
      const privateKey = await loadPrivateKey(passphrase);
      if (!privateKey) {
        throw new Error('Private key not found');
      }
      const privateKeyBuffer = Buffer.from(privateKey, 'hex');
      const txCount = await web3.eth.getTransactionCount(txData.from);
      const txParams = {
        ...txData,
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        gasLimit: web3.utils.toHex(210000),
      };

      const tx = new Tx(txParams);
      tx.sign(privateKeyBuffer);

      const serializedTx = tx.serialize();
      const rawTx = '0x' + serializedTx.toString('hex');

      const receipt = await web3.eth.sendSignedTransaction(rawTx);
      console.log('Transaction Receipt:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  },

  // Ordering 컨트랙트 메서드
  orderBeverage: async (
    account: string,
    beverage: string,
    passphrase: string,
  ) => {
    try {
      const txData = {
        from: account,
        to: ORDERING_CONTRACT_ADDRESS,
        data: orderingContract.methods.orderBeverage(beverage).encodeABI(),
      };
      const receipt = await SmartContractService.signAndSendTransaction(
        txData,
        passphrase,
      );
      console.log('Order Beverage Receipt:', receipt);
    } catch (error) {
      console.error('Error ordering beverage:', error);
    }
  },

  getAllValidBeverages: async () => {
    try {
      const beverages = await orderingContract.methods
        .getAllValidBeverages()
        .call();
      console.log('Valid Beverages:', beverages);
      return beverages;
    } catch (error) {
      console.error('Error getting all valid beverages:', error);
    }
  },

  // PLZToken 컨트랙트 메서드
  requestTokens: async (account: string, passphrase: string) => {
    try {
      const txData = {
        from: account,
        to: PLZ_TOKEN_CONTRACT_ADDRESS,
        data: plzTokenContract.methods.requestTokens().encodeABI(),
      };
      const receipt = await SmartContractService.signAndSendTransaction(
        txData,
        passphrase,
      );
      console.log('Request Tokens Receipt:', receipt);
    } catch (error) {
      console.error('Error requesting tokens:', error);
    }
  },

  balanceOf: async (account: string) => {
    try {
      const balance = await plzTokenContract.methods.balanceOf(account).call();
      console.log('Balance:', balance);
      return balance;
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  },

  approve: async (
    account: string,
    spender: string,
    amount: number,
    passphrase: string,
  ) => {
    try {
      const txData = {
        from: account,
        to: PLZ_TOKEN_CONTRACT_ADDRESS,
        data: plzTokenContract.methods.approve(spender, amount).encodeABI(),
      };
      const receipt = await SmartContractService.signAndSendTransaction(
        txData,
        passphrase,
      );
      console.log('Approve Receipt:', receipt);
    } catch (error) {
      console.error('Error approving spender:', error);
    }
  },

  // PLZNFT 컨트랙트 메서드
  mintAndTransfer: async (
    account: string,
    recipient: string,
    tokenURI: string,
    passphrase: string,
  ) => {
    try {
      const txData = {
        from: account,
        to: PLZ_NFT_CONTRACT_ADDRESS,
        data: plzNftContract.methods
          .mintAndTransfer(recipient, tokenURI)
          .encodeABI(),
      };
      const receipt = await SmartContractService.signAndSendTransaction(
        txData,
        passphrase,
      );
      console.log('Mint and Transfer Receipt:', receipt);
    } catch (error) {
      console.error('Error minting and transferring:', error);
    }
  },

  ownerOf: async (tokenId: number) => {
    try {
      const owner = await plzNftContract.methods.ownerOf(tokenId).call();
      console.log('Owner of Token:', owner);
      return owner;
    } catch (error) {
      console.error('Error getting owner of token:', error);
    }
  },

  // userHasNFT: async (account: string, tokenId: number) => {
  //   try {
  //     const owner = await plzNftContract.methods.ownerOf(tokenId).call();
  //     return owner.toLowerCase() === account.toLowerCase();
  //   } catch (error) {
  //     console.error('Error checking if user has NFT:', error);
  //     return false;
  //   }
  // },
  userHasNFT: async (account: string, tokenId: number) => {
    try {
      const owner: string = await plzNftContract.methods
        .ownerOf(tokenId)
        .call();

      if (owner) {
        return owner.toLowerCase() === account.toLowerCase();
      } else {
        console.error('Owner is not defined:', owner);
        return false;
      }
    } catch (error) {
      console.error('Error checking if user has NFT:', error);
      return false;
    }
  },
};

export default SmartContractService;
