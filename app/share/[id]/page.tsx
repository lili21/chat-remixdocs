import { getChat } from "@/app/actions";
import { ChatList } from "@/components/chat-list";

export default async function Share({ params }: { params: { id: string } }) {

  const result = await getChat(params.id);

  if (!result) {
    return <div>Not Found</div>
  }

  return (
    <div className="pb-[150px] pt-4 md:pt-10">
      <ChatList messages={result.messages} />
    </div>
  )
}
