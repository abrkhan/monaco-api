import {Discrimination} from '../data/types';

export const config  = {
    rules: {
        conditions: {
            any: [{
                all: [{
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 100000,
                    path: '.salary'
                }, {
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 2,
                    path: '.numberOfYearsEmployed'
                }]
            }, {
                all: [{
                    fact: 'case',
                    operator: 'equal',
                    value: true,
                    path: '.settlementAgreement'
                }]
            }, {
                all: [{
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 30000,
                    path: '.salary'
                }, {
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 2,
                    path: '.numberOfYearsEmployed'
                }, {
                    fact: 'case',
                    operator: 'equal',
                    value: true,
                    path: '.isEmployed'
                }]
            }, {
                all: [{
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 30000,
                    path: '.salary'
                }, {
                    fact: 'case',
                    operator: 'equal',
                    value: true,
                    path: '.discrimination.flag'
                },{
                    fact: 'case',
                    operator: 'equal',
                    value: true,
                    path: '.isEmployed'
                }]
            }, {
                all: [{
                    fact: 'case',
                    operator: 'greaterThan',
                    value: 50000,
                    path: '.salary'
                }, {
                    fact: 'case',
                    operator: 'equal',
                    value: true,
                    path: '.discrimination.flag'
                },{
                    fact: 'case',
                    operator: 'equal',
                    value: false,
                    path: '.lastEmployedOver3Months'
                }]
            }]
        },
        event: {  // define the event to fire when the conditions evaluate truthy
            type: 'case-accepted',
            params: {
                message: 'accepted'
            }
        }
    }

}
