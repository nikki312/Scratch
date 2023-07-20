import React, { useState } from 'react';
import { View ,Text} from 'react-native';
import Menu from './Menu';
import Action from './Action';


const NewScreen = (navigation) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [selectedSubparts, setSelectedSubparts] = useState([]);

  const handleMenuPress = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setActiveSubMenu(null);
  };

  const handleSubMenuPress = (subMenu) => {
    setActiveSubMenu(activeSubMenu === subMenu ? null : subMenu);
  };

  const handleAddSubpart = (subpart) => {
    setSelectedSubparts([...selectedSubparts, subpart]);
  };

  const handleRemoveSubpart = (subpart) => {
    const updatedSubparts = selectedSubparts.filter((item) => item !== subpart);
    setSelectedSubparts(updatedSubparts);
  };


  return (

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Menu
        handleMenuPress={handleMenuPress}
        handleSubMenuPress={handleSubMenuPress}
        activeMenu={activeMenu}
        activeSubMenu={activeSubMenu}
        handleAddSubpart={handleAddSubpart}
      />
      <Action
        selectedSubparts={selectedSubparts}
        handleRemoveSubpart={handleRemoveSubpart}
      />
    </View>



  );
};

export default NewScreen;
