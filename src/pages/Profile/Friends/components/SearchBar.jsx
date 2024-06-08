import React from 'react'
import { Input } from '@/shadcomponents/ui/input';
function SearchBar() {
  return (
    <div> <Input
    className="w-72 relative top-1 rounded-full bg-gray-300/50"
    placeholder="Search..."
    type="search"
  /></div>
  )
}

export default SearchBar