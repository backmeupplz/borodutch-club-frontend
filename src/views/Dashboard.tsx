import React, { FC } from 'react'
import { BodyText, HeaderText } from 'components/Text'
import useDashboard from 'hooks/useDashboard'
import Button from 'components/Button'
import { classnames } from 'classnames/tailwind'
import Link from 'components/Link'

type Props = {
  token: string
}

const buttonContainer = classnames(
  'flex',
  'flex-row',
  'justify-center',
  'my-4',
  'select-none'
)

const marginedContainer = classnames('my-4')
const MarginedContainer: FC = ({ children }) => {
  return <div className={marginedContainer}>{children}</div>
}

type ButtonContainerProps = {
  onClick: () => void
}
const ButtonContainer: FC<ButtonContainerProps> = ({ onClick, children }) => {
  return (
    <div className={buttonContainer}>
      <Button onClick={onClick}>{children}</Button>
    </div>
  )
}

const Dashboard: FC<Props> = ({ token }) => {
  const {
    name,
    subscriptionId,
    openCheckout,
    openPortal,
    fetchChatInviteLink,
    chatInviteLink,
  } = useDashboard(token)

  const renderUnsubscribed = () => {
    return (
      <div>
        <BodyText>
          It seems that you don't have a subscription yet. To get an invitation
          link to the secret chat, you need to purchase a subscription for
          $23.11 per month by clicking the button below!
        </BodyText>
        <ButtonContainer onClick={openCheckout}>Subscribe!</ButtonContainer>
        <ButtonContainer
          onClick={() => {
            window.location.reload()
          }}
        >
          Or try refreshing the page, in case something didn't load properly.
        </ButtonContainer>
      </div>
    )
  }

  const renderSubscribed = () => {
    return (
      <div>
        <BodyText>
          Nice! You've managed to subscribe, and your subscription is active.
          Click the button below if you want to manage it. Be aware that after
          unsubscribing, the bot will instantly remove you from the Borodutch
          Club.
        </BodyText>
        <ButtonContainer onClick={openPortal}>
          Manage subscription
        </ButtonContainer>
        {!chatInviteLink && (
          <ButtonContainer onClick={fetchChatInviteLink}>
            Get the invite link!
          </ButtonContainer>
        )}
        {!!chatInviteLink && (
          <MarginedContainer>
            <BodyText>
              The link is valid for the next 15 minutes, and only people with an
              active subscription can enter the group:{' '}
              <Link url={chatInviteLink}>Enter!</Link>
            </BodyText>
          </MarginedContainer>
        )}
      </div>
    )
  }

  return (
    <div>
      <HeaderText>Hi, {name}!</HeaderText>
      {!subscriptionId ? renderUnsubscribed() : renderSubscribed()}
      <BodyText>
        If you have any issues, contact me{' '}
        <Link url="https://t.me/borodutch">on Telegram</Link>.
      </BodyText>
      <BodyText>
        The Main Document of the Club{' '}
        <Link url="https://telegra.ph/The-Main-Document-of-Borodutch-Club-01-03">
          is here
        </Link>
        .
      </BodyText>
    </div>
  )
}

export default Dashboard
