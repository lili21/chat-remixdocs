import { getChats } from '../actions'

export default async function Explore() {
  const result = await getChats()

  console.log(result)

  return <div>Explore</div>
}
