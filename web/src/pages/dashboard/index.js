import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import Calendar from '@/components/Calendar/Calendar'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <Navigation user={user} />
            <Calendar user={user}/>
        </>
    )
}

export default Dashboard
