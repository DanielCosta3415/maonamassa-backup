/**
 * Design System - Color Palette
 * Centraliza todas as cores do app
 * Sincronizado com web Design System
 */

export const colors = {
  // Primitivos
  white: "rgba(255, 255, 255, 1)",
  black: "rgba(0, 0, 0, 1)",
  cream50: "rgba(252, 252, 249, 1)",
  cream100: "rgba(255, 255, 253, 1)",
  gray200: "rgba(245, 245, 245, 1)",
  gray300: "rgba(167, 169, 169, 1)",
  gray400: "rgba(119, 124, 124, 1)",
  slate500: "rgba(98, 108, 113, 1)",
  brown600: "rgba(94, 82, 64, 1)",
  charcoal700: "rgba(31, 33, 33, 1)",
  charcoal800: "rgba(38, 40, 40, 1)",
  slate900: "rgba(19, 52, 59, 1)",
  
  teal300: "rgba(50, 184, 198, 1)",
  teal400: "rgba(45, 166, 178, 1)",
  teal500: "rgba(33, 128, 141, 1)",
  teal600: "rgba(29, 116, 128, 1)",
  teal700: "rgba(26, 104, 115, 1)",
  teal800: "rgba(41, 150, 161, 1)",
  
  red400: "rgba(255, 84, 89, 1)",
  red500: "rgba(192, 21, 47, 1)",
  orange400: "rgba(230, 129, 97, 1)",
  orange500: "rgba(168, 75, 47, 1)",

  // Backgrounds coloridos
  bg1: "rgba(59, 130, 246, 0.08)",    // Azul claro
  bg2: "rgba(245, 158, 11, 0.08)",    // Amarelo claro
  bg3: "rgba(34, 197, 94, 0.08)",     // Verde claro
  bg4: "rgba(239, 68, 68, 0.08)",     // Vermelho claro
  bg5: "rgba(147, 51, 234, 0.08)",    // Roxo claro
  bg6: "rgba(249, 115, 22, 0.08)",    // Laranja claro
  bg7: "rgba(236, 72, 153, 0.08)",    // Rosa claro
  bg8: "rgba(6, 182, 212, 0.08)",     // Ciano claro

  // Semânticas - Light Mode
  background: "rgba(252, 252, 249, 1)",
  surface: "rgba(255, 255, 253, 1)",
  text: "rgba(19, 52, 59, 1)",
  textSecondary: "rgba(98, 108, 113, 1)",
  primary: "rgba(33, 128, 141, 1)",
  primaryHover: "rgba(29, 116, 128, 1)",
  primaryActive: "rgba(26, 104, 115, 1)",
  secondary: "rgba(94, 82, 64, 0.12)",
  secondaryHover: "rgba(94, 82, 64, 0.2)",
  secondaryActive: "rgba(94, 82, 64, 0.25)",
  border: "rgba(94, 82, 64, 0.2)",
  btnPrimaryText: "rgba(252, 252, 249, 1)",
  cardBorder: "rgba(94, 82, 64, 0.12)",
  cardBorderInner: "rgba(94, 82, 64, 0.12)",
  
  error: "rgba(192, 21, 47, 1)",
  success: "rgba(33, 128, 141, 1)",
  warning: "rgba(168, 75, 47, 1)",
  info: "rgba(98, 108, 113, 1)",
};

// Exportar para Dark Mode (futuro)
export const colorsDark = {
  ...colors,
  // Sobrescrever apenas o necessário para dark mode
  background: "rgba(31, 33, 33, 1)",
  surface: "rgba(38, 40, 40, 1)",
  text: "rgba(245, 245, 245, 1)",
  textSecondary: "rgba(167, 169, 169, 0.7)",
  primary: "rgba(50, 184, 198, 1)",
  primaryHover: "rgba(45, 166, 178, 1)",
  primaryActive: "rgba(41, 150, 161, 1)",
  secondary: "rgba(119, 124, 124, 0.15)",
  secondaryHover: "rgba(119, 124, 124, 0.25)",
  secondaryActive: "rgba(119, 124, 124, 0.3)",
  border: "rgba(119, 124, 124, 0.3)",
  error: "rgba(255, 84, 89, 1)",
  success: "rgba(50, 184, 198, 1)",
  warning: "rgba(230, 129, 97, 1)",
  cardBorder: "rgba(119, 124, 124, 0.2)",
};