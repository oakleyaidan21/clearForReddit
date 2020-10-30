import React, {useContext} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import MainNavigationContext from '../context/MainNavigationContext';
import {defaultColor} from '../assets/styles/palettes';
import {createThemedStyle} from '../assets/styles/mainStyles';

const CustomTabBar: React.FC<any> = (props) => {
  const {state, navigation} = props;
  const {index} = state;

  const {currentSub, theme} = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  return (
    <View
      style={[
        s.tabBarContainer,
        {
          backgroundColor: theme === 'dark' ? 'black' : primary_color,
          borderTopWidth: theme === 'dark' ? 2 : 0,
          borderColor: primary_color,
        },
      ]}>
      <View
        style={{
          width: 300,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        {state.routes.map((route: {name: any}, i: any) => {
          const focused = index === i;
          const {name} = route;
          const iconName = () => {
            switch (name) {
              case 'Home': {
                return 'menu';
              }
              case 'Search': {
                return 'magnifier';
              }
              case 'User': {
                return 'user';
              }
              default: {
                return 'close';
              }
            }
          };
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(name);
                if (name === 'Home' && focused && props.scrollRef.current) {
                  props.scrollRef.current.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }
              }}
              key={name}>
              <View
                style={[
                  s.tabBarIconContainer,
                  {
                    backgroundColor:
                      theme === 'dark'
                        ? 'black'
                        : focused
                        ? 'white'
                        : primary_color,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Icon
                  name={iconName()}
                  color={
                    focused
                      ? primary_color
                      : theme === 'dark'
                      ? 'grey'
                      : 'white'
                  }
                  type="simple-line-icon"
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
