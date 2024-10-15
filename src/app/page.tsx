import React from 'react'
import PasteForm from '../components/PasteForm'
import PasteList from '../components/PasteList'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pastebin Clone</h1>
      <PasteForm />
      <PasteList />
    </div>
  )
}

export default HomePage
