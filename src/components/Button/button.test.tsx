/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};


describe('test Button component', () => {
    it('should render the correct default button', ()=>{
        const view = render(<Button {...defaultProps}>Nice</Button>);
        const element = view.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    it('should render the correct component based on different props', ()=>{
        const testProps: ButtonProps = {
            btnType: ButtonType.Primary,
            size: ButtonSize.Large,
            className: "klass",
        };
        const view = render(<Button {...testProps}>Nice</Button>);
        const element = view.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    })
    it('should render a link when btnType equals link and href is provided', ()=>{
        const testProps: ButtonProps = {
            btnType: ButtonType.Link,
            href: 'http://www.baidu.com'
        }
        const view = render(<Button {...testProps}>Link</Button>);
        const element = view.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    })
    it('should render disabled button when disabled is true', ()=>{
        const testProps: ButtonProps = {
            disabled: true,
            onClick: jest.fn()
        }
        const view = render(<Button {...testProps}>Nice</Button>);
        const element = view.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(testProps.onClick).not.toHaveBeenCalled();
    })
})

