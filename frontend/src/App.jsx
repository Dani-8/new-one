import AdminPanel from './features/admin/AdminPanel'
import LoginView from './features/auth/LoginView'

function App(){
    return(
        // Admin Panel
        // <AdminPanel 
        //     foods={[]}
        //     orders={[]}
        //     onUpdateOrderStatus={() => {}}
        //     onAddFood={() => {}}
        //     onUpdateFood={() => {}}
        //     onDeleteFood={() => {}}
        //     isDarkMode={false}
        // />


        // Login View
        <LoginView
            onAuthSuccess={(user) => console.log('Authenticated user:', user)}
            onBack={() => console.log('Back button clicked')}
            isDarkMode={false}
        />

    )
}



export default App