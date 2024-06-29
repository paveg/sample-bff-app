import { createLazyFileRoute } from '@tanstack/react-router'
import { CallMessage } from '../components/call-message'

export const Route = createLazyFileRoute('/message')({
  component: Message,
})

function Message() {
  return <div className="p-2"><CallMessage /></div>
}
