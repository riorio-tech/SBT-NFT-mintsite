import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

import axios from 'axios';
import fileDownload from 'js-file-download';

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: orange;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;



export const StyledButtonA = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--button-bg);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButtonB = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--button-bg);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButtonPS = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--button-bg);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButtonUnlock = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: purple;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;





export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`???????????????????????????????????????SBT??????????????????????????????`);
  const [mintAmount, setMintAmount] = useState(1);
  const [mintAmountB, setMintAmountB] = useState(1);
  const [minted, setminted] = useState(0);
  const [mintedWlA, setmintedWlA] = useState(0);
  const [mintedWlB, setmintedWlB] = useState(0);
  const [wlA, setwlA] = useState(false);
  const [wlB, setwlB] = useState(false);

  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: "???",
    WEI_COST: 0,
    DISPLAY_COST: 0,
    DISPLAY_COSTWLB: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const handleClick = (url, filename) => {
    alert("???????????????????????????????????????????????????");
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }



  
  const claimNFTsA = () => {
    let cost = 0;//??????????????????0714(???????????????)
    let amount = wlA;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * amount);//?????????????????????0714(???????????????)
    let totalGasLimit = String(gasLimit * 1);//?????????????????????0714(???????????????)
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`${CONFIG.NFT_NAME}????????????...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
    .freeMintA(amount)
    // .FreeMintB(1)
    // .psMint(1)
    .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
        maxPriorityFeePerGas: "40000000000",
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("?????????????????????????????????????????????");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `?????????????????????????????????${CONFIG.NFT_NAME}???????????????!!?????????Open sea????????????????????????????????????`
        );
        setClaimingNft(true);
        checkMintedwlA();
        // dispatch(fetchData(blockchain.account));
      });
  };



  const claimNFTsB = () => {
    let cost = CONFIG.WEI_COSTB;
    let amount = mintAmountB;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * amount);//?????????????????????0714(???????????????)
    let totalGasLimit = String(gasLimit * amount);//?????????1?????????0714(???????????????)
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`${CONFIG.NFT_NAME}????????????...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
    .mintB(amount)
    .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
        maxPriorityFeePerGas: "40000000000",
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("?????????????????????????????????????????????");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `?????????????????????????????????${CONFIG.NFT_NAME}???????????????!!?????????Open sea????????????????????????????????????`
        );
        setClaimingNft(true);
        checkMintedwlB();
        // dispatch(fetchData(blockchain.account));
      });
  };



  const claimNFTsPS = () => {
    let cost = CONFIG.WEI_COST;
    let amount = mintAmount;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * amount);//?????????????????????0714(???????????????)
    let totalGasLimit = String(gasLimit * amount);//?????????1?????????0714(???????????????)
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`${CONFIG.NFT_NAME}????????????...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
    .mint(amount)
    .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
        maxPriorityFeePerGas: "40000000000",
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("?????????????????????????????????????????????");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `?????????????????????????????????${CONFIG.NFT_NAME}???????????????!!?????????Open sea????????????????????????????????????`
        );
        setClaimingNft(false);
        checkMinted();
        // dispatch(fetchData(blockchain.account));
      });
  };




  const checkWlA = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      blockchain.smartContract.methods
      ._whiteLists_A(blockchain.account)
      .call()
      .then((receipt) => {
        setwlA(receipt);
        // dispatch(fetchData(blockchain.account));
      });
    }
  };



  const checkWlB = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      blockchain.smartContract.methods
      ._whiteLists_B(blockchain.account)
      .call()
      .then((receipt) => {
        setwlB(receipt);
        // dispatch(fetchData(blockchain.account));
      });
    }
  };



  const checkMinted = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      blockchain.smartContract.methods
      .psMinted(blockchain.account)
      .call()
      .then((receipt) => {
        setminted(receipt);
        dispatch(fetchData(blockchain.account));
      });
    }
  };


  const checkMintedwlA = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      blockchain.smartContract.methods
      .freeMinted_A(blockchain.account)
      .call()
      .then((receipt) => {
        setmintedWlA(receipt);
        dispatch(fetchData(blockchain.account));
      });
    }
  };


  const checkMintedwlB = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      blockchain.smartContract.methods
      .freeMinted_B(blockchain.account)
      .call()
      .then((receipt) => {
        setmintedWlB(receipt);
        dispatch(fetchData(blockchain.account));
      });
    }
  };


  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > (2 - minted)) {
      newMintAmount = 2 - minted;
    }
    setMintAmount(newMintAmount);
  };




  const decrementMintAmountB = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmountB(newMintAmount);
  };

  const incrementMintAmountB = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > (2 - minted)) {
      newMintAmount = 2 - minted;
    }
    setMintAmountB(newMintAmount);
  };


  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
    checkMinted();
    checkMintedwlA();
    checkMintedwlB();
    checkWlA();
    checkWlB();
  }, []);

  useEffect(() => {
    getData();
    checkMinted();
    checkMintedwlA();
    checkMintedwlB();
    checkWlA();
    checkWlB();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"/config/images/side.png"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
                              <s.SpacerXSmall />
                {/* <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                      <AudioPlayer></AudioPlayer>
                </s.TextDescription> */}


              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {CONFIG.NFT_NAME}???????????? ????????????????????????????????????
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs
                </s.TextTitle>
                <s.SpacerXSmall />

                {/* <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {"?????????DAO??????????????????"}
                </s.TextTitle>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {CONFIG.DISPLAY_COSTWL}{CONFIG.NETWORK.SYMBOL}{"(Max 1mint)"}
                </s.TextTitle> */}
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {"?????????DAO?????????????????????????????????"}
                </s.TextTitle>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {"Freemint"}{"(Max 2mint)"}
                </s.TextTitle>
                <s.SpacerXSmall />


                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  +?????????????????????
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {CONFIG.NFT_NAME}??????????????????????????? {CONFIG.NETWORK.NAME} network?????????????????????????????????????????????
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      ????????????
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    {/* <s.Container ai={"center"} jc={"center"} fd={"row"}>
                     
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {2}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      
                    </s.Container>
                    <s.SpacerSmall /> */}
                    <s.Container>

                      {/* A???????????? */}
                      {wlA > 0 ? (//A?????????????????????????????????
                        <>
                          {data.wlSaleStart_A ? (//?????????A????????????
                         <>
                        {mintedWlA >= wlA ? (//??????????????????
                          <>
                          <s.Container ai={"center"} jc={"center"} fd={"row"}>
                            <StyledButtonA
                              disabled={1}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {"A.mint ???" }
                            </StyledButtonA>
                          </s.Container>

                          </>
                        ):(
                          <>
                          <s.Container ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButtonA
                            disabled={claimingNft ? 1:  0}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTsA();
                              getData();
                            }}
                          >
                            {claimingNft ? "?????????" : "free????????? A"}
                          </StyledButtonA>
                          </s.Container>
                          </>                      
                            )}
                        </>
                      ) : (
                      <>
                        <s.Container ai={"center"} jc={"center"} fd={"row"}>

                      <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"WL_A??????????????????????????????"}
                        </s.TextDescription>
                        </s.Container>

                        <s.Container ai={"center"} jc={"center"} fd={"row"}>

                        <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"ComingSoon."}
                        </s.TextDescription>
                          </s.Container>
                      </>
                      )
                      }
                        </>
                      ) : (
                        <></>
                      )
                      }
                      {/* A???????????? */}

                      <s.Container>
                      {/* B???????????? */}
                      {wlB > 0 ? (//B?????????????????????????????????
                        <>
                      {data.wlSaleStart_B ? (//?????????B????????????
                      <>
                      {mintedWlB >= wlB ? (
                      <>
                      <s.SpacerMedium />

                        <s.Container ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButtonB
                            disabled={1}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            {"B.mint ???" }
                          </StyledButtonB>
                          </s.Container>
                      </>
                      ) : (
                        <>
                        {wlB > 1 ? (//mint??????????????????????????????????????????????????????
                      <>
                            <s.SpacerMedium />
                            <s.Container>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>

                            <s.TextTitle
                              style={{ textAlign: "center", color: "var(--accent-text)" }}
                            >
                              {"mintB("}{mintedWlB}{"mint???)"}
                            </s.TextTitle>
                            </s.Container>

                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                            <s.SpacerXSmall />
                              <StyledRoundButton
                                style={{ lineHeight: 0.4 }}
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  decrementMintAmountB();
                                }}
                              >
                                -
                              </StyledRoundButton>
                              <s.SpacerMedium />
                              <s.TextDescription
                                style={{
                                  textAlign: "center",
                                  color: "var(--accent-text)",
                                }}
                              >
                                {mintAmountB}
                              </s.TextDescription>
                              <s.SpacerMedium />
                              <StyledRoundButton
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  incrementMintAmountB();
                                }}
                              >
                                +
                              </StyledRoundButton>
                              </s.Container>
                              </s.Container>
                            <s.SpacerSmall />
                        </>
                        ) : (
                          <>
                          </>
                        )}
                          <s.Container ai={"center"} jc={"center"} fd={"row"}>

                        <StyledButtonB
                        disabled={claimingNft ? 1  : 0}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTsB();
                          getData();
                        }}
                      >
                        {claimingNft ? "?????????" : "????????? B"}
                      </StyledButtonB>
                      </s.Container>

                        </>
                      )}                  
                      </>
                      ) : (
                      <>
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>

                      <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"WL_B??????????????????????????????"}
                        </s.TextDescription>
                        </s.Container>
                        <s.Container ai={"center"} jc={"center"} fd={"row"}>

                      <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"ComingSoon."}
                        </s.TextDescription>
                        </s.Container>

                      </>
                      )
                      }                        
                        </>
                        ) : (
                        <></>
                      )}
                      {/* B???????????? */}
                      </s.Container>

                      {/* PS???????????? */}
                      {data.saleStart ? (
                        <>
                        {minted > 1 ? (
                          <>
                          <s.SpacerMedium />

                          <s.Container ai={"center"} jc={"center"} fd={"row"}>

                          <StyledButtonPS
                            disabled={1}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            {"PS.mint ???" }
                          </StyledButtonPS>
                          </s.Container>

                          </>
                        ) : (
                          <>
                            <s.SpacerMedium />
                            <s.Container>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>

                            <s.TextTitle
                              style={{ textAlign: "center", color: "var(--accent-text)" }}
                            >
                              {"????????????????????????("}{minted}{"mint???)"}
                            </s.TextTitle>
                            </s.Container>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                            <s.SpacerXSmall />
                              <StyledRoundButton
                                style={{ lineHeight: 0.4 }}
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  decrementMintAmount();
                                }}
                              >
                                -
                              </StyledRoundButton>
                              <s.SpacerMedium />
                              <s.TextDescription
                                style={{
                                  textAlign: "center",
                                  color: "var(--accent-text)",
                                }}
                              >
                                {mintAmount}
                              </s.TextDescription>
                              <s.SpacerMedium />
                              <StyledRoundButton
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  incrementMintAmount();
                                }}
                              >
                                +
                              </StyledRoundButton>
                              </s.Container>
                              </s.Container>
                            <s.SpacerSmall />
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <StyledButtonPS
                                disabled={claimingNft ? 1 : 0}//claimingNftPs???true?????? disabled????????????????????????????????????????????????
                                onClick={(e) => {
                                  e.preventDefault();
                                  claimNFTsPS();
                                  getData();
                                }}
                              >
                              {claimingNft ? "?????????" : "????????? PS"}
                              </StyledButtonPS>
                            </s.Container>
                            {minted > 0 ? (
                                <>
                                </>                              
                            ):(
                            <></>
                            )}
                          </>
                        )}
                        </>
                      ) : (
                        <>
                        <s.Container ai={"center"} jc={"center"} fd={"row"}>

                        <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"PS.ComingSoon."}
                        </s.TextDescription>
                        </s.Container>
                        </>
                      )}
                      {/* PS???????????? */}
                      {minted > 0 || mintedWlA > 0 || mintedWlB > 0 ? (
                        <>
                          <s.SpacerMedium />
                              <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                <StyledLink target={"_blank"} href={"https://arweave.net/M5jd4be7U2D1_vwxdp_lSEOyCewJSnE-RlNInWVaMlw"} download={"welcometoOnikon.wav"}>
                                  ?????????????????????[??????]????????????
                                </StyledLink>
                                </s.Container>
                                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                <s.TextDescription
                          style={{
                            color: "var(--accent-text)",
                          }}
                        >
                        {"????????????????????????????????????????"}
                        </s.TextDescription>
                        </s.Container>
                                <s.Container ai={"center"} jc={"center"} fd={"row"}>

                                <StyledButtonUnlock
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleClick('https://arweave.net/M5jd4be7U2D1_vwxdp_lSEOyCewJSnE-RlNInWVaMlw', 'welcometoOnikon.wav');
                                }}
                              >
                              download</StyledButtonUnlock>
                              </s.Container>
                        </>
                      ) : (<></>)}
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"/config/images/side.png"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;