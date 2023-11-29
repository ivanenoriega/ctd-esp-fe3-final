import {render, screen} from "@testing-library/react";
import IndexPage from "dh-marvel/pages/checkout/index.page";
import Index from "dh-marvel/pages/checkout/index.page";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Index/>)
            const title = screen.getByText('Sample')
            expect(title).toBeInTheDocument()
        })
    })

})