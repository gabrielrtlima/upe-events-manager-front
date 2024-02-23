import { CreateEventDialog } from "@/components/CreateEventDialog";
import { ListEvents } from "@/components/ListEvents";

export default function DashboardAdmin() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex w-4/5 justify-end py-2">
        <CreateEventDialog />
      </div>
      <div className="w-4/5 bg-zinc-100 rounded border ">
        <ListEvents />
      </div>

    </div>
  )
}
