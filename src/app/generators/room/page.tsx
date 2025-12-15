import type { Metadata } from 'next'
import Room from "@/components/room/room";
 
export const metadata: Metadata = {
  title: 'Room Generator | RPG Tools',
  description: '',
}

export default function Page() {
    return (
        <Room/>
    )
}