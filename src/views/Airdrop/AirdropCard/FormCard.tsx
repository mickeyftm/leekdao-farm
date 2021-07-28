import React, { useState } from "react"
import styled from "styled-components"
import ReCAPTCHA from "react-google-recaptcha";
import { Card, CardHeader, Heading, Flex, Button, useModal, Text, Input, Link, InfoIcon } from 'leek-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from "components/UnlockButton"
import validator from 'validator'
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
    const [validTwitter, setValidTwitter] = useState(true)
    const [validRetweetUrl, setValidRetweetUrl] = useState(true)
    const [validTelegram, setValidTelegram] = useState(true)
    const [validDiscord, setValidDiscord] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [email, setEmail] = useState("")
    const [isVerified, setIsVerified] = useState(false);
    const [hover, setHover] = useState(false);

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

    const validateAllFields = (field: string, fieldValue: string) => {
        if (field === 'twitter') {
          setTwitterName(fieldValue)
          if (validator.isLength(fieldValue, { min: 1, max: 30 })) {
            setValidTwitter(true)
          } else {
            setValidTwitter(false)
          }
        } else if (field === 'retweetUrl') {
          setRetweetUrl(fieldValue)
          if (validator.isURL(fieldValue)) {
            setValidRetweetUrl(true)
          } else {
            setValidRetweetUrl(false)
          }
        } else if (field === 'telegram') {
          setTelegramName(fieldValue)
          if (validator.isLength(fieldValue, { min: 1, max: 30 })) {
            setValidTelegram(true)
          } else {
            setValidTelegram(false)
          }
        } else if (field === 'discord') {
          setDiscordName(fieldValue)
          if (validator.isLength(fieldValue, { min: 1, max: 30 })) {
            setValidDiscord(true)
          } else {
            setValidDiscord(false)
          }
        } else if (field === 'email') {
          setEmail(fieldValue)
          if (validator.isEmail(fieldValue)) {
            setValidEmail(true)
          } else {
            setValidEmail(false)
          }
        }
    }

    const handleIsValid = (e, field:string) => {
        validateAllFields(field, e.currentTarget.value);
    }

    const onBlurValidate = (field: string) => {
        const fieldMapping = {
          'twitter': twitterName,
          'retweetUrl': retweetUrl,
          'telegram': telegramName,
          'discord': discordName,
          'email': email
        }
        validateAllFields(field, fieldMapping[field])
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
                onBlur={() => onBlurValidate('twitter')}
                required
                isSuccess={account && validTwitter}
                isWarning={account && !validTwitter}
                name="twitter_name"
              />
              {account && !validTwitter && (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Twitter Username
                </Text>
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* If your retweet our AirDrop Tweets, please enter the Retweet URL below.</Text>
              <Input
                placeholder="Your Retweeted URL..."
                required
                value={retweetUrl}
                onChange={(e) => handleIsValid(e, 'retweetUrl')}
                onBlur={() => onBlurValidate('retweetUrl')}
                isSuccess={account && validRetweetUrl}
                isWarning={account && !validRetweetUrl}
                name="retweet_url"
              />
              {account && !validRetweetUrl && (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Retweet Url!
                </Text>
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* What is your Telegram UserName in the group?</Text>
              <Input
                type="text"
                placeholder="Your Telegram Name..."
                required
                value={telegramName}
                onChange={(e) => handleIsValid(e, 'telegram')}
                onBlur={() => onBlurValidate('telegram')}
                isSuccess={account && validTelegram}
                isWarning={account && !validTelegram}
                name="telegram_name"
              />
              {account && !validTelegram && (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Telegram Username in the group
                </Text>
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text mb="5px">* What is your Discord Name in the group?</Text>
              <Input
                type="text"
                placeholder="Your Discord Name..."
                value={discordName}
                onChange={(e) => handleIsValid(e, 'discord')}
                onBlur={() => onBlurValidate('discord')}
                required
                isSuccess={account && validDiscord}
                isWarning={account && !validDiscord}
                name="discord_name"
              />
              {account && !validDiscord && (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input your Discord Username in the group
                </Text>
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
                onChange={(e) => handleIsValid(e, 'email')}
                isSuccess={account && validEmail}
                isWarning={account && !validEmail}
                name="early_contributor"
              />
              {account && !validEmail && (
                <Text color="failure" fontSize="15px" mt="5px">
                  Sorry! Please input a valid email address
                </Text>
              )}
            </div>
          </div>
          <ReCAPTCHA sitekey={SECRET_TOKEN} onChange={onChange} />,
          {account ? (
            <Button
              type="submit"
              fullWidth
              disabled={!(validTwitter && validTelegram && validDiscord && validRetweetUrl && isVerified)}
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