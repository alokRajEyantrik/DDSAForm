  import Data1 from "$lib/data/pincode_IN_Selected.json";

export function getStateOptions() {
  return Object.keys(Data1).map(state => ({
    label: state,
    value: state
  }));
}