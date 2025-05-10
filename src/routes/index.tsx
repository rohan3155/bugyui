import { NavBarMenu } from '@/components/Menu/NavBarMenu'
import { SideBarMenu } from '@/components/Menu/SideBarMenu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <div>
                {/* <NavBarMenu/> */}
                <SideBarMenu/>

        </div>
  )
}
