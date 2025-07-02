class Location {
  /**
   * Create a Location.
   * @param {Object} params
   * @param {string} params.id - The unique identifier for the location.
   * @param {string} params.building_code - The code of the building.
   * @param {string} params.building_name - The name of the building.
   * @param {string} params.room_number - The room number within the building.
   */
  constructor({ id, building_code, building_name, room_number }) {
    this.id = id;
    this.buildingCode = building_code;
    this.buildingName = building_name;
    this.roomNumber = room_number;
  }
}

export default Location;
