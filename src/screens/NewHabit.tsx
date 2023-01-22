import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

import { api } from "../lib/axios";

import colors from "tailwindcss/colors";

const availableWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState('');

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('New habit', 'Please, check the info and try again.')
      }

      await api.post('habits', { title, weekDays })
      
      setTitle('');
      setWeekDays([]);

      Alert.alert('New habit', 'New habit created successfully!');
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Something went wrong!')
    }
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <BackButton />

        <Text className="pt-6 text-white font-extrabold text-1xl">
          Add new Habit
        </Text>

        <Text className="pt-6 text-white font-semibold text-base">
          What habit do you wanna start?
        </Text>

        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Type your new habit..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Choose the days!
        </Text>

        {
          availableWeekDays.map((weekday, index) => (
            <Checkbox 
              key={weekday} 
              title={weekday}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={.7}
          onPress={handleCreateNewHabit}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Add
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}