class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error('Config is not defined');
        }
        this.config = config;
        this.history = [config.initial];
        this.currentStateIndex = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.currentStateIndex];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) {
            throw new Error('State is not exist');
        }
        if (this.currentStateIndex != this.history.length - 1) {
            this.history.splice(this.currentStateIndex + 1, this.history.length - this.currentStateIndex - 1);
        }
        this.history.push(state);
        this.currentStateIndex++;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let stateObject = this.config.states[this.getState()];
        if (stateObject.transitions[event]) {
            this.changeState(stateObject.transitions[event]);
        } else {
            throw new Error('Event in current state is not exist');
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history = [this.config.initial];
        this.currentStateIndex = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        for (let key in this.config.states) {
            if (!event || this.config.states[key].transitions[event]) {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentStateIndex === 0) {
            return false;
        } 
        this.currentStateIndex--;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
       if (this.currentStateIndex == this.history.length - 1) {
           return false;
       }
       this.currentStateIndex++;
       return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        let currentState = this.getState();
        this.history = [currentState];
        this.currentStateIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
