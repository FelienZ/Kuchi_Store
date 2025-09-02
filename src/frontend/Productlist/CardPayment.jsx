import { payment } from "../../Products/payment";

export default function CardPayment(){
    return(
        <section className='grid grid-cols-4 gap-2'>
            {payment.map(item => (
                <div key={item.id}>
                    <img src={item.url} alt={`payment-${item.id}`} className="w-20 h-10 rounded-xs"/>
                </div>
            ))}
        </section>
    )
}