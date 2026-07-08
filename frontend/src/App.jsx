import AdminPanel from './features/admin/AdminPanel'
import LoginView from './features/auth/LoginView'
import CartDrawer from './features/cart/CartDrawer'
import BrandHomepage from './features/home/BrandHomepage'
import Footer from './components/Footer'

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
        // <LoginView
        //     onAuthSuccess={(user) => console.log('Authenticated user:', user)}
        //     onBack={() => console.log('Back button clicked')}
        //     isDarkMode={false}
        // />


        // Cart
        // <CartDrawer 
        //     isOpen={false}
        //     onClose={() => {}}
        //     cartItems={[]}
        //     onUpdateQuantity={() => {}}
        //     onRemoveItem={() => {}}
        //     onCheckout={() => {}}
        //     isDarkMode={false}
        //     currentUser={null}
        //     onOpenAuth={() => {}}
        // />


        // Brand Homepage
        // <BrandHomepage 
        //     isDarkMode={false}
        //     onOpenAuth={() => {}}
        // />


        // Footer
        <Footer 
            isDarkMode={false}
        />
    )
}



export default App