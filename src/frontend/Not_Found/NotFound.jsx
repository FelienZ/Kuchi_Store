export default function Notfound(){
  return(
        <section className="min-h-screen text-neutral/60 flex flex-col justify-center items-center gap-5">
          <img src='/Kuchistore.svg' alt="" className="size-20"/>
            <div className="flex items-center gap-4 divide-x">
                <p className="font-bold text-2xl pr-3">404</p>
                <p>Not Found Pages</p>
            </div>
            <a href="/" className="text-sm hover:text-lime-500">Back to Home</a>
        </section>
  )
}