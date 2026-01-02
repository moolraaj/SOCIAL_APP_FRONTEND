import { MessageSquare, PlusSquare } from "lucide-react"
import { Link } from "react-router-dom"

 

function Header() {
  return (
    <>
       <header className="app-header">
            <div className="header-content">
              <Link to="/" className="logo-section">
                <div className="logo-icon">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h1 className="app-title">Social Media App</h1>
                  <p className="app-subtitle">View All Posts</p>
                </div>
              </Link>
    
              
              <nav className="header-features">
                <Link to="/" className="feature-item">
                  <MessageSquare size={20} />
                  <span>All Posts</span>
                </Link>
    
                <Link to="/create-post" className="feature-item">
                  <PlusSquare size={20} />
                  <span>Create Post</span>
                </Link>
              </nav>
            </div>
          </header>
    </>
  )
}

export default Header