import Admin from '../../components/portals/Admin'
import Emails from '../../components/portals/Emails'
import PortalContainer from '../../components/portals/PortalContainer'
import Student from '../../components/portals/Student'

const Portal = () => {
  return (
    <PortalContainer>
      <Student />
      <Admin />
      <Emails />
    </PortalContainer>
  )
}
export default Portal
