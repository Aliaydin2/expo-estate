import { create } from 'zustand'

const useImage = (set) => ({
  image: [],
  setImage: (e)=>set(()=>({image:e}))
})
export default create(useImage)