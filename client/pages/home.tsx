import { useAppSelector } from '../hooks/hooks'

export default function Home() {
  const { user } = useAppSelector((state) => state.auth)
  return <div>Hello</div>
}
