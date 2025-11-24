import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DIAS_SEMANA = [
  { id: 0, nome: 'Segunda', abrev: 'Seg' },
  { id: 1, nome: 'Terça', abrev: 'Ter' },
  { id: 2, nome: 'Quarta', abrev: 'Qua' },
  { id: 3, nome: 'Quinta', abrev: 'Qui' },
  { id: 4, nome: 'Sexta', abrev: 'Sex' },
  { id: 5, nome: 'Sábado', abrev: 'Sáb' },
  { id: 6, nome: 'Domingo', abrev: 'Dom' },
];

export default function FormularioDisponibilidade({
  disponibilidade,
  erros,
  onChange,
}) {
  const [pickerVisivel, setPickerVisivel] = React.useState(null);

  const handleToggleDia = (diaId) => {
    const diaExistente = disponibilidade.find(d => d.dia_semana === diaId);
    
    if (diaExistente) {
      onChange(disponibilidade.filter(d => d.dia_semana !== diaId));
    } else {
      onChange([
        ...disponibilidade,
        {
          dia_semana: diaId,
          hora_inicio: '08:00',
          hora_fim: '17:00',
          ativo: true,
        },
      ]);
    }
  };

  const handleMudarHora = (diaId, campo, hora) => {
    const novaDisponibilidade = disponibilidade.map(d => {
      if (d.dia_semana === diaId) {
        return { ...d, [campo]: hora };
      }
      return d;
    });
    onChange(novaDisponibilidade);
  };

  const renderDia = (dia) => {
    const diaDisponibilidade = disponibilidade.find(d => d.dia_semana === dia.id);
    const ativo = !!diaDisponibilidade;

    return (
      <View key={dia.id} style={styles.diaContainer}>
        <View style={styles.diaHeader}>
          <Text style={styles.diaNome}>{dia.nome}</Text>
          <Switch
            value={ativo}
            onValueChange={() => handleToggleDia(dia.id)}
            trackColor={{ false: 'var(--color-border)', true: 'var(--color-primary)' }}
          />
        </View>

        {ativo && diaDisponibilidade && (
          <View style={styles.horariosContainer}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setPickerVisivel({ dia: dia.id, campo: 'hora_inicio' })}
            >
              <Text style={styles.timeLabel}>Início</Text>
              <Text style={styles.timeValue}>
                {diaDisponibilidade.hora_inicio}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setPickerVisivel({ dia: dia.id, campo: 'hora_fim' })}
            >
              <Text style={styles.timeLabel}>Fim</Text>
              <Text style={styles.timeValue}>
                {diaDisponibilidade.hora_fim}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {pickerVisivel?.dia === dia.id && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={(event, selectedTime) => {
              if (selectedTime) {
                const horas = String(selectedTime.getHours()).padStart(2, '0');
                const minutos = String(selectedTime.getMinutes()).padStart(2, '0');
                handleMudarHora(dia.id, pickerVisivel.campo, `${horas}:${minutos}`);
              }
              setPickerVisivel(null);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Disponibilidade *</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.diasScrollView}
      >
        {DIAS_SEMANA.map(dia => renderDia(dia))}
      </ScrollView>

      {erros.disponibilidade && (
        <Text style={styles.errorText}>{erros.disponibilidade}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  diasScrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  diaContainer: {
    marginRight: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    minWidth: 120,
  },
  diaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  diaNome: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  horariosContainer: {
    gap: 8,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 10,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
  errorText: {
    fontSize: 11,
    color: 'var(--color-error)',
    marginTop: 8,
    fontFamily: 'Inter',
  },
});