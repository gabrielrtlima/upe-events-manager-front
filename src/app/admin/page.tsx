import { CreateEventDialog } from "@/components/CreateEventDialog";
import { ListEvents } from "@/components/ListEvents";

export default function DashboardAdmin() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex w-9/12 justify-end py-2 sm:w-3/5">
        <CreateEventDialog />
      </div>
      <div className="w-9/12 gg-zinc-100 rounded border px-4 sm:w-3/5">
        <ListEvents />
      </div>

    </div>
  )
}
