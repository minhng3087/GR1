import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading/Loading'

const AppLayout = ({ header, children }) => {
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    return (
        <>
            {!user || isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-100">
                    <Navigation user={user} />

                    {/* Page Heading */}
                    {header && (
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Page Content */}
                    <main>{children}</main>
                </div>
            )}
        </>
    )
}

export default AppLayout
