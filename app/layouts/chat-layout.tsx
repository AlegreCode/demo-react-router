import { LogOut, X } from 'lucide-react'
import { Outlet, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import ContactList from '~/chat/components/ContactList'
import ContactInformationCard from '~/chat/components/contact-information-card/ContactInformationCard'
import { getClients } from '~/fake/fake-data'
import type { Route } from './+types/chat-layout'

export async function loader() {
    const clients = await getClients()
    return { clients };
  }

const ChatLayout = ({ loaderData }: Route.ComponentProps) => {
    const { clients } = loaderData;

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/10">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary" />
                        <span className="font-semibold">NexTalk</span>
                    </div>
                </div>
                <ContactList clients={ clients }/>
                <div className='w-full p-1.5 border-t'>
                    <Button variant={"destructive"} size={"sm"} className='text-white w-full hover:cursor-pointer'>
                        <LogOut className="h-4 w-4 mr-2" /> Log out
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-14 border-b px-4 flex items-center justify-between">
                        <div></div> {/* Empty div to maintain spacing */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                Save conversation
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </header>
                    <Outlet />
                </div>

                {/* Right Panel - Contact Details */}
                <div className="w-80 border-l">
                    <div className="h-14 border-b px-4 flex items-center">
                        <h2 className="font-medium">Contact details</h2>
                    </div>
                    <ContactInformationCard />
                </div>
            </div>
        </div>
    )
}

export default ChatLayout