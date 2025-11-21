import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function CalendarioAgenda({
  pedidos,
  dataSelecionada,
  onSelectData,
}) {
  // Marca datas com pedidos
  const markedDates = useMemo(() => {
    const marked = {};

    // Marca todas as datas com pedidos
    pedidos.forEach((pedido) => {
      if (!marked[pedido.data]) {
        marked[pedido.data] = {
          marked: true,
          dots: [
            {
              key: pedido.status,
              color: getCorPorStatus(pedido.status),
              selectedDotIndex: 0,
            },
          ],
        };
      }
    });

    // Destaca data selecionada
    if (marked[dataSelecionada]) {
      marked[dataSelecionada].selected = true;
    } else {
      marked[dataSelecionada] = { selected: true };
    }

    return marked;
  }, [pedidos, dataSelecionada]);

  const getCorPorStatus = (status) => {
    switch (status) {
      case 'pendente':
        return 'var(--color-warning)';
      case 'confirmado':
        return 'var(--color-primary)';
      case 'concluído':
        return 'var(--color-success)';
      case 'cancelado':
        return 'var(--color-error)';
      default:
        return 'var(--color-info)';
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={dataSelecionada}
        minDate={moment().format('YYYY-MM-DD')}
        onDayPress={(day) => onSelectData(day.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: 'var(--color-surface)',
          calendarBackground: 'var(--color-surface)',
          textSectionTitleColor: 'var(--color-text)',
          textSectionTitleDisabledColor: 'var(--color-text-secondary)',
          selectedDayBackgroundColor: 'var(--color-primary)',
          selectedDayTextColor: 'var(--color-btn-primary-text)',
          todayTextColor: 'var(--color-primary)',
          dayTextColor: 'var(--color-text)',
          textDisabledColor: 'var(--color-text-secondary)',
          dotColor: 'var(--color-primary)',
          selectedDotColor: 'var(--color-btn-primary-text)',
          monthTextColor: 'var(--color-text)',
          indicatorColor: 'var(--color-primary)',
          textDayFontFamily: 'Inter',
          textMonthFontFamily: 'Inter',
          textDayHeaderFontFamily: 'Inter',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
          'stylesheet.calendar.basic': {
            dayContainer: {
              backgroundColor: 'transparent',
            },
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});