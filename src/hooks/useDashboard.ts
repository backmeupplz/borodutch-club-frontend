import {
  getChatInviteLink,
  getInfo,
  getPortal,
  getSubscriptionSession,
} from 'helpers/api'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY!)

const useDashboard = (token: string) => {
  const [name, setName] = useState<string | null>(null)
  const [telegramId, setTelegramId] = useState<string | null>(null)
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)
  const [chatInviteLink, setChatInviteLink] = useState<string | null>(null)

  const openCheckout = async () => {
    const stripe = await stripePromise
    if (!stripe) {
      return
    }
    const session = await getSubscriptionSession(token)
    await stripe.redirectToCheckout({
      sessionId: session.session,
    })
  }

  const openPortal = async () => {
    const { url } = await getPortal(token)
    window.location.href = url
  }

  const fetchChatInviteLink = async () => {
    const { link } = await getChatInviteLink(token)
    setChatInviteLink(link)
  }

  useEffect(() => {
    const fetchData = async () => {
      const info = await getInfo(token)
      setName(info.name)
      setTelegramId(info.telegramId)
      setSubscriptionId(info.subscriptionId)
    }

    fetchData()
  }, [token])

  return {
    name,
    telegramId,
    subscriptionId,
    chatInviteLink,
    openCheckout,
    openPortal,
    fetchChatInviteLink,
  }
}

export default useDashboard
