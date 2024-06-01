
import {NavLink} from 'react-router-dom'

function SideNav() {
  return (
    <div> <nav className="grid gap-4 text-sm text-muted-foreground m-10">
    <h1 className="font-bold text-4xl text-black mt-10 mb-10">Settings</h1>
    <NavLink
      to="/settings/general"
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "font-semibold text-primary" : ""
      }
    >
      General
    </NavLink>
    <NavLink
      to="/settings/profileintro"
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "font-semibold text-primary" : ""
      }
    >
      Profile Intro
    </NavLink>
    <NavLink
      to="/settings/profile"
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "font-semibold text-primary" : ""
      }
    >
      Profile
    </NavLink>
   

  </nav></div>
  )
}

export default SideNav