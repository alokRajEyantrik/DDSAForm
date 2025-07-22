import Data1 from "$lib/data/pincode_IN_Selected.json";

export function getStateOptions() {
  return Object.keys(Data1).map(state => ({
    label: state,
    value: state,
    cities: Object.keys(Data1[state]).map(city => ({
      label: city,
      value: city
    }))
  }));
}
