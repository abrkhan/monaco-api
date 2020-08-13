import {CaseDAO} from './data/CaseDAO';
import {Case} from './data/types';
import {config} from './config'
import { Engine } from 'json-rules-engine'



export class Executor {

    #caseDAO: CaseDAO;
    #engine = new Engine()

    constructor() {
        this.#caseDAO = new CaseDAO();
    }

    async init () {
       await this.#caseDAO.init();
    }

    async onNewCase(newCase: Case): Promise<{result: 'accepted' | 'rejected'}> {

        try {
            const engine = new Engine();
            const fact = {
                case: {
                    ...newCase
                }
            }
            engine.addRule(config.rules);
            const result = await engine.run(fact);
            const acceptedEvents = result.events.filter(event => event.type === 'case-accepted');

            //if at least one rule was successful - we can return accepted - otherwise rejected
            const status = (acceptedEvents.length > 0)?'accepted':'rejected';
            await this.#caseDAO.insertCase({
                ...newCase,
                status
            });
            return {
                result: status
            }

        } catch(e) {
            throw new Error (`There was an error analysing the new case ${e}`)
        }
    }

    async getRules(): Promise<string> {
        const rules = JSON.stringify(config.rules);
        return rules;
    }

}
