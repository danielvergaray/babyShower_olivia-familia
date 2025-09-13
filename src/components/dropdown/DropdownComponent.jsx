import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownComponent = ({
  menuOptions,
  filterSelected,
  setFilterSelected,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {filterSelected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuOptions.map((option, index) => (
          <Dropdown.Item key={index} onClick={() => setFilterSelected(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
