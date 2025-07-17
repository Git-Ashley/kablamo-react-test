import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Stopwatch from './Stopwatch';
// import OldSchoolStopwatch from './OldSchool'

/*
 * Please detail what is wrong with the below code, and why. Also where applicable, mention what
 * you would do differently.
 */

/**
 * 
 *  Functional changes to get the app working:
 *   - the instance variables laps & incrementer should be moved to state.
 *     - Everywhere they are set will need to be done in this.setState (in handleResetClick ensure not to duplicate this.stateState).
 *     - Remove use of forceUpdate.
 *   - In handleDeleteClick, create a copy of laps before setting, as Array.splice works in-place.
 *   - Use arrow functions in all functions where you are using 'this' in order to use the outer context's 'this' (i.e. the instance's 'this')
 *
 *   Other important changes:
 *   - When interating over laps in the render method, we need a key prop.
 *     The current lap.index will not suffice, because we may re-order the list (via deletion).
 *     Since there is nothing that makes laps unique, one solution is to turn state.laps into an
 *     array of objects with a key attribute, and a value. When we create laps, we could use an internal counter.
 *
 *   Formatting:
 *   - Returning a function in handleDeleteClick is unnecessary since there is no need for a closure.
 *     I wouldn't mix functional with non-functional styles when there is no good reason for it. (Be sure to pass it as () => this.handleDeleteClick(i) in Laps.onDelete)
 *   - No need to pass an array to laps.concat when appending a single value; just pass the value itself.
 *   - Set incrementer back to null after clearInterval for consistency, as it represents the current interval.
 *     This negates the need for lastClearedIncrementer, as it's only being used for comparing it to incrementer to check if the timer is running.
 *     Now we can simply check if 'incrementer' is null or not, instead.
 *   - Checking for truthiness of laps in the render method is unnecessary as it's always an array.
 *   - handleLabClick typo (lab -> lap)
 *   - Rename the 'lap' prop (in Lap component) to something more self-documenting, e.g. lapSeconds
 *
 *   Performance:
 *   - Be sure to clearInterval in componentWillUnmount to avoid memory leak
 *
 *   Typing:
 *   - StopwatchProps shouldn't be extending anything, especially ClassAttributes, which is an internal type, used for ref forwarding.
 *   - Create types for component state (2nd argument to React.Component)
 *     - incrementer instance variable could have 'number | null' type. We'll also need to ensure null-checking when using clearInterval.
 *   - Create an interface for LapProps, and ensure onDelete has 'void' return type.
 */



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Stopwatch />
    {/* <OldSchoolStopwatch initialSeconds={0} /> */}
  </StrictMode>,
)
