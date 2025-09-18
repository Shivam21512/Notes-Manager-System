import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LogOut, Plus } from 'lucide-react'

export default function Navbar({ onCreate }){
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">N</div>
          <div className="font-semibold text-lg">Notes Manager</div>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <button onClick={onCreate} className="flex items-center gap-2 bg-primary-600 text-white px-3 py-1.5 rounded-xl shadow-sm hover:opacity-95">
                <Plus size={16} /> Add Note
              </button>
              <div className="flex items-center gap-3 border rounded-xl px-3 py-1">
                <div className="text-sm">{user.email}</div>
                <button onClick={logout} title="Logout" className="p-1 rounded hover:bg-slate-100"><LogOut size={16} /></button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({isActive})=>isActive? 'text-primary-600 font-semibold' :'text-slate-600'}>Login</NavLink>
              <NavLink to="/register" className={({isActive})=>isActive? 'text-primary-600 font-semibold' :'text-slate-600'}>Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}