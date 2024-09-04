import ClientsIcon from '@modules/commons/icons/clients-icon'

export default function PageClients() {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full border-2 bg-white p-3">
        <ClientsIcon />
      </div>
      <div className="flex flex-col">
        <h1>Clients</h1>
        <p>Here is the list of our clients:</p>
      </div>
    </div>
  )
}
