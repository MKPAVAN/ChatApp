import {IoMdContacts} from 'react-icons/io'

import './index.css'

const Header = () => (
  <>
    <div className="header-cont">
      <div>
        <p>Introductions</p>
        <p>This Channel is For Company Wide Chatter</p>
      </div>
      <div className="header-right">
        <p className="number">3 | 100</p>
        <IoMdContacts />
      </div>
    </div>
    <hr className="line" />
  </>
)

export default Header
