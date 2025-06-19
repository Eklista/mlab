interface AuthLayoutProps {
  children: React.ReactNode
  showBackButton?: boolean
}

const AuthLayout = ({ children, showBackButton = false }: AuthLayoutProps): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" 
         style={{
           backgroundImage: 'url(/auth-background.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      
      {/* Floating Card */}
      <div className="w-full max-w-md bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl" 
           style={{
             background: 'rgba(0, 0, 0, 0.3)',
             backdropFilter: 'blur(20px)',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
           }}>
        
        {showBackButton && (
          <div className="mb-6">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <span>←</span>
              <span className="text-sm">Volver</span>
            </button>
          </div>
        )}
        
        {children}
      </div>
    </div>
  )
}

export default AuthLayout