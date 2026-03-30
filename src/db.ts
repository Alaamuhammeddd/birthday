import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

const memoriesRef = collection(db, 'memories')

// Add memory
export const addMemory = async (memory: { publicId: string; description: string }) => {
  await addDoc(memoriesRef, {
    ...memory,
    createdAt: Date.now(),
  })
}

// Get all memories
export const getMemories = async () => {
  const q = query(memoriesRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }))
}

export const deleteMemory = async (id: string) => {
  await deleteDoc(doc(db, 'memories', id))
}
