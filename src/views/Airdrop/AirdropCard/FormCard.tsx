import React, { useState } from "react"
import styled from "styled-components"
import ReCAPTCHA from "react-google-recaptcha";
import { Card, CardHeader, Heading, Flex, Button, useModal, Text, Input, Link, InfoIcon } from 'leek-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from "components/UnlockButton"
import validator from 'validator'
import { validate } from "graphql";
import ParticipationModal from "../Modal/ParticipationModal"
import { POST_FORM_DATA } from "../store/reducer"
import { store } from "../store/store"

const SECRET_TOKEN = process.env.REACT_APP_RECAPTCHA_TOKEN

const FormLayout = styled.form`
    padding:30px;

    @media (max-width: 768px) {
        padding:20px
    }
`

const SubTitle = styled(Heading).attrs({ as: 'h4', size: 'md' })`
  color: ${({ theme }) => theme.colors.secondary};
  marign: 20px;
`

const FormCard = () => {
    const { account } = useWallet();
    const [twitterName, setTwitterName] = useState("")
    const [retweetUrl, setRetweetUrl] = useState("")
    const [telegramName, setTelegramName] = useState("")
    const [discordName, setDiscordName] = useState("")
    const [validTwitterName, setValidTwitterName] = useState(true)
    const [email, setEmail] = useState("")
    const isRetweetUrlNotEmpty = retweetUrl.trim().length > 0
    const isTelegramNameValid = telegramName.trim().length > 0
    const isDiscordNameValid = discordName.trim().length > 0
    const isRetweetUrlValid = validator.isURL(retweetUrl)
    const isEmailValid = validator.isEmail(email)
    const [isVerified, setIsVerified] = useState(false);
    const [hover, setHover] = useState(false);

    let RetweetUrlErrorMessageComp;

    if (account) {
        if (!isRetweetUrlNotEmpty) {
            RetweetUrlErrorMessageComp = <Text color="failure" fontSize="15px" mt="5px">Sorry! Please input your Retweet URL</Text>
        } else if (!isRetweetUrlValid) {
            RetweetUrlErrorMessageComp = <Text color="failure" fontSize="15px" mt="5px">Sorry! Please input a valid Retweet URL</Text>
        }
    }

    const submitForm = (event) => {
        event.preventDefault();
        const submittedData = {
            "walletAddress": account,
            "twitterName": twitterName,
            "retweetUrl": retweetUrl,
            "telegramName": telegramName,
            "discordName": discordName,
            "email": email,
            "isVerified": isVerified
        }
        const action = {
            type: POST_FORM_DATA,
            formData: submittedData,
        }
        store.dispatch(action)
        onPresentParticipationModal()
    }

    const onHover = () => {
        setHover(true)
    }

    const onLeave = () => {
        setHover(false);
    };


    const onChange = (value) => {
        if (value) {
            setIsVerified(true)
        } else {
            setIsVerified(false)
        }

    }

    const handleIsValid = (e, field:string) => {
        if (field === "twitter") {
            const currentTwitterName = e.currentTarget.value;
            setTwitterName(currentTwitterName)
            if (currentTwitterName.length > 2) {
              setValidTwitterName(true)
            }
        }
    }

    const onBlurValidate = (field: string) => {
      if (field === 'twitter') {
        const currentTwitterName = twitterName;
        if (currentTwitterName.length > 2) {
          setValidTwitterName(true)
        } else {
          setValidTwitterName(false)
        }
      }
    }

    const [onPresentParticipationModal] = useModal(<ParticipationModal onDismiss={() => { return null }} />)

    return (
      <Card>
        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>AirDrop Participation Form</Heading>
          </Flex>
        </CardHeader>

        <FormLayout onSubmit={(e) => submitForm(e)}>
          <Text mb="10px">* Required</Text>
          <div style={{ marginBottom: '20px' }}>
            <SubTitle mb="10px">Section 1: BlockChain</SubTitle>
            <Text mb="5px">* What is your Wallet Address?</Text>
            <Input
              type="text"
              value={account || ''}
              readOnly
              required
              placeholder="Your wallet address..."
              isSuccess={account && account.length > 0}
              name="wallet_address"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <SubTitle mb="10px">Section 2: AirDrop Tasks</SubTitle>
            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* What is your Twitter Name?</Text>
              <Input
                type="text"
                placeholder="Your Twitter Name..."
                value={twitterName}
                onChange={(e) => handleIsValid(e, 'twitter')}
                onBlur={(e) => onBlurValidate('twitter')}
                required
                isSuccess={account && validTwitterName}
                isWarning={account && !validTwitterName}
                name="twitter_name"
              />
              {account && !validTwitterName ? (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Twitter Username
                </Text>
              ) : (
                ''
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* If your retweet our AirDrop Tweets, please enter the Retweet URL below.</Text>
              <Input
                placeholder="Your Retweeted URL..."
                required
                value={retweetUrl}
                onChange={(e) => setRetweetUrl(e.currentTarget.value)}
                isSuccess={account && isRetweetUrlNotEmpty && isRetweetUrlValid}
                isWarning={account && (!isRetweetUrlNotEmpty || !isRetweetUrlValid)}
                name="retweet_url"
              />
              {RetweetUrlErrorMessageComp}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* What is your Telegram UserName in the group?</Text>
              <Input
                type="text"
                placeholder="Your Telegram Name..."
                value={telegramName}
                onChange={(e) => setTelegramName(e.currentTarget.value)}
                required
                isSuccess={account && isTelegramNameValid}
                isWarning={account && !isTelegramNameValid}
                name="telegram_name"
              />
              {account && !isTelegramNameValid ? (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Telegram Username in the group
                </Text>
              ) : (
                ''
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* What is your Discord Name in the group?</Text>
              <Input
                type="text"
                placeholder="Your Discord Name..."
                value={discordName}
                onChange={(e) => setDiscordName(e.currentTarget.value)}
                required
                isSuccess={account && isDiscordNameValid}
                isWarning={account && !isDiscordNameValid}
                name="discord_name"
              />
              {account && !isDiscordNameValid ? (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Discord Username in the group
                </Text>
              ) : (
                ''
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Flex alignItems="start" justifyContent="start">
                <Text mb="5px">If you are an early contributor, please enter your email address below.</Text>
                <InfoIcon mt="3px" onMouseMove={onHover} onMouseLeave={onLeave} style={{ cursor: 'pointer' }} />
              </Flex>

              {hover && (
                <Flex alignItems="start" justifyContent="start">
                  <Text mb="5px" mr="5px">
                    Note: Early contributors are paid members from
                  </Text>
                  <Link href="https://www.bitcoinleek.com" target="_blank">
                    bitcoinleek.com
                  </Link>
                </Flex>
              )}

              <Input
                type="text"
                placeholder="Your Email Address ..."
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                isSuccess={account && isEmailValid}
                isWarning={account && !isEmailValid}
                name="early_contributor"
              />
              {account && !isEmailValid ? (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input a valid email address
                </Text>
              ) : (
                ''
              )}
            </div>
          </div>
          <ReCAPTCHA sitekey={SECRET_TOKEN} onChange={onChange} />,
          {account ? (
            <Button
              type="submit"
              fullWidth
              disabled={
                !(validTwitterName && isTelegramNameValid && isDiscordNameValid && isRetweetUrlValid && isVerified)
              }
            >
              {' '}
              Participate
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </FormLayout>
      </Card>
    )

}

export default FormCard