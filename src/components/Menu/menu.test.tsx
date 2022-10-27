import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { wait } from "@testing-library/user-event/dist/utils";

const testPropss: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: "test",
    children: undefined
};

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: "vertical",
    children: undefined
};

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem >xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem >dropdown 1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStylefile = () => {
  const cssFile: string = `
    .damon-submenu {
      display: none;
    }
    .damon-submenu.menu-opened {
      display: block;
    }
    `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu nad MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(GenerateMenu(testPropss)); 
        wrapper.container.append(createStylefile());
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled'); 
    });
    it('should render correct Menu ande MenuiTEM BASED ON DEFAULT props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('damon-menu test');
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement). toHaveClass('menu-item is-disabled');
    })
    it('click items should change active and call the right callback',() => {
        const thirdItem = wrapper.getByText('xyz');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testPropss.onSelect).toHaveBeenCalledWith('2');
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testPropss.onSelect).not.toHaveBeenCalledWith('1');
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const view = render(GenerateMenu(testVerProps));
        const menuElement = view.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })
    
    // it('should show dropdown items when hover on subMenu', async () => {
    //     expect(wrapper.queryByText('dropdown 1')).not.toBeVisible();
    //     const dropdownElement = wrapper.getByText('dropdown');
    //     fireEvent.mouseEnter(dropdownElement);
    //     await wait(() => {
    //       expect(wrapper.queryByText('dropdown 1')).toBeVisible()
    //     })
    //     fireEvent.click(wrapper.getByText('dropdown 1'));
    //     expect(testPropss.onSelect).toHaveBeenCalledWith('3-0');
    //     fireEvent.mouseLeave(dropdownElement);
    //     await wait(() => {
    //       expect(wrapper.queryByText('dropdown 1')).not.toBeVisible();
    //     })
    // })
})