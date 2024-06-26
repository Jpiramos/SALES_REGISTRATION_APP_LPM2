import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from "../pages/Dashboard";
import { ListSales } from "../pages/ListSale";
import { SearchSales } from "../pages/SearchSales";
import { SearchTotal } from "../pages/SearchTotal";
type AppRoutes = {
  dashboard: undefined;
  listSales: undefined;
  searchSales: undefined;
  resume: undefined;
  searchTotal:undefined;
}

export type AppNavigationRoutesProps =
  BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } =
  createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelPosition: 'below-icon',
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'purple',
      tabBarStyle: {
        height: 88
      }
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Cadastro',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='add'
              size={size}
              color={color}

            />
          )
        }}
      />
      <Screen
        name='listSales'
        component={ListSales}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
       <Screen
        name='searchSales'
        component={SearchSales}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='search'
              size={size}
              color={color}
            />
          )
        }}
      /> 

<Screen
        name='searchTotal'
        component={SearchTotal}
        options={{
          tabBarLabel: 'Total por mês e ano',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='article'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}