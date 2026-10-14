const MSGS = [
  { from: 'me', text: 'Namaste, kal shaam ko skin specialist ka appointment mil sakta hai?' },
  { from: 'bot', text: 'Namaste! Kal shaam 5:30 ya 6:15 baje Dr. Mehta available hain. Kaunsa time theek rahega?' },
  { from: 'me', text: '5:30 theek hai' },
  { from: 'bot', text: 'Done. Kal, 5:30 PM, Dr. Mehta. Fee ₹600. Main 2 ghante pehle reminder bhej dungi.' },
]

export default function ChatMock() {
  return (
    <figure className="mx-auto w-full max-w-sm" aria-label="Sample WhatsApp conversation with an Ethixweb AI receptionist">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(20,22,28,.35)]">
        <div className="flex items-center gap-3 bg-wa px-4 py-3 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 font-bold" aria-hidden="true">A</span>
          <div>
            <p className="font-bold leading-tight">Aarogya Clinic</p>
            <p className="text-xs text-white/80">AI receptionist, replies in seconds</p>
          </div>
        </div>
        <ol className="flex min-h-[19rem] flex-col gap-2.5 bg-mist px-3.5 py-4">
          {MSGS.map((m, i) => (
            <li
              key={i}
              className={`bubble max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.95rem] leading-snug ${m.from === 'me' ? 'self-end rounded-br-md bg-[#dcf8c6]' : 'self-start rounded-bl-md bg-white'}`}
              style={{ animationDelay: `${0.5 + i * 1.1}s` }}
            >
              {m.text}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-center text-sm text-ink-soft">Sample conversation. Your agent speaks your customers' language.</figcaption>
    </figure>
  )
}
