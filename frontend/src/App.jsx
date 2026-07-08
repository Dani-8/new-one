import AdminPanel from './features/admin/AdminPanel'

function App(){
    return(
        <AdminPanel 
            foods={[]}
            orders={[]}
            onUpdateOrderStatus={() => {}}
            onAddFood={() => {}}
            onUpdateFood={() => {}}
            onDeleteFood={() => {}}
            isDarkMode={false}
        />
    )
}



