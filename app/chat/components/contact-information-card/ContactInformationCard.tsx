import { useLoaderData, useNavigation, useParams } from 'react-router'
import ContactInformation from './ContactInformation'
import ContactInformationSkeleton from './ContactInformationSkeleton'
import NoContactSelected from './NoContactSelected'
import type { Client } from '~/chat/interfaces/chat.interface'



const ContactInformationCard = () => {
    const { id } = useParams()
    const { clients = [] } = useLoaderData()
    const { state, formMethod } = useNavigation()
    const isPending = state === "loading"


    if (isPending && formMethod !== "POST") return <ContactInformationSkeleton />

    if (!id) return <NoContactSelected />

    const client = clients.find((client:Client) => client.id === id)
    return (
        <ContactInformation client={client}/>
    )
}

export default ContactInformationCard