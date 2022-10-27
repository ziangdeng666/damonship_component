import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon';
library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='coffee' theme='primary' size='10x'/>
        <Menu defaultIndex='0' onSelect = {(index) => {alert(index)}} defaultOpenSubMenus={['2']} mode = 'horizontal'>
          <MenuItem >cool link 1</MenuItem>
          <MenuItem >cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem >dropdown 1</MenuItem>
            <MenuItem >dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem >cool link 3</MenuItem>
        </Menu>
      <Button className='customer'>Hello world</Button>
      <Button disabled btnType={ButtonType.Danger}>Hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large} >Hello</Button>
      <Button btnType={ButtonType.Link} href= "http://www.google.com" disabled>Google Link</Button>
      <Button btnType={ButtonType.Link} href= "http://www.google.com" target="_blank" >Google Link</Button>
      </header>
    </div>
  );
}


export default App;
