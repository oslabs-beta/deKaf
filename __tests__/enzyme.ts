// import React from 'react'
// import {shallow} from 'enzyme'

// //==================================================
// // @ts-ignore
// import Vis from '../src/components/Vis.tsx'
// // @ts-ignore
// import Vis2 from '../src/components/Vis2.tsx'
// // @ts-ignore
// import Line from '../src/components/Line'
// import { isExportDeclaration, textSpanContainsPosition } from 'typescript'

//==================================================

describe('<Vis />', () => {
    let component

    beforeEach(() => {
        component = shallow(<Vis dataa={10: 1, 20: 2, 30: 3}/>)
    })

    test('Should mount', () => {
        expect(component.length).toBe(1)
    })

})

describe('<Vis2 />', () => {
    let component

    beforeEach(() => {
        component = shallow(<Vis2 dataa={10: 1, 20: 2, 30: 3}/>)
    })

    test('Should mount', () => {
        expect(component.length).toBe(1)
    })

})

describe('<Line />', () => {
    let component

    beforeEach(() => {
        component = shallow(<Line dataa={10: 1, 20: 2, 30: 3}/>)
    })

    test('Should mount', () => {
        expect(component.length).toBe(1)
    })

})