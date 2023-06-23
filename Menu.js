import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ handleMenuPress, handleSubMenuPress, activeMenu, activeSubMenu, handleAddSubpart }) => {
  const subparts = {
    motion: ['moveX', 'moveY', 'moveXY','goToOrigin'],
    looks: ['Say Hello', 'Think Hmm'],
    control: ['Flag', 'Subpart 2'],
    events: ['Subpart 1', 'Subpart 2'],
  };

  const generateCoordinates = (subpart) => {
    switch (subpart) {
      case 'Move by X':
        return { x: 10, y: 0 };
      case 'Move by Y':
        return { x: 0, y: 10 };
      case 'Move to X Y':
        return { x: 20, y: 20 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const handleSubpartPress = (subpart) => {
    const coordinates = generateCoordinates(subpart);
    handleAddSubpart(subpart, coordinates);
  };

  return (
    <View style={styles.container}>
      {/* Menu title */}
      <TouchableOpacity style={styles.mainMenuItem} onPress={() => handleMenuPress('main')}>
        <Text style={styles.mainMenuItemText}>Menu</Text>
      </TouchableOpacity>

      {/* Main menu */}
      {activeMenu === 'main' && (
        <View style={styles.menuContainer}>
          {/* Motion submenu */}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleSubMenuPress('motion')}>
            <Text style={styles.menuItemText}>Motion </Text>
          </TouchableOpacity>
          {activeSubMenu === 'motion' && (
            <View style={styles.subMenu}>
              {subparts.motion.map((subpart) => (
                <TouchableOpacity
                  key={subpart}
                  style={styles.subMenuItem}
                  onPress={() => handleSubpartPress(subpart)}
                >
                  <Text style={styles.subMenuItemText}>{subpart}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Looks submenu */}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleSubMenuPress('looks')}>
            <Text style={styles.menuItemText}>Looks </Text>
          </TouchableOpacity>
          {activeSubMenu === 'looks' && (
            <View style={styles.subMenu}>
              {subparts.looks.map((subpart) => (
                <TouchableOpacity
                  key={subpart}
                  style={styles.subMenuItem}
                  onPress={() => handleSubpartPress(subpart)}
                >
                  <Text style={styles.subMenuItemText}>{subpart}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Control submenu */}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleSubMenuPress('control')}>
            <Text style={styles.menuItemText}>Control </Text>
          </TouchableOpacity>
          {activeSubMenu === 'control' && (
            <View style={styles.subMenu}>
              {subparts.control.map((subpart) => (
                <TouchableOpacity
                  key={subpart}
                  style={styles.subMenuItem}
                  onPress={() => handleSubpartPress(subpart)}
                >
                  <Text style={styles.subMenuItemText}>{subpart}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Events submenu */}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleSubMenuPress('events')}>
            <Text style={styles.menuItemText}>Events </Text>
          </TouchableOpacity>
          {activeSubMenu === 'events' && (
            <View style={styles.subMenu}>
              {subparts.events.map((subpart) => (
                <TouchableOpacity
                  key={subpart}
                  style={styles.subMenuItem}
                  onPress={() => handleSubpartPress(subpart)}
                >
                  <Text style={styles.subMenuItemText}>{subpart}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  mainMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainMenuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  subMenu: {
    marginLeft: 20,
  },
  subMenuItem: {
    marginBottom: 5,
  },
  subMenuItemText: {
    fontSize: 14,
  },
});

export default Menu;
