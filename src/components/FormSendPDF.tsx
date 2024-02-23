
type FormSendPDFProps = {
  onSubmit: (data: any) => void
}

export function FormSendPDF({ onSubmit }: FormSendPDFProps) {
  function handleSubmit(data: any) {
    console.log(data)
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} id="form-send-pdf">
      <div>
        <h1>SEND PDF</h1>
      </div>
    </form>
  )
}
