import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(value instanceof Date ? new Date(value) : new Date());

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View onTouchEnd={showPicker}>
      <TextInput
        readOnly
        label={label}
        placeholder="Selecione uma data..."
        right={<TextInput.Icon icon="calendar" />}
        value={date.toLocaleDateString?.()}
        error={error}
      />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);
            setDate(selectedDate);
            onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
}
